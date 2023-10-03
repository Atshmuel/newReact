import { Groups, ID, Name } from "../../interfaces/interfaces";
import { GroupModel } from "../models/index";
import { Response } from "express";
import {
  deleteFromSpecificGroup,
  personExists,
  removeGroupFromPerson,
  updatePersonGroups,
  validateIdLength,
} from "./helper";
import { ObjectId } from "mongoose";

export const createGroup = async (group: Groups.newGroup, res: Response) => {
  console.log("createGroup");

  if (typeof group === "string") {
    const theGroup = await GroupModel.findOne({ groupName: group });
    if (theGroup) throw new Error(`${group} already exist`);
    await GroupModel.create({
      groupName: group,
    });
  }
  if (typeof group !== "string") {
    const theGroup = await GroupModel.findOne({ groupName: group.groupName });
    if (theGroup) throw new Error(`${group.groupName} already exist`);
    await GroupModel.create({
      groupName: group.groupName,
    });
  }
};
export const createGroupInGroup = async (
  inGroupId: ID,
  groupName: Groups.newGroup,
  res: Response
) => {
  console.log("createGroupInGroup");

  const isExistGroup = await GroupModel.findById(inGroupId);
  if (isExistGroup) {
    await createGroup(groupName, res);
    await GroupModel.findByIdAndUpdate(
      { _id: inGroupId },
      { $addToSet: { groups: groupName } }
    );
    const findNewGroup = await GroupModel.findOne({
      groupName: groupName,
    });
    await GroupModel.findByIdAndUpdate(
      { _id: findNewGroup?._id },
      { $addToSet: { fathers: isExistGroup.groupName } }
    );
    return false;
  }
  return true;
};

export const groupAlreadyAChild = async (
  groupInfo: Groups.newGroup | string
): Promise<boolean> => {
  console.log("groupAlreadyAChild");

  const group = await GroupModel.findOne({ groupName: groupInfo });
  if (group && group?.fathers.length > 0) {
    return true;
  }
  return false;
};

export const deleteGroup = async (group: ID, res: Response) => {
  console.log("deleteGroup");
  let groupId = group.id;
  const findGroup = await GroupModel.findById(groupId); //converting group from obj to str
  const personsInGroup = findGroup?.persons;
  const fathers = findGroup?.fathers;
  const groups = findGroup?.groups;
  const groupName = findGroup?.groupName;

  if (!findGroup) throw new Error("This group dose not exist");
  try {
    personsInGroup?.forEach(async (person) => {
      //find all persons that contains the specific group
      if (!groupName) return;
      await removeGroupFromPerson(person, groupName);
    });
    fathers?.forEach(async (father) => {
      //if delete group that have a father then remove the specific group from the father
      await GroupModel.findOneAndUpdate(
        { groupName: father },
        { $pull: { groups: groupName } }
      );
    });
    groups?.forEach(async (group) => {
      //if delete a father group (NOT a nested group) the delete all sub groups
      await GroupModel.findOneAndDelete({ groupName: group });
    });

    await GroupModel.findByIdAndDelete(groupId);
  } catch (error) {
    res.status(400).json({
      message: `Failed to delete ${groupName}, please try again in a moment`,
    });
  }
};

export const displayGroupByName = async (name: Name, res: Response) => {
  console.log("displayGroupByName");

  try {
    const group = await GroupModel.findOne({ groupName: name.name });
    const show = async () => {
      res.status(200).json(group);
    };
    group
      ? show()
      : res.status(400).json({ message: `${name.name} dose not exists` });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
//Show's Group by id
export const displayGroupById = async (id: ID) => {
  console.log("displayGroupById");

  const group = await GroupModel.findById(id.id);
  if (!group) return;
  return group;
};

export const displayAllPerAndGro = async (
  groupName: Groups.newGroup,
  res: Response
) => {
  console.log("displayAllPerAndGro");

  if (groupName.groupName) {
    let personsArr: string[];
    const group = await GroupModel.findOne({ groupName: groupName.groupName });
    const personArr = group?.persons;
    const groupsArr = group?.groups;

    res.status(200).json(`
    Here are all the persons in ${groupName.groupName}:
    ${
      personArr?.length! > 0
        ? personArr
        : "Could not find any person in this group"
    },
    Here are all the groups in ${groupName.groupName}:
    ${
      groupsArr?.length! > 0
        ? groupsArr
        : "Could not find any sub group in this group"
    }
    `);
  }
  return;
};

export const updateGroup = async (id: ID, updateInfo: Groups.updateGroup) => {
  console.log("updateGroup");

  try {
    const oldGroupInfo = await GroupModel.findById(id.id);
    if (!oldGroupInfo) {
      throw new Error(`This group does not exist. Please try again.`);
    }

    const {
      groupName: newGroupName,
      groups: newGroups,
      persons: newPersons,
    } = updateInfo;
    const {
      groupName: oldGroupName,
      groups: oldGroups,
      persons: oldPersons,
    } = oldGroupInfo;

    if (
      updateInfo.groupName !== oldGroupInfo.groupName &&
      !(await GroupModel.findOne({ groupName: updateInfo.groupName }))
    ) {
      const father = await GroupModel.findById(oldGroupInfo.fathers);
      await GroupModel.findOneAndUpdate(father?._id, {
        $addToSet: { groups: updateInfo.groupName },
      });
      await GroupModel.findByIdAndUpdate(father?._id, {
        $pull: { groups: oldGroupInfo.groupName },
      });
      await GroupModel.findByIdAndUpdate(id.id, {
        groupName: updateInfo.groupName,
      });
    } else
      throw new Error(
        `Failed to change group name, please make sure you'r not tring to change the group name to group that alraedy exist`
      );

    const personToAdd = newPersons.filter(
      (person) => !oldPersons?.includes(person)
    );
    const personToRemove =
      oldPersons?.filter((person) => !newPersons.includes(person)) || [];

    for (const person of personToRemove) {
      const personId: ID = { id: person as string };
      if (await validateIdLength(person)) {
        await removeGroupFromPerson(personId, oldGroupName!);
        await deleteFromSpecificGroup(personId, oldGroupName!);
      } else throw new Error(`Id should contain 24 letters and numbers!.`);
    }

    for (const person of personToAdd) {
      const personId: ID = { id: person as string };
      if ((await validateIdLength(person)) && (await personExists(personId))) {
        await GroupModel.findByIdAndUpdate(id.id, {
          $addToSet: { persons: person },
        });
        await updatePersonGroups(personId, oldGroupName!);
      } else throw new Error(`Person not exist or Id is not as required.`);
    }

    const groupsToAdd = newGroups.filter(
      (group) => !oldGroups?.includes(group)
    );
    const groupsToRemove =
      oldGroups?.filter((group) => !newGroups.includes(group)) || [];

    for (const group of groupsToAdd) {
      const groupData = await GroupModel.findOne({ groupName: group });
      if (!(await selfFatherRec(id, group))) {
        if (groupData && !(await sameGroupValidation(id, group))) {
          if (!(await groupAlreadyAChild(group))) {
            await GroupModel.findOneAndUpdate(
              { groupName: group },
              { fathers: id.id }
            );
            await GroupModel.findByIdAndUpdate(id.id, {
              $addToSet: { groups: group },
            });
          } else
            throw new Error(`Group already exist in another groups array.`);
        } else
          throw new Error(
            `Cannot add group to her self or Group dose not exist.`
          );
      } else
        throw new Error(
          `Group cannot be her selfs father even when it is not directly her father (grandfather and so on..)`
        );
    }

    for (const group of groupsToRemove) {
      await GroupModel.findByIdAndUpdate(id.id, { $pull: { groups: group } });
      await GroupModel.findOneAndUpdate(
        { groupName: group },
        { $pull: { fathers: id.id } }
      );
    }
  } catch (error) {
    throw error;
  }
};

export const sameGroupValidation = async (
  objectId: ID,
  newGroup: Groups.newGroup | string
): Promise<boolean> => {
  console.log("sameGroupValidation");

  let id: object | ObjectId | string | ID = objectId;
  let name: Groups.newGroup | string = newGroup;
  if (typeof objectId === "object") {
    id = objectId.id;
  }
  if (typeof newGroup === "string") {
    name = newGroup;
  }
  const group = await GroupModel.findById(id);
  let value: boolean = false;
  if (group) {
    value = group.groupName === name;
    return value;
  }
  return value;
};

const selfFatherRec = async (
  id: ID | string,
  groupName: string
): Promise<boolean> => {
  console.log("selfFatherRec");
  let strId;
  if (typeof id !== "string") strId = id.id;
  else strId = id;
  const currGroup = await GroupModel.findById(strId);
  const currGroupFather = await GroupModel.findById(currGroup?.fathers);

  if (currGroupFather) {
    //if have a father then should make a REC check
    if (groupName === currGroupFather.groupName) {
      //same group names? the this is a self father
      return true;
    }
    return selfFatherRec(currGroupFather._id.toString(), groupName);
  }
  return false;
};

export const displayAllGroups = async (res: Response) => {
  try {
    const groups = await GroupModel.find();
    res.status(200).json(groups);
  } catch (error) {
    throw new Error(error);
  }
};

import { GroupModel, PersonModel } from "../models";
import { ID } from "../../interfaces/interfaces.js";
import { createGroup } from "./groupControllers.js";
import { Response } from "express";

//group exist valitaion function
export const groupExist = async (
  groups: string[],
  res: Response
): Promise<boolean> => {
  console.log("groupExist");
  let created: boolean = false;
  for (const group of groups) {
    if (!(await GroupModel.findOne({ groupName: group }))) {
      created = false; //not created yet, the creating a new group
      await createGroup({ groupName: group }, res);
    }
    created = true; //created all the groups or groups already exist
  }
  if (created) {
    return created;
  }

  return !created;
};
//person exist in group valitaion function
export const existInGroups = async (
  id: ID,
  groups: string[]
): Promise<boolean> => {
  console.log("existInGroups");

  for (const group of groups) {
    if (await GroupModel.findOne({ groupName: group })) {
      //looking for the current group
      if (!(await GroupModel.findOne({ groupName: group, persons: id.id }))) {
        //if person is not in the current group then add him
        await GroupModel.updateOne(
          { groupName: group },
          { $addToSet: { persons: id.id } } //adding the person into the current group by id
        );
      }
    }
  }
  return false; //already in the group
};

export const removeGroupFromPerson = async (id: ID, group: string) => {
  let idNum: string | object = id;
  console.log("removeGroupFromPerson");
  if (typeof id === "object") {
    idNum = id.id;
  }
  await PersonModel.findOneAndUpdate(
    { _id: idNum },
    { $pull: { groups: group } } //removing the group from the person groups array
  );
};

export const deleteFromGroup = async (id: ID) => {
  console.log("deleteFromGroup");
  const strId = id.toString(); //converting id value to to string
  await GroupModel.find({ persons: { $in: [strId] } }); //looking for id in groups
  await GroupModel.updateMany(
    { persons: strId },
    { $pull: { persons: strId } }
  ); //updating all the groups removing the current person id
};

export const deleteFromSpecificGroup = async (id: ID, group: string) => {
  console.log("deleteFromSpecificGroup");

  const strId = id.id;
  await GroupModel.find({ persons: { $in: [strId] } }); //looking for id in groups
  await GroupModel.updateOne({ persons: strId }, { $pull: { persons: strId } });
};

export const validateIdLength = async (id: string) => {
  console.log("validateIdLength");
  if (id.length !== 24) {
    return false;
  }
  return true;
};

export const personExists = async (personId: ID) => {
  console.log("personExists");

  const person = await PersonModel.findById(personId.id);
  if (person) {
    return true;
  } else {
    return false;
  }
};

export const updatePersonGroups = async (personId: ID, group: string) => {
  console.log("updatePersonGroups");

  if (await validateIdLength(personId.id as string)) {
    await PersonModel.findByIdAndUpdate(personId.id, {
      $addToSet: { groups: group },
    });
  }
};

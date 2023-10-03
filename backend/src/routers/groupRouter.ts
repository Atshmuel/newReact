import { Router } from "express";
import * as groupController from "../db/controllers/groupControllers";
import * as groupSchemas from "../validator/groupSchema";
import * as interfaces from "../interfaces/interfaces";
import { validateIdLength } from "../db/controllers/helper";

const groupRouter = Router();

groupRouter.get("/search", async (req, res) => {
  const { id, groupName } = req.query;
  const byId = async (idNum: any) => {
    if (!(await validateIdLength(idNum)))
      return res.status(400).json({
        message: "This is not the fromat we're working with, please try again",
      });
    const strId: interfaces.ID = { id: id as string };
    const { error } = groupSchemas.getDelUpGroupSchema.validate({ id });
    if (error) return res.status(400).json({ message: error.message });
    const returnedGroup = await groupController.displayGroupById(strId);
    returnedGroup
      ? res.status(200).json(returnedGroup)
      : res.status(400).json({ message: `${id} dose not exist` });
  };
  const byName = async () => {
    const nameStr: interfaces.Name = { name: groupName as string };
    const { error } = groupSchemas.groupSchema.validate({ groupName });
    if (error) return res.status(400).json({ message: error.message });
    await groupController.displayGroupByName(nameStr, res);
  };
  id
    ? byId(id)
    : groupName
    ? byName()
    : !id && !groupName
    ? res
        .status(400)

        .json({
          message: `Invalid request format, SEARCH request provide either 'id' or 'name'.`,
        })
    : res.status(400).json(`WTF`);
});

groupRouter.get("/search/all", async (req, res) => {
  const { groupName } = req.query;
  const nameStr: interfaces.Groups.newGroup = {
    groupName: groupName as string,
  };
  const { error } = groupSchemas.groupSchema.validate({ groupName });
  if (error) return res.status(400).json({ message: error.message });
  await groupController.displayAllPerAndGro(nameStr, res);
});
groupRouter.get("/showall", async (req, res) => {
  try {
    await groupController.displayAllGroups(res);
  } catch (error) {
    res.status(400).json({
      massage: `could not find any person in the db please create one.`,
    });
  }
});

groupRouter.post("/create", async (req, res) => {
  const groupName = req.body;
  const { error } = groupSchemas.groupSchema.validate(groupName);
  if (error) return res.status(400).json({ message: error.message });
  try {
    await groupController.createGroup(groupName, res);
    return res
      .status(200)
      .json({ message: `${groupName.groupName} has been created.` });
  } catch (error) {
    return res.status(400).json({ message: `${error}.` });
  }
});

groupRouter.patch("/update", async (req, res) => {
  const { id } = req.query;
  const strId: interfaces.ID = { id: id as string };
  const updateInfo = req.body;
  var { error } = groupSchemas.getDelUpGroupSchema.validate({ id });
  if (error) return res.status(400).json({ message: error.message });
  var { error } = groupSchemas.updateGroupSchema.validate({ updateInfo });
  if (error) return res.status(400).json({ message: error.message });
  try {
    await groupController.updateGroup(strId, updateInfo);
    res.status(200).json({
      message: `${id} has been updated with this new info:
      New Group name: ${updateInfo.groupName},
      New Persons Array: ${updateInfo.persons},
      New Groups Array: ${updateInfo.groups}.
      `,
    });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
});

groupRouter.patch("/update/groupingroup", async (req, res) => {
  const { id, groupName } = req.body;

  var { error } = groupSchemas.getDelUpGroupSchema.validate({ id });
  if (error) return res.status(400).json({ message: error.message });
  var { error } = groupSchemas.groupSchema.validate({ groupName });
  if (error) return res.status(400).json({ message: error.message });
  if (!(await validateIdLength(id)))
    return res.status(400).json({
      message: "This is not the fromat we're working with, please try again",
    });
  try {
    //making sure that group dose not her selfs father
    if (await groupController.sameGroupValidation(id, { groupName })) {
      return res.status(400).json({
        message: `A group cannot contain herself`,
      });
    }
    //making sure that group dose not belongs to more then one group
    if (await groupController.groupAlreadyAChild(groupName)) {
      return res.status(400).json({
        message: `This group already belongs to another group`,
      });
    }
    //the new group is ok and create it
    if (await groupController.createGroupInGroup(id, groupName, res)) {
      return res.status(400).json({
        message: `Id: ${id} dose not exist`,
      });
    }
    return res.status(200).json({ message: `${groupName} has been created.` });
  } catch (error) {
    return res.status(400).json({ message: `${error}.` });
  }
});

groupRouter.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const strId: any = { id: id as string }; //using the strID to delete the group
  const { error } = groupSchemas.getDelUpGroupSchema.validate({ id });
  if (error) return res.status(400).json({ message: error.message });
  try {
    const findGroup = await groupController.displayGroupById(strId);
    await groupController.deleteGroup(strId, res);
    res.status(200).json({
      message: `Group: ${findGroup?.groupName}, id:${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ message: `${id} dose not exist` });
  }
});

export default groupRouter;

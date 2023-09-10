import { PersonModel } from "../models/index";
import { ID, Name, Person } from "../../interfaces/interfaces";
import { Request, Response } from "express";
import { deleteFromGroup, existInGroups, groupExist } from "./helper"; //cross person and groups controller
// FIX: controllers are only for db actions, remove res.

//Creating person using peron schema validation
export const createPerson = async (person: Person, res: Response) => {
  let retrunedMessage: string = ""; //init a returned message
  const groupsToadd = Array.from(new Set(person.groups));
  try {
    if (!(await PersonModel.findOne({ name: person.name }))) {
      const newPerson = await PersonModel.create({
        name: person.name,
        age: person.age,
        groups: groupsToadd,
      });
      retrunedMessage = `${person.name} has been created`;
    } else {
      retrunedMessage = `${person.name} already exist`;
    }

    if (!retrunedMessage.includes("already exist")) {
      if (!(await groupExist(person.groups, res))) {
        //if false then group has been created and now returns and keep procssing the request
      }
      const findPerson = await PersonModel.findOne({ name: person.name }); //find person by name

      const ObjectId: ID = { id: findPerson?.id?.toString() || "" }; //take his id as object and convert it to string

      if (await existInGroups(ObjectId, person.groups)) {
      }
    }
    if (retrunedMessage.includes("already exist")) {
      throw Error(retrunedMessage);
    }
    res.status(200).json({ message: retrunedMessage });
  } catch (error) {
    res.status(400).json({ message: retrunedMessage });
  }
};
//Removes person by id
export const removePerson = async (id: ID, res: Response) => {
  const person = await PersonModel.findById(id.id);
  const remove = async () => {
    await PersonModel.deleteOne({ _id: person?._id }); //remove person by id
    await deleteFromGroup(person?.id); //remove preson from all the groups
  };
  if (person) {
    remove();
    return res.status(200).json({ message: `${id.id} has been deleted` });
  }
  return res.status(400).json({ message: `This person id dose not exists` });
  // person
  //   ? remove()
  //   : res.status(400).json({ message: `This person id dose not exists` });
};
//Updating person by id
export const updatePerson = async (
  id: ID,
  newPersonData: Person,
  req: Request,
  res: Response
) => {
  try {
    const oldPerson = await PersonModel.findById(id.id);
    if (!oldPerson)
      return res.status(400).json({
        message:
          "Cant find the person you looking for, please provide a correct ID !",
      });
    await PersonModel.findOneAndUpdate({ _id: id.id }, newPersonData); //updating person with new data
    await deleteFromGroup(oldPerson._id); //remove preson from all the groups
    if (!(await groupExist(newPersonData.groups, res))) {
      //if false then group has been created and now returns and keep procssing the request
    }
    const findPerson = await PersonModel.findOne({ name: newPersonData.name }); //find person by name
    const ObjectId: ID = { id: findPerson?.id?.toString() || "" }; //take his id as object and convert it to string
    if (await existInGroups(ObjectId, newPersonData.groups)) {
    }
    res.status(200).json({
      message: `${oldPerson.name}, id:${
        id.id
      } has been updated to ${JSON.stringify(newPersonData)}`,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
//Show's person by name
export const displayPersonByName = async (name: Name, res: Response) => {
  try {
    const person = await PersonModel.findOne({ name: name.name });
    const show = async () => {
      res.status(200).json(person);
    };
    person
      ? show()
      : res.status(400).json({ message: `${name.name} dose not exists` });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
//Show's person by id
export const displayPersonById = async (id: ID, res: Response) => {
  try {
    const person = await PersonModel.findById(id.id);
    const show = async () => {
      res.status(200).json(person);
    };
    person
      ? show()
      : res.status(400).json({ message: `${id.id} dose not exists` });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const displayPersonGroups = async (name: Name, res: Response) => {
  try {
    const person = await PersonModel.findOne({ name: name.name });
    const showGroups = async () => {
      res.status(200).json({
        message: `Here are all the group's ${person?.name}'s in: ${person?.groups}`,
      });
    };
    person
      ? showGroups()
      : res.status(400).json({ message: `${name.name} dose not exists` });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const displayAllPersons = async (res: Response) => {
  try {
    const person = await PersonModel.find();
    res.status(200).json(person);
  } catch (error: any) {
    throw new Error(error);
  }
};

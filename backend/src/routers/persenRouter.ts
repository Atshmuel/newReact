import { Router } from "express";
import * as presonController from "../db/controllers/presonControllers";
import * as personSchemas from "../validator/personSchema";
import * as interfaces from "../interfaces/interfaces";
import { log } from "console";
const personRouter = Router();

personRouter.get("/search", async (req, res) => {
  const { id, name } = req.query;
  const byId = async () => {
    const strId: interfaces.ID = { id: id as string };
    const { error } = personSchemas.getDelUpPersonSchema.validate({ id });
    if (error) return res.status(400).json({ message: error.message });
    await presonController.displayPersonById(strId, res);
  };
  const byName = async () => {
    const nameStr: interfaces.Name = { name: name as string };
    const { error } = personSchemas.getByNameSchema.validate({ name });
    if (error) return res.status(400).json({ message: error.message });
    await presonController.displayPersonByName(nameStr, res);
  };
  id
    ? byId()
    : name
    ? byName()
    : !id && !name
    ? res
        .status(400)

        .json({
          message: `Invalid request format, SEARCH request provide either 'id' or 'name'.`,
        })
    : res.status(400).json(`WTF`);
});

personRouter.get("/showall", async (req, res) => {
  try {
    await presonController.displayAllPersons(res);
  } catch (error) {
    res.status(400).json({
      massage: `could not find any person in the db please create one.`,
    });
  }
});

personRouter.get("/search/ingroup", async (req, res) => {
  const { name } = req.query;
  const nameStr: interfaces.Name = { name: name as string };
  const { error } = personSchemas.getByNameSchema.validate({ name });
  if (error) return res.status(400).json({ message: error.message });
  await presonController.displayPersonGroups(nameStr, res);
});

personRouter.post("/create", async (req, res) => {
  const person = req.body;
  const { error } = personSchemas.createPersonSchema.validate(person);
  if (error) return res.status(400).json({ message: error.message });
  await presonController.createPerson(person, res);
});

personRouter.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const strId: interfaces.ID = { id: id as string };
  const { error } = personSchemas.getDelUpPersonSchema.validate({ id });
  if (error) return res.status(400).json({ message: error.message });
  try {
    await presonController.removePerson(strId, res);
  } catch {
    res.status(400).json(error);
  }
});

personRouter.patch("/update", async (req, res) => {
  const person = req.body;
  const { id } = req.query;
  const strId: interfaces.ID = { id: id as string };
  const { error: createError } =
    personSchemas.createPersonSchema.validate(person);
  if (createError)
    return res.status(400).json({ message: createError.message });
  const { error: getDelUpError } = personSchemas.getDelUpPersonSchema.validate({
    id,
  });
  if (getDelUpError)
    return res.status(400).json({ message: getDelUpError.message });

  await presonController.updatePerson(strId, person, req, res);
});

export default personRouter;

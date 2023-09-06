import { Form, redirect, useActionData } from "react-router-dom";
import Ok from "../../components/buttons/Ok";
import Exit from "../../components/buttons/Exit";
import "../../styles/Create.css";
import { createFrom } from "../../interfaces/person";
export const CreatePersonForm = () => {
  const data: { errorname: string; errorage: string; errorgroup: string } =
    useActionData();
  return (
    <div className="create--form form">
      <div className="form--info">
        <div className="form--header">
          <Exit />
          <h2 className="modal--title">Create new person</h2>
        </div>
        <Form method="post" action="/persons/create">
          <div className="inputs--form">
            <label>
              <span>Person Name:</span>
              <input type="text" name="name" required />
              {data && data.errorname && <p>{data.errorname}</p>}
            </label>
            <label>
              <span>Person Age:</span>
              <input type="number" name="age" required />
              {data && data.errorage && <p>{data.errorage}</p>}
            </label>
            <label>
              <span>Person Groups:</span>
              <input type="text" name="groups" required />
            </label>
            <Ok />
          </div>
        </Form>
      </div>
    </div>
  );
};

export const createAction = async ({ request }: { request: createFrom }) => {
  const data = await request.formData();
  const subbmition = {
    name: data.get("name"),
    age: Number(data.get("age")),
    groups: [data.get("groups")],
  };
  if (subbmition.name!.length <= 2) {
    return { errorname: "Name must be 2 letter or more" };
  }
  if (subbmition.age === 0) {
    return { errorage: "Age cannot be 0" };
  }
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/person/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subbmition),
  });

  if (!res.ok) {
    throw Error(
      "Person already exist, please try again or just update the person."
    );
  }
  return redirect("/success");
};

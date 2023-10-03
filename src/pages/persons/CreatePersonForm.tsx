import { Form, Link, redirect, useActionData } from "react-router-dom";
import Ok from "../../components/buttons/Ok";
import Exit from "../../components/buttons/Exit";
import "../../styles/Create.css";
import { createFrom } from "../../interfaces/person";
export const CreatePersonForm = () => {
  const data: { errorage: string } = useActionData();

  return (
    <div className="create--form form">
      <div className="form--info">
        <div className="form--header">
          <Link to={"/persons/personinfo"}>
            <Exit />
          </Link>
          <h2 className="modal--title">Create new person</h2>
        </div>
        <Form method="post" action="/persons/create">
          <div className="inputs--form">
            <label>
              <span>Person Name:</span>
              <input
                type="text"
                name="name"
                placeholder="Person name..."
                required
                autoFocus
              />
            </label>
            <label>
              <span>Person Age:</span>
              <input
                type="number"
                name="age"
                placeholder="Person age..."
                required
              />
              {data && data.errorage && <p>{data.errorage}</p>}
            </label>
            <label>
              <span>Person Groups:</span>
              <input
                type="text"
                name="groups"
                placeholder={`Should be Group1,Group2,...`}
              />
            </label>
            <Ok />
          </div>
        </Form>
      </div>
    </div>
  );
};

export const createPersonAction = async ({
  request,
}: {
  request: createFrom;
}) => {
  const data = await request.formData();
  const subbmition = {
    name: data.get("name"),
    age: Number(data.get("age")),
    groups:
      data.get("groups")!.length <= 0 ? [] : data.get("groups")?.split(","),
  };

  if (subbmition.age < 1 || subbmition.age > 120) {
    return { errorage: "Please choose age between 1-120" };
  }
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/person/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subbmition),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw Error(`${message}`);
  }

  return redirect("/persons/personinfo");
};

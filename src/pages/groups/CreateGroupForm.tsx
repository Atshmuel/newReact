import { Form, Link, redirect, useActionData } from "react-router-dom";
import Ok from "../../components/buttons/Ok";
import Exit from "../../components/buttons/Exit";
import "../../styles/Create.css";
import { createFrom } from "../../interfaces/group";
export const CreateGroupForm = () => {
  const data: { error: string } = useActionData();

  return (
    <div className="create--form form">
      <div className="form--info">
        <div className="form--header">
          <Link to={"/groups/groupslist"}>
            <Exit />
          </Link>
          <h2 className="modal--title">Create new group</h2>
        </div>
        <Form method="post" action="/groups/create">
          <div className="inputs--form">
            <label>
              <span>Group Name:</span>
              <input
                type="text"
                name="group-name"
                placeholder="Group name..."
                required
                autoFocus
              />
            </label>
            {data && <p>{data.error}</p>}
            <Ok />
          </div>
        </Form>
      </div>
    </div>
  );
};

export const createGroupAction = async ({
  request,
}: {
  request: createFrom;
}) => {
  const data = await request.formData();

  const subbmition = {
    groupName: data.get("group-name"),
  };

  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/group/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subbmition),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw Error(`${message}`);
  }

  return redirect("/groups/groupslist");
};

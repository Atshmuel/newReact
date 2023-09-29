import React, { useState } from "react";
import { UpdateProps } from "../interfaces/modals";
import Exit from "./buttons/Exit";
import Ok from "./buttons/Ok";
import { Navigate } from "react-router-dom";

const UpdateModal: React.FC<UpdateProps> = ({
  toggleModal,
  name,
  id,
  age,
  groups,
  toggleUpdated,
}) => {
  const data = { name, age, groups }; //Used to make sure that the info has been changed, if hasn't dose not fetching the data to the server
  const [formData, setFromData] = useState({
    name: `${name}`,
    age: age,
    groups: groups,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleInput = (e: {
    target: { name: string; value: string | number | string[] };
  }) => {
    const { name, value } = e.target;
    setErrorMessage(null);

    if (name !== "groups") {
      setFromData({ ...formData, [name]: value });
    } else setFromData({ ...formData, [name]: value.split(",") });
  };
  const handleSubmit = async (e: FormDataEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/person/update?id=${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (
      !res.ok ||
      (data.age === formData.age &&
        data.name === formData.name &&
        data.groups === formData.groups)
    ) {
      setErrorMessage("There is nothing to update...");
      const { message } = await res.json();
      throw Error(message);
    }
    toggleUpdated();
    toggleModal();
  };
  return (
    <div className="create--form form">
      <div className="form--info">
        <div className="form--header">
          <p
            onClick={() => {
              toggleModal();
            }}
          >
            <Exit />
          </p>
          <h2 className="modal--title">Update {`${name}'s`} info</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs--form">
            <label>
              <span>New Name:</span>
              <input
                type="text"
                name="name"
                className="name"
                placeholder="Person name..."
                onChange={handleInput}
              />
            </label>
            <label>
              <span>New Age:</span>
              <input
                type="number"
                name="age"
                placeholder="Person age..."
                onChange={handleInput}
              />
            </label>
            <label>
              <span>New Groups:</span>
              <input
                type="text"
                name="groups"
                placeholder={`Should be Group1,Group2,...`}
                onChange={handleInput}
              />
            </label>
            <div className="update-fail">{errorMessage && errorMessage}</div>

            <Ok />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;

import React, { useState } from "react";
import { UpdateProps } from "../interfaces/modals";
import Exit from "./buttons/Exit";
import Ok from "./buttons/Ok";

const UpdateModal: React.FC<UpdateProps> = ({
  toggleModal,
  type,
  toggleUpdated,
}) => {
  let change: object; //Used to make sure that the info has been changed, if hasn't dose not fetching the data to the server
  const isGroup = "groupName" in type;
  isGroup
    ? (change = {
        groupName: type.groupName,
        persons: type.persons,
        groups: type.groups,
      })
    : (change = { name: type.name, age: type.age, groups: type.groups });

  const [formData, setFromData] = useState(change);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleInput = (e: {
    target: { name: string; value: string | number | string[] };
  }) => {
    const { name, value } = e.target;
    setErrorMessage(null);

    name === "groupName"
      ? setFromData({ ...formData, [name]: value })
      : name === "name"
      ? setFromData({ ...formData, [name]: value })
      : name === "age"
      ? setFromData({ ...formData, [name]: Number(value) })
      : setFromData({ ...formData, [name]: value.split(",") });
  };

  const handleSubmit = async (e: FormDataEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${
        isGroup ? "group" : "person"
      }/update?id=${type._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok || change === formData) {
      const { message } = await res.json();
      setErrorMessage(`${message}`);
      return;
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
          <h2 className="modal--title">
            Update {isGroup ? `${type.groupName}'s` : `${type.name}'s`} info
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs--form">
            <label>
              <span>New {`${isGroup ? "group" : "person"}`} name:</span>
              {isGroup ? (
                <>
                  <input
                    type="text"
                    name="groupName"
                    className="name"
                    placeholder="New name..."
                    onChange={handleInput}
                    autoFocus
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    className="name"
                    placeholder="New name..."
                    onChange={handleInput}
                    autoFocus
                  />
                </>
              )}
            </label>
            <label>
              <span>New {`${isGroup ? "perons array" : "person age"}`}:</span>
              {isGroup ? (
                <>
                  <input
                    type="text"
                    name="persons"
                    placeholder={`Should be Person1,Person2,...`}
                    onChange={handleInput}
                  />
                </>
              ) : (
                <input
                  type="number"
                  name="age"
                  placeholder="Person age..."
                  onChange={handleInput}
                />
              )}
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

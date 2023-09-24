import React, { useState } from "react";
import { UpdateProps } from "../interfaces/modals";
import Exit from "./buttons/Exit";
import Ok from "./buttons/Ok";

const UpdateModal: React.FC<UpdateProps> = ({
  toggleModal,
  name,
  id,
  age,
  groups,
}) => {
  //BUG should send groups as an array instad of an object
  const [formData, setFromData] = useState({
    name: `${name}`,
    age: `${age}`,
    groups: [`${groups}`],
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "groups") {
      setFromData({ ...formData, [name]: [value] });
    }
    setFromData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/person/update?id=${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!res.ok) {
      const { message } = await res.json();
      console.log(message);
    }
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
            <Ok />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;

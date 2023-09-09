import React from "react";
import { modalProp } from "../interfaces/modals";
import Ok from "./buttons/Ok";
import Exit from "./buttons/Exit";

const Modal: React.FC<modalProp> = ({ toggleModal, name, type }) => {
  console.log("🚀 ~ file: Modal.tsx:39 ~ name:", name);
  const message: string =
    type === "delete"
      ? `${name} has been deleted!`
      : `${name} has been updated!`;
  return (
    <div className="modal--details">
      <div className="modal--header">
        <h1 className="modal">
          {`${type.charAt(0).toLocaleUpperCase().concat(type.slice(1))}`}
        </h1>
      </div>
      <div className="modal--info">
        <p className="modal--message">{message}</p>
      </div>
      <div className="modal--footer">
        <p
          onClick={() => {
            toggleModal();
          }}
        >
          <Exit />
        </p>
      </div>
    </div>
  );
};

export default Modal;

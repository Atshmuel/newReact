import React from "react";
import { modalProp } from "../interfaces/modals";
import Ok from "./buttons/Ok";

const Modal: React.FC<modalProp> = ({ toggleModal, name }) => {
  return (
    <div className="modal--overlay">
      <div className="modal--details">
        <div className="modal--header">
          <h1 className="modal">Delete</h1>
        </div>
        <div className="modal--info">
          <p className="modal--message">{`${name}`} has been deleted</p>
        </div>
        <div className="modal--footer">
          <p
            onClick={() => {
              toggleModal(false);
            }}
          >
            <Ok />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

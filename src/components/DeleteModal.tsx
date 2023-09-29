import React from "react";
import { modalProp } from "../interfaces/modals";

const DeleteModal: React.FC<modalProp> = ({ toggleModal, name }) => {
  setTimeout(() => {
    toggleModal();
  }, 5000);
  return (
    <div className="modal--details">
      <div className="modal--header">
        <h1 className="modal">Delete</h1>
      </div>
      <div className="modal--info">
        <p className="modal--message">{`${name}`} has been deleted!</p>
      </div>
      <div className="modal--footer" onClick={toggleModal}></div>
    </div>
  );
};

export default DeleteModal;

import React from "react";
import "../../styles/Buttons.css";
import exit from "../../assets/icons/cancel.svg";

const Exit = () => {
  return (
    <button type="button" className="btn--exit">
      <p className="ok">
        <img src={exit} alt="X" />
      </p>
    </button>
  );
};

export default Exit;

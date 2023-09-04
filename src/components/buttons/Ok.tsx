import React from "react";
import "../../styles/Buttons.css";
import ok from "../../assets/icons/ok.svg";

const Ok = () => {
  return (
    <button className="btn--ok">
      <p className="ok">
        <img src={ok} alt="OK" />
      </p>
    </button>
  );
};

export default Ok;

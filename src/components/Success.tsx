import { Link } from "react-router-dom";
import success from "../assets/icons/success.svg";
import "../styles/Modals.css";
import Ok from "./buttons/Ok";

const SuccessModal = () => {
  return (
    <div className="success--overlay">
      <div className="success--details">
        <img className="success--icon" src={success} alt="Success" />
        <p className="success--message">
          Your request has been successfully completed
        </p>
        <Link to={`/persons/personinfo`}>
          <Ok />
        </Link>{" "}
      </div>
    </div>
  );
};

export default SuccessModal;

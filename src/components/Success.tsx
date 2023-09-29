import { Link } from "react-router-dom";
import success from "../assets/icons/success.svg";
import "../styles/Modals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const SuccessModal = () => {
  return (
    <div className="success--overlay">
      <div className="success--details">
        <h2>Success</h2>{" "}
        <p className="success--message">
          Your request has been successfully completed
        </p>
        <Link to={`/persons/personinfo`}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </Link>{" "}
      </div>
    </div>
  );
};

export default SuccessModal;

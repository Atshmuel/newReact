import "../../styles/Buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Display = () => {
  return (
    <button type="button" className="layout--icons btn-style">
      <FontAwesomeIcon icon={faEye} size="xl" color="rgba(129, 167, 255)" />
    </button>
  );
};

export default Display;

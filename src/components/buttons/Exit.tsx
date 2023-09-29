import "../../styles/Buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Exit = () => {
  return (
    <button type="button" className="btn--exit">
      <FontAwesomeIcon icon={faXmark} color="rgb(129, 166, 255)" size="2x" />
    </button>
  );
};

export default Exit;

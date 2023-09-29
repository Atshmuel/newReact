import "../../styles/Buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Update = () => {
  return (
    <button type="submit" className="btn-style">
      <FontAwesomeIcon
        icon={faFileCircleCheck}
        size="xl"
        color="rgb(129, 166, 255)"
        className="updated--icon"
      />
    </button>
  );
};

export default Update;

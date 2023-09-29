import "../../styles/Buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Ok = () => {
  return (
    <button type="submit" className="btn--ok">
      <FontAwesomeIcon
        icon={faCircleCheck}
        size="2x"
        color="rgb(129, 166, 255)"
      />
    </button>
  );
};

export default Ok;

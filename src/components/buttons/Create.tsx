import "../../styles/Buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Create = () => {
  return (
    <button type="button" className="layout--icons btn-style">
      <FontAwesomeIcon
        className="layout--icons"
        icon={faPlus}
        size="xl"
        color="rgba(129, 167, 255)"
      />
    </button>
  );
};

export default Create;

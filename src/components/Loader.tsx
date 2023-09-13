import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../styles/Loader.css";

const Loading = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} className="spinner" size="6x" />
    </div>
  );
};

export default Loading;

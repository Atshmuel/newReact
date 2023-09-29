import "../../styles/Buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <button className="search-button">
      {
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          className="search--icon"
        />
      }
    </button>
  );
};

export default Search;

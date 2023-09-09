import { Link, Outlet } from "react-router-dom";
import create from "../assets/icons/create.png";
import show from "../assets/icons/show.svg";

const PersonsLayout = () => {
  return (
    <div className="persons">
      <h1>Persons</h1>
      <div className="create-show--person">
        <div className="create">
          {" "}
          <Link to={"create"}>
            <img
              src={create}
              alt="Create new person"
              className="icon create--person"
            />
          </Link>
        </div>
        <div className="show">
          <Link to={"personinfo"}>
            <img
              src={show}
              alt="Show all persons"
              className="icon show--persons"
            />
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default PersonsLayout;

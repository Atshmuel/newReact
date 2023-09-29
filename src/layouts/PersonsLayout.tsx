import { Link, Outlet } from "react-router-dom";
import Create from "../components/buttons/Create";
import Display from "../components/buttons/display";

const PersonsLayout = () => {
  return (
    <div className="persons">
      <h1>Persons</h1>
      <div className="create-show--person">
        <div className="create">
          <Link to={"create"}>
            <Create />
          </Link>
        </div>
        <div className="show">
          <Link to={"personinfo"}>
            <Display />
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default PersonsLayout;

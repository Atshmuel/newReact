import { Link, Outlet } from "react-router-dom";
import Create from "../components/buttons/Create";
import Display from "../components/buttons/display";

const GroupsLayout = () => {
  return (
    <div className="groups">
      <h1>Groups</h1>
      <div className="create-show--group">
        <div className="create">
          <Link to={"create"}>
            {/* should modify to create rather group or person */}
            <Create />
          </Link>
        </div>
        <div className="show">
          <Link to={"GroupsInfo"}>
            <Display />
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default GroupsLayout;

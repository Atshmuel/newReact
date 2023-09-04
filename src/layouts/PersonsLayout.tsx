import { Link, Outlet } from "react-router-dom";

const PersonsLayout = () => {
  return (
    <div className="persons">
      <h1>Persons</h1>
      <div className="welcome">
        Hey there, welcome to Persons page, if you would like to get to see all
        the persons in the db, you can click on{" "}
        <Link to={"personinfo"}>HERE...</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PersonsLayout;

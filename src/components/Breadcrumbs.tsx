import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
export default function Breadcrumbs() {
  const location = useLocation();
  let currLink = "";
  const crombs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currLink += `/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          <Link className="crumb--link" to={currLink}>
            {crumb}
          </Link>
        </div>
      );
    });
  return <div className="breadcrumbs">{crombs}</div>;
}

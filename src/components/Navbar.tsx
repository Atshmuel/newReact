import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <nav className="headerNav">
      <h1 className="title">Pesron&Group App</h1>
      <ul className="navbar--list">
        <NavLink to="/">
          <li className="navbar--ca">Home</li>
        </NavLink>
        <NavLink to="/Search">
          <li className="navbar--ca">Search</li>
        </NavLink>
        <NavLink to="/Persons">
          <li className="navbar--ca">Persons</li>
        </NavLink>
        <NavLink to="/Groups">
          <li className="navbar--ca">Groups</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

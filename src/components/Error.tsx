import { Link, useRouteError } from "react-router-dom";
import { ErrorType } from "../interfaces/person";
import Ok from "../components/buttons/Ok";
import "../styles/Modals.css";
const Error = ({ url }: { url: string }) => {
  const error = useRouteError() as ErrorType;
  console.log(error);

  return (
    <div className="error--modal">
      <div className="error--details">
        <div className="error--header">
          <h1 className="error">Error</h1>
        </div>
        <div className="error--info">
          <p className="error--message">{error.message}</p>
        </div>
        <div className="error--footer">
          <Link to={`${url}`}>
            <Ok />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;

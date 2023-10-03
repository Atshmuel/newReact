import Breadcrumbs from "../components/Breadcrumbs";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout(): JSX.Element {
  const location = useLocation();

  const hideDiv = () => {
    return location.pathname !== "/";
  };
  return (
    <div className="root--layout">
      <header>
        <Navbar />
        <Breadcrumbs />
      </header>
      <main>
        {!hideDiv() && <div>Welcome to persons&groups manegment system</div>}

        <Outlet />
      </main>
    </div>
  );
}

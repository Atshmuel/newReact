import Breadcrumbs from "../components/Breadcrumbs";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout(): JSX.Element {
  return (
    <div className="root--layout">
      <header>
        <Navbar />
        <Breadcrumbs />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

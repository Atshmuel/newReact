import "./styles/App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//pages
import NotFound from "./pages/notFound";
import { PersonInfo, personsLoader } from "./pages/persons/PersonInfo";
import PersonLayout from "./layouts/PersonsLayout";
//components
import Error from "./components/Error";
//layouts
import RootLayout from "./layouts/RootLayout";
//persons
import PersonDetails, {
  personDetailLoader,
} from "./pages/persons/PersonDetails";
import SearchLayout from "./layouts/SearchLayout";
import {
  createPersonAction,
  CreatePersonForm,
} from "../src/pages/persons/CreatePersonForm";
//groups
import {
  CreateGroupForm,
  createGroupAction,
} from "./pages/groups/CreateGroupForm";
import { GroupsList, groupsLoader } from "./pages/groups/GroupsList";
import { GroupDetails, groupsInfoLoader } from "./pages/groups/GroupDetails";

import SuccessModal from "./components/Success";
import GroupsLayout from "./layouts/GroupsLayout";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path={"/"} element={""} />
      <Route path={"/Search"} element={<SearchLayout />} />
      {/* Persons layout */}
      <Route
        path={"/Persons"}
        element={<PersonLayout />}
        errorElement={<Error url={""} />}
      >
        <Route
          path={"create"}
          element={<CreatePersonForm />}
          action={createPersonAction}
        />

        <Route
          path={"PersonInfo"}
          element={<PersonInfo />}
          loader={personsLoader}
        >
          <Route
            path={":id"}
            element={<PersonDetails />}
            loader={personDetailLoader}
          />
        </Route>
      </Route>
      {/* Groups layout */}
      <Route
        path={"/Groups"}
        element={<GroupsLayout />}
        errorElement={<Error url={"/groups"} />}
      >
        <Route
          path={"create"}
          element={<CreateGroupForm />}
          action={createGroupAction}
        />

        <Route
          path={"groupslist"}
          element={<GroupsList />}
          loader={groupsLoader}
        >
          <Route
            path={":id"}
            element={<GroupDetails />}
            loader={groupsInfoLoader}
          />
        </Route>
      </Route>

      <Route path={"/success"} element={<SuccessModal />} />
      <Route path={"*"} element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

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
import PersonDetails, {
  personDetailLoader,
} from "./pages/persons/PersonDetails";
import SearchLayout from "./layouts/SearchLayout";
import {
  createAction,
  CreatePersonForm,
} from "../src/pages/persons/CreatePersonForm";
import SuccessModal from "./components/Success";
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
          action={createAction}
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
      <Route path={"/Groups"} element={"/"} />
      <Route path={"/success"} element={<SuccessModal />} />
      <Route path={"*"} element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

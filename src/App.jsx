import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./styles/global.css";
import MainLayout from "./components/layouts/MainLayout";
import { ROUTE_CONTANTS } from "./core/utils/constants";
import { Login, Register } from "./pages/auth";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
            <Route path={ROUTE_CONTANTS.LOGIN} element={<Login />} />
            <Route path={ROUTE_CONTANTS.REGISTER} element={<Register />} />
          </Route>
        )
      )}
    />
  );
};

export default App;

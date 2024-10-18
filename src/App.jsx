import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./styles/global.css";
import MainLayout from "./components/layouts/MainLayout";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import { Login, Register } from "./pages/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import Cabinet from "./pages/cabinet";
import LoadingWrapper from "./components/shared/LoadinWrapper";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setIsAuth(Boolean(user));
    });
  });

  return (
    <LoadingWrapper loading={loading}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route
                path={ROUTE_CONSTANTS.LOGIN}
                element={
                  isAuth ? (
                    <Navigate to={ROUTE_CONSTANTS.CABINET} />
                  ) : (
                    <Login setIsAuth={setIsAuth} />
                  )
                }
              />
              <Route
                path={ROUTE_CONSTANTS.REGISTER}
                element={
                  isAuth ? (
                    <Navigate to={ROUTE_CONSTANTS.CABINET} />
                  ) : (
                    <Register />
                  )
                }
              />
              <Route
                path={ROUTE_CONSTANTS.CABINET}
                element={
                  isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />
                }
              />
            </Route>
          )
        )}
      />
    </LoadingWrapper>
  );
};

export default App;

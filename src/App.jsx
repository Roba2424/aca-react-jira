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
import { useEffect } from "react";
import Profile from "./pages/profile";
import LoadingWrapper from "./components/shared/LoadinWrapper";
import CabinetLayout from "./components/layouts/CabinetLayout";
import { fetchUserProfileInfo } from "./state-managment/slices/userProfile";
import { useDispatch, useSelector } from "react-redux";
import Cabinet from "./pages/cabinet";

const App = () => {
  const distpatch = useDispatch();
  const {
    loading,
    authUserInfo: { isAuth },
  } = useSelector((store) => store.userProfile);

  useEffect(() => {
    distpatch(fetchUserProfileInfo());
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route
                path={ROUTE_CONSTANTS.LOGIN}
                element={
                  isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />
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

              {/* CABINET LAYOUT */}
              <Route
                path={ROUTE_CONSTANTS.CABINET}
                element={
                  isAuth ? (
                    <CabinetLayout />
                  ) : (
                    <Navigate to={ROUTE_CONSTANTS.LOGIN} />
                  )
                }
              >
                <Route path={ROUTE_CONSTANTS.PROFILE} element={<Profile />} />
                <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />
              </Route>
            </Route>
          )
        )}
      />
    </LoadingWrapper>
  );
};

export default App;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./styles/global.css";
import MainLayout from "./components/layouts/MainLayout";
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "./core/utils/constants";
import { Login, Register } from "./pages/auth";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./services/firebase";
import Profile from "./pages/profile";
import LoadingWrapper from "./components/shared/LoadinWrapper";
import { AuthContext } from "./context/authContext";
import { doc, getDoc } from "@firebase/firestore";
import CabinetLayout from "./components/layouts/CabinetLayout";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState({});

  const handleUserData = useCallback(async (uid) => {
    const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    const response = await getDoc(docRef);

    if (response.exists()) {
      setUserProfileInfo(response.data());
    }
  }, []);

  // const handleUserData = async (uid) => {
  //   const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
  //   const response = await getDoc(docRef);

  //   if (response.exists()) {
  //     setUserProfileInfo(response.data());
  //   }
  // };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user?.uid && handleUserData(user.uid);

      setLoading(false);
      setIsAuth(Boolean(user));
    });
  }, []);

  const getUserInfoData = useCallback(() => {
    console.log("getUserData");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, userProfileInfo, handleUserData }}>
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
                </Route>
              </Route>
            )
          )}
        />
      </LoadingWrapper>
    </AuthContext.Provider>
  );
};

export default App;

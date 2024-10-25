export const regexpValidation = /^(?=.*[A-Z])(?=(.*\d){3,})[A-Za-z\d]{6,8}$/;

export const ROUTE_CONSTANTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  CABINET: "/cabinet",
  PROFILE: "/profile",
};

export const FIRESTORE_PATH_NAMES = {
  REGISTERED_USERS: "registered-users",
};

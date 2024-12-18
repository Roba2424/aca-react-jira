export const regexpValidation = /^(?=.*[A-Z])(?=(.*\d){3,})[A-Za-z\d]{6,8}$/;

export const ROUTE_CONSTANTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  CABINET: "/cabinet",
  PROFILE: "/cabinet/profile",
};

export const FIRESTORE_PATH_NAMES = {
  ISSUES: "issues",
  REGISTERED_USERS: "registered-users",
};

export const STORAGE_PATH_NAMES = {
  PROFILE_IMAGES: "profile_images",
};

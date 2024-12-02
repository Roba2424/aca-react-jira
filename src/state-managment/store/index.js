import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfile";
import issueReducer from "../slices/issues";

export const store = configureStore({
  reducer: { userProfile: userProfileReducer, issue: issueReducer },
});

import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

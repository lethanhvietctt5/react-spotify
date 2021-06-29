import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "redux/slices/auth";
import playerReducer from "redux/slices/player";
import searchReducer from "redux/slices/search";

const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

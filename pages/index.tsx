import Home from "components/Main/Home";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { setToken } from "redux/slices/auth";
import spotify, { getToken, url_auth } from "spotify";

export default function HomePage() {
  return <Home />;
}

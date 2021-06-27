import Home from "components/Main/Home";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { setToken } from "redux/slices/auth";
import spotify, { getToken, url_auth } from "spotify";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token);

  useEffect(() => {
    if (!token) {
      const _token = getToken();
      if (_token.access_token) {
        dispatch(setToken(_token));
        spotify.setToken(_token.access_token);
      } else {
        window.location.href = url_auth;
      }
    }
  }, []);
  return <Home />;
}

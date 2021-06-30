import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import spotify, { getToken, url_auth } from "spotify";
import { setToken } from "redux/slices/auth";
import useRecentlyTracks from "hooks/useRecentlyTracks";
import useFuturedPlaylists from "hooks/useFuturedPlaylists";
import useNewRelease from "hooks/useNewRelease";
import HomeContext from "context";
import Header from "components/Header";
import Head from "next/head";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export default function Main({ children }: Props) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token);
  const recentlyTracks = useRecentlyTracks();
  const newRelease = useNewRelease();
  const futuredPlaylists = useFuturedPlaylists();

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
  }, [token, dispatch]);
  return (
    <HomeContext.Provider
      value={{ recentlyTracks, newRelease, futuredPlaylists }}
    >
      <div className="w-main bg-gradient-to-t from-start to-end overflow-y-scroll no-scrollbar pb-10">
        <Header />
        <div className="w-full h-full max-w-screen-2xl">{children}</div>
      </div>
    </HomeContext.Provider>
  );
}

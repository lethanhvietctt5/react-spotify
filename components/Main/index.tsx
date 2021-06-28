import Header from "./Header";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import spotify, { getToken, url_auth } from "spotify";
import { setToken } from "redux/slices/auth";
import useRecentlyTracks from "hooks/useRecentlyTracks";
import useFuturedPlaylists from "hooks/useFuturedPlaylists";
import useNewRelease from "hooks/useNewRelease";
import HomeContext from "context";
import Script from "next/script";
import usePlayer from "hooks/usePlayer";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export default function Main({ children }: Props) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token);
  const recentlyTracks = useRecentlyTracks();
  const newRelease = useNewRelease();
  const futuredPlaylists = useFuturedPlaylists();
  const player = useState();

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
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="beforeInteractive"

      />
      <div className="w-main h-full bg-gradient-to-t from-start to-end overflow-y-scroll no-scrollbar pb-4">
        <Header />
        {children}
      </div>
    </HomeContext.Provider>
  );
}

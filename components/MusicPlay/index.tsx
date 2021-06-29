import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import Controls from "./Controls";
import Song from "./Song";
import Volume from "./Volume";
import {
  setShuffle,
  setDuration,
  setRepeat,
  setTrackID,
  setImage,
  setArtist,
  setName,
  setOffset,
  setURI,
  setDeviceID,
  setPosition,
  setPaused,
} from "redux/slices/player";

export default function Music() {
  const token = useAppSelector((state) => state.auth.access_token);
  const PlayerState = useAppSelector((state) => state.player);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const scr = document.createElement("script");
    scr.src = "https://sdk.scdn.co/spotify-player.js";
    if (token) {
      document.body.appendChild(scr);
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "test",
          getOAuthToken: (callback) => {
            callback(token);
          },
          volume: 0.5,
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener("player_state_changed", (state) => {
          dispatch(setShuffle(state.shuffle));
          dispatch(
            setArtist(
              state.track_window.current_track.artists
                .map((artist) => artist.name)
                .join(", ")
            )
          );
          dispatch(setDuration(state.duration));
          dispatch(
            setImage(state.track_window.current_track.album.images[0].url)
          );
          dispatch(setName(state.track_window.current_track.name));
          dispatch(setPaused(state.paused));
          dispatch(setRepeat(state.repeat_mode));
          if (PlayerState.position == 0) dispatch(setPosition(state.position));
          if (state.duration == 0) dispatch(setPosition(0));
          dispatch(setTrackID(state.track_window.current_track.id));
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          dispatch(setDeviceID(device_id));
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        player.connect().then(async (success) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            );
          }
        });
      };
    }
    return () => {
      if (scr.parentNode == document.body) document.body.removeChild(scr);
    };
  }, [token]);

  useEffect(() => {
    let inter: NodeJS.Timeout;
    if (!PlayerState.paused) {
      inter = setInterval(() => {
        dispatch(setPosition(PlayerState.position + 1000));
      }, 1000);
    }
    if (
      PlayerState.duration_ms != 0 &&
      PlayerState.duration_ms - PlayerState.position < 1000
    ) {
      dispatch(setPosition(0));
      dispatch(setOffset(PlayerState.offset + 1));
    }
    return () => {
      clearInterval(inter);
    };
  }, [PlayerState]);

  return (
    <div className="bg-footerBackground h-24 border-t border-gray-700 flex">
      <Song />
      <Controls />
      <Volume />
    </div>
  );
}

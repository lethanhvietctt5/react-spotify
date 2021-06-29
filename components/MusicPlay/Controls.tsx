import { debounce } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { setOffset } from "redux/slices/player";
import spotify from "spotify";

function msToTime(duration: number) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let h: string;
  if (hours == 0) {
    h = "";
  } else if (hours < 10) {
    h = "0" + hours.toString();
  } else h = hours.toString();

  let m: string;
  if (minutes < 10) {
    m = "0" + minutes.toString();
  } else m = minutes.toString();

  let s: string;
  if (seconds < 10) {
    s = "0" + seconds.toString();
  } else s = seconds.toString();

  if (h.length > 0) {
    return h + ":" + m + ":" + s;
  } else return m + ":" + s;
}

export default function Controls() {
  const state = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const [crtTime, setCrtTime] = useState<number>(0);
  const [isOnChange, setOnChange] = useState<boolean>(false);

  useEffect(() => {
    if (!isOnChange) {
      setCrtTime(state.position);
    }
  }, [state.position]);

  // Dừng phát nhạc
  async function pause() {
    await spotify.pause(state.device_id);
  }

  // Phát nhạc
  async function play() {
    await spotify.playMusic(
      state.uri,
      state.offset,
      state.position,
      state.device_id
    );
  }

  // Tua nhanh
  async function forward(device_id: string, position: number) {
    await spotify.forward(device_id, position);
  }

  const debounceForward = useCallback(
    debounce((nextValue: number, device_id: string) => {
      forward(device_id, nextValue);
      setOnChange(false);
    }, 100),
    []
  );

  function handleChange(value: number) {
    setOnChange(true);
    setCrtTime(value);
    debounceForward(value, state.device_id);
  }

  // Bài tiếp theo
  async function next() {
    if (state.uri) {
      await spotify.next(state.device_id);
      dispatch(setOffset(state.offset + 1));
    }
  }

  // Bài trước
  async function previous() {
    if (state.uri) {
      await spotify.previous(state.device_id);
      dispatch(setOffset(state.offset - 1));
    }
  }

  // Shuffle
  async function shuffle() {
    await spotify.toggleShuffle(!state.shuffle, state.device_id);
  }

  return (
    <div className="w-1/3 lg:w-1/2 h-full text-gray-500 flex justify-center items-center px-4">
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <div className="flex w-full lg:w-1/3 justify-around items-center">
            <div className="hover:text-white">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                onClick={() => previous()}
              >
                <g fill="none">
                  <path
                    d="M13.75 13.035a1 1 0 0 1-1.577.817L5.04 8.817a1 1 0 0 1 0-1.634l7.133-5.035a1 1 0 0 1 1.577.817v10.07z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M1.75 13.25a.75.75 0 0 0 1.5 0V2.75a.75.75 0 0 0-1.5 0v10.5z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="text-3xl text-white">
              {state.paused ? (
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  onClick={() => play()}
                >
                  <path
                    fill="currentColor"
                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8zM6 12V4l6 4l-6 4z"
                  ></path>
                </svg>
              ) : (
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  onClick={() => pause()}
                >
                  <g fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12zm9-3a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9zm4 0a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            <div className="hover:text-white">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                onClick={() => next()}
              >
                <g fill="none">
                  <path
                    d="M2 2.965a1 1 0 0 1 1.577-.817l7.133 5.035a1 1 0 0 1 0 1.634l-7.133 5.035A1 1 0 0 1 2 13.035V2.965z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M14 2.75a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0V2.75z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="text-xs">{msToTime(state.position)}</div>
          <div className="w-10/12 mx-3 mt-1">
            <Slider
              min={0}
              max={state.duration_ms}
              value={crtTime}
              style={{ color: "gray" }}
              onChange={(e, value) => {
                handleChange(value as number);
              }}
            />
          </div>
          <div className="text-xs">{msToTime(state.duration_ms)}</div>
        </div>
      </div>
    </div>
  );
}

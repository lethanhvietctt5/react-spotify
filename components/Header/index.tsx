import { debounce } from "@material-ui/core";
import { useAppDispatch } from "hooks";
import useProfile from "hooks/useProfile";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { setKeyword } from "redux/slices/search";

export default function Header() {
  const user = useProfile();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const debounceSearch = useCallback(
    debounce((nextValue: string) => {
      dispatch(setKeyword(nextValue));
    }, 500),
    []
  );

  return (
    <div
      className={
        router.pathname.includes("/search")
          ? "h-14 flex justify-between items-center mr-4 p-2"
          : "h-14 flex justify-end items-center mr-4 p-2"
      }
    >
      {router.pathname.includes("/search") ? (
        <div className="w-1/3 mt-4 h-full flex ml-4 items-center">
          <div className="h-full text-3xl bg-white rounded-l-full flex justify-center items-center pl-2">
            <svg width="1em" height="1em" viewBox="0 0 36 36">
              <path
                className="clr-i-outline clr-i-outline-path-1"
                d="M16.33 5.05A10.95 10.95 0 1 1 5.39 16A11 11 0 0 1 16.33 5.05m0-2.05a13 13 0 1 0 13 13a13 13 0 0 0-13-13z"
                fill="currentColor"
              ></path>
              <path
                className="clr-i-outline clr-i-outline-path-2"
                d="M35 33.29l-7.37-7.42l-1.42 1.41l7.37 7.42A1 1 0 1 0 35 33.29z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="h-full">
            <input
              type="text"
              placeholder="Nghệ sĩ, bài hát hoặc poscast"
              className="h-full focus:outline-none rounded-r-full px-4"
              onChange={(e) => {
                debounceSearch(e.target.value);
              }}
            />
          </div>
        </div>
      ) : null}

      <div className="flex h-full justify-center items-center rounded-full bg-black">
        <div className="h-full mr-2">
          <Image
            className="h-full rounded-full mr-2"
            height="40"
            width="40"
            src={user?.image || "/images/test.jpeg"}
            alt=""
          />
        </div>
        <div className="text-white mr-2">{user?.display_name}</div>
        <div className="text-white mr-4 text-xl">
          <svg width="1em" height="1em" viewBox="0 0 15 15">
            <g fill="none">
              <path d="M4 6h7l-3.5 4.5L4 6z" fill="currentColor"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

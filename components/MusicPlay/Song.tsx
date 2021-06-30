import { useAppSelector } from "hooks";
import Image from "next/image";
import { useContext } from "react";

export default function Song() {
  const state = useAppSelector((state) => state.player);
  return (
    <div className="w-1/3 lg:w-1/4 min-w-min h-full text-white flex items-center pl-4">
      <div className="2xl:p-3 w-1/5 mr-3">
        <Image
          layout="responsive"
          height="64"
          width="64"
          className="h-full"
          src={state.image || "/images/test.jpeg"}
          alt=""
        />
      </div>
      <div>
        <div className="text-sm">{state.name}</div>
        <div className="text-xs text-gray-400">{state.artist}</div>
      </div>
    </div>
  );
}

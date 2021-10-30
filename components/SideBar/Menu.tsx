import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Menu() {
  return (
    <div className="p-2">
      <Link href="/">
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-white hover:cursor-pointer ">
          <div className="text-xl">
            <svg width="1em" height="1em" viewBox="0 0 1200 1200">
              <path
                d="M600 0L56.645 422.323V1200h373.829V730.541h339.054V1200h373.828V422.323L600 0z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="text-sm ml-4 font-medium">Trang chủ</div>
        </div>
      </Link>

      <Link href="/search" scroll={false}>
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-white hover:cursor-pointer ">
          <div className="text-xl">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="text-sm ml-4 font-medium">Tìm kiếm</div>
        </div>
      </Link>

      <Link href="/library">
        <div className="flex justify-start items-center text-white py-3 px-4 rounded hover:text-white hover:cursor-pointer ">
          <div className="text-xl">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M7 3h2v18H7zM4 3h2v18H4zm6 0h2v18h-2z"
                fill="currentColor"
              ></path>
              <path
                d="M19.062 20.792l-6.223-16.89l1.877-.692l6.223 16.89z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="text-sm ml-4 font-medium">Thư viện </div>
        </div>
      </Link>
    </div>
  );
}

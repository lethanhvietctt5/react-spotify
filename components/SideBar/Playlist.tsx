export default function Playlist() {
  return (
    <div>
      <div className="p-2">
        <div className="flex justify-start items-center text-gray-400 py-3 px-4 rounded hover:text-white hover:cursor-pointer">
          <div className="text-2xl">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="text-sm ml-4 font-medium">Tạo playlist</div>
        </div>
        <div className="flex justify-start items-center text-gray-400 py-3 px-4 rounded hover:text-white hover:cursor-pointer">
          <div className="text-2xl">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m7 14l.72-.66C15.3 14 17 12.46 17 10.57c0-1.54-1.21-2.75-2.75-2.75c-.87 0-1.7.41-2.25 1.05a3.007 3.007 0 0 0-2.25-1.05C8.21 7.82 7 9.03 7 10.57c0 1.89 1.7 3.43 4.28 5.77L12 17z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="text-sm ml-4 font-medium">Bài hát đã thích</div>
        </div>
      </div>

      <div className="p-2">
        <div className="text-gray-500 my-3 mx-4 py-3 border-t border-gray-500 hover:text-white hover:cursor-pointer"></div>
      </div>
    </div>
  );
}

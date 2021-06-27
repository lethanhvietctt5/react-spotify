import useProfile from "../../hooks/useProfile";

export default function Header() {
  const user = useProfile();
  return (
    <div className="h-14 flex justify-end items-center mr-4 p-2">
      <div className="flex h-full justify-center items-center rounded-full bg-black">
        <div className="h-full">
          <div className="h-full">
            <img
              className="h-full rounded-full mr-2"
              src={user?.image}
              alt=""
            />
          </div>
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

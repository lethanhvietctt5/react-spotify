import Slider from "@material-ui/core/Slider";

export default function Volume() {
  return (
    <div className="text-gray-500 w-1/3 lg:w-1/4 ">
      <div className="w-full h-full flex justify-center items-center px-4">
        <div className="text-xl">
          <svg width="1em" height="1em" viewBox="0 0 512 512">
            <path
              d="M189.65 192H120a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h69.65a16 16 0 0 1 10.14 3.63l91.47 75a8 8 0 0 0 12.74-6.46V119.83a8 8 0 0 0-12.74-6.44l-91.47 75a16 16 0 0 1-10.14 3.61z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            ></path>
            <path
              d="M384 320c9.74-19.41 16-40.81 16-64c0-23.51-6-44.4-16-64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            ></path>
          </svg>
        </div>
        <div className="w-8/12 ml-4 mt-2">
          <Slider min={0} max={100} value={1} style={{ color: "gray"}}/>
        </div>
      </div>
    </div>
  );
}

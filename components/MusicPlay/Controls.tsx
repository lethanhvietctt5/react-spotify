import Slider from "@material-ui/core/Slider";

export default function Controls() {
  return (
    <div className="w-1/3 lg:w-1/2 h-full text-gray-500 flex justify-center items-center px-4">
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <div className="flex w-full lg:w-1/3 justify-around items-center">
            <div>
              <svg width="1em" height="1em" viewBox="0 0 256 256">
                <path
                  d="M237.034 187.258l-.036.06a6.01 6.01 0 0 1-.764.932l-23.992 23.992a6 6 0 0 1-8.484-8.484L217.515 190h-16.58a70.139 70.139 0 0 1-56.961-29.313l-41.713-58.399A58.113 58.113 0 0 0 55.064 78H32a6 6 0 0 1 0-12h23.064a70.139 70.139 0 0 1 56.962 29.313l41.713 58.399A58.113 58.113 0 0 0 200.936 178h16.58l-13.758-13.758a6 6 0 0 1 8.484-8.484l23.992 23.992a6.01 6.01 0 0 1 .764.932l.036.06a6 6 0 0 1 .515.978c.01.024.017.05.027.075a5.945 5.945 0 0 1 .31 1.043l.008.058a5.804 5.804 0 0 1 0 2.208c-.003.02-.005.04-.009.058a5.954 5.954 0 0 1-.309 1.044c-.01.024-.017.05-.027.074a6 6 0 0 1-.515.978zm-92.858-81.904a6 6 0 0 0 8.37-1.395l1.193-1.67A58.113 58.113 0 0 1 200.936 78h16.58l-13.758 13.758a6 6 0 1 0 8.484 8.484l23.992-23.992a6.01 6.01 0 0 0 .764-.932l.036-.06a6 6 0 0 0 .515-.978c.01-.025.017-.05.027-.074a5.954 5.954 0 0 0 .31-1.044l.008-.058a5.804 5.804 0 0 0 0-2.208c-.003-.02-.005-.04-.009-.058a5.945 5.945 0 0 0-.309-1.043l-.027-.075a6 6 0 0 0-.515-.978l-.036-.06a6.01 6.01 0 0 0-.764-.932l-23.992-23.992a6 6 0 0 0-8.484 8.484L217.515 66h-16.58a70.139 70.139 0 0 0-56.961 29.313l-1.194 1.671a6 6 0 0 0 1.396 8.37zm-32.352 45.291a5.999 5.999 0 0 0-8.37 1.396l-1.193 1.67A58.113 58.113 0 0 1 55.064 178H32a6 6 0 0 0 0 12h23.064a70.139 70.139 0 0 0 56.962-29.313l1.194-1.671a6 6 0 0 0-1.396-8.37z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div>
              <svg width="1em" height="1em" viewBox="0 0 16 16">
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
              <svg width="1em" height="1em" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8zM6 12V4l6 4l-6 4z"
                ></path>
              </svg>
            </div>
            <div>
              <svg width="1em" height="1em" viewBox="0 0 16 16">
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

            <div>
              <svg width="1em" height="1em" viewBox="0 0 15 15">
                <g fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.354 1.854a.5.5 0 1 0-.708-.708l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 1 0 .708-.708L2.207 4H9.5A3.5 3.5 0 0 1 13 7.5a.5.5 0 0 0 1 0A4.5 4.5 0 0 0 9.5 3H2.207l1.147-1.146zM2 7.5a.5.5 0 0 0-1 0A4.5 4.5 0 0 0 5.5 12h7.293l-1.147 1.146a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708L12.793 11H5.5A3.5 3.5 0 0 1 2 7.5z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <Slider style={{ color: "gray" }} />
        </div>
      </div>
    </div>
  );
}

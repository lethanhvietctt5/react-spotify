import { useAppDispatch } from "../../hooks";
import { RTrack } from "../../hooks/useRecentlyTracks";
interface topicProps {
  title: string;
  sub_title: string;
  tracks: Array<RTrack>;
}

export default function Topic({ title, sub_title, tracks }: topicProps) {
  function renderTrack() {
    let _tracks = tracks.slice(0,14)
    let res = _tracks.map((item) => (
      <div
        key={item.id}
        className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded-lg"
      >
        <div className="item w-full relative">
          <img className="w-full" src={item.image} alt="" />
          <div className="sub_item absolute bottom-0 right-0 mb-3 mr-3 hidden">
            <img className="w-10" src="/svgs/play.svg" alt="" />
          </div>
        </div>
        <div className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {item.name}
        </div>
        <div className="text-xs text-gray-400 mt-2 font-medium">
          {item.singer.name}
        </div>
      </div>
    ));
    return res;
  }

  return (
    <div className="w-full px-8 text-white mt-6">
      <div className="text-2xl font-bold hover:underline mb-2 ml-2">
        <span className="cursor-pointer">{title}</span>
      </div>
      <div className="mb-4 ml-2 text-sm text-gray-300">{sub_title}</div>
      <div className="grid grid-cols-7 gap-4">{renderTrack()}</div>
    </div>
  );
}

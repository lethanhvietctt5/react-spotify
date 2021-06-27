import { useAppDispatch } from "../../hooks";
import { RTrack } from "../../hooks/useRecentlyTracks";
interface topicProps {
  title: string;
  sub_title: string;
  tracks: Array<RTrack>;
}

export default function Topic({ title, sub_title, tracks }: topicProps) {
  const dispatch = useAppDispatch();

  function renderTrack() {
    let res = tracks.map((item) => (
      <div
        key={item.id}
        className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded-lg"
      >
        <div className="w-full relative">
          <img className="w-full" src={item.image} alt="" />
          <div className="absolute bottom-0 right-0 mb-3 mr-3">
            <img className="w-10" src="/svgs/play.svg" alt="" />
          </div>
        </div>
        <div className="text-lg font-semibold mt-2">{item.name}</div>
        <div className="text-sm text-gray-400 mt">{item.singer.name}</div>
      </div>
    ));
    return res;
  }

  return (
    <div className="w-full px-8 text-white">
      <div className="text-2xl font-bold hover:underline cursor-pointer mb-2 ml-2">
        {title}
      </div>
      <div className="mb-4 ml-2 text-sm text-gray-300">{sub_title}</div>
      <div className="grid grid-cols-7 gap-4">{renderTrack()}</div>
    </div>
  );
}

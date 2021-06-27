import { Playlist } from "hooks/useFuturedPlaylists";
import { RTrack } from "hooks/useRecentlyTracks";
import Link from "next/link";
interface topicProps {
  title: string;
  sub_title: string;
  tracks: Array<RTrack>;
  playlists: Array<Playlist> | undefined;
  type: string;
}

export default function Topic({
  title,
  sub_title,
  tracks,
  type,
  playlists,
}: topicProps) {
  function renderTrack() {
    let _tracks = tracks;
    let _playlists = playlists;
    let res: JSX.Element[] | undefined = [];
    if (type === "playlist") {
      res = _playlists?.map((item) => (
        <Link href={`/${type}/${item.id}`} key={item.id}>
          <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded">
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
              {item.description}
            </div>
          </div>
        </Link>
      ));
    } else {
      res = _tracks?.map((item) => (
        <Link href={`/${type}/${item.id}`} key={item.id}>
          <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded">
            <div className="item w-full relative">
              <img className="w-full" src={item.image} alt="" />
              <div className="sub_item absolute bottom-0 right-0 mb-3 mr-3 hidden">
                <img className="w-10" src="/svgs/play.svg" alt="" />
              </div>
            </div>
            <div className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
              {item.name}
            </div>
            <Link href={`/artist/${item.singer.id}`}>
              <div className="text-xs text-gray-400 mt-2 font-medium cursor-pointer hover:underline">
                {item.singer.name}
              </div>
            </Link>
          </div>
        </Link>
      ));
    }
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

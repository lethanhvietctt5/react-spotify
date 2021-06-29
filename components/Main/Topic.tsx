import { Playlist } from "hooks/useFuturedPlaylists";
import { RTrack } from "hooks/useRecentlyTracks";
import Link from "next/link";
import Image from "next/image";
import spotify from "spotify";
import { useAppDispatch, useAppSelector } from "hooks";
import { Album } from "hooks/useNewRelease";
import { setOffset, setURI } from "redux/slices/player";
interface topicProps {
  title: string;
  sub_title: string;
  tracks: Array<RTrack>;
  albums: Array<Album>;
  playlists: Array<Playlist> | undefined;
  type: string;
}

export default function Topic({
  title,
  sub_title,
  tracks,
  type,
  playlists,
  albums,
}: topicProps) {
  const device_id = useAppSelector((state) => state.player.device_id);
  const dispatch = useAppDispatch();
  async function play(uri: string, offset: number, position_ms: number) {
    await spotify.playMusic(uri, offset - 1, position_ms, device_id);
    dispatch(setURI(uri));
    dispatch(setOffset(offset - 1));
  }

  function renderTrack() {
    let _tracks = tracks;
    let _playlists = playlists;
    let res: JSX.Element[] | undefined = [];
    if (type === "playlist") {
      res = _playlists?.map((item) => (
        <div
          key={item.id}
          className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded"
        >
          <div className="item w-full relative">
            <Link href={`/${type}/${item.id}`}>
              <div>
                <Image
                  layout="responsive"
                  height="64"
                  width="64"
                  src={item.image}
                  alt=""
                />
              </div>
            </Link>
            <div
              className="sub_item w-1/5 absolute bottom-0 right-0 mb-3 mr-3 hidden"
              onClick={() => play(item.uri, 1, 0)}
            >
              <Image
                layout="responsive"
                height="64"
                width="64"
                src="/svgs/play.svg"
                alt=""
              />
            </div>
          </div>
          <div className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <Link href={`/${type}/${item.id}`}>{item.name}</Link>
          </div>
          <div className="text-xs text-gray-400 mt-2 font-medium">
            {item.description}
          </div>
        </div>
      ));
    } else if (type == "track") {
      res = _tracks?.map((item) => (
        <div
          key={item.id}
          className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded"
        >
          <div className="item w-full relative">
            <div className="w-full">
              <Image
                layout="responsive"
                height="64"
                width="64"
                src={item.image}
                alt=""
              />
            </div>
            <div
              className="sub_item w-1/5 absolute bottom-0 right-0 mb-3 mr-3 hidden"
              onClick={() => play(item.uri, item.offset, 0)}
            >
              <Image
                layout="responsive"
                height="64"
                width="64"
                src="/svgs/play.svg"
                alt=""
              />
            </div>
          </div>
          <div
            className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline cursor-pointer"
            onClick={() => play(item.uri, item.offset, 0)}
          >
            {item.name}
          </div>
          <Link href={`/artist/${item.singer.id}`}>
            <div className="text-xs text-gray-400 mt-2 font-medium cursor-pointer hover:underline">
              {item.singer.name}
            </div>
          </Link>
        </div>
      ));
    } else {
      res = albums?.map((item) => (
        <div
          key={item.id}
          className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded"
        >
          <div className="item w-full relative">
            <Link href={`/${type}/${item.id}`}>
              <div className="w-full">
                <Image
                  layout="responsive"
                  height="64"
                  width="64"
                  src={item.image}
                  alt=""
                />
              </div>
            </Link>
            <div
              className="sub_item w-1/5 absolute bottom-0 right-0 mb-3 mr-3 hidden"
              onClick={() => play(item.uri, 1, 0)}
            >
              <Image
                layout="responsive"
                height="64"
                width="64"
                src="/svgs/play.svg"
                alt=""
              />
            </div>
          </div>
          <Link href={`/${type}/${item.id}`}>
            <div className="text-sm font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer hover:underline">
              {item.name}
            </div>
          </Link>
          <Link href={`/artist/${item.singer.id}`}>
            <div className="text-xs text-gray-400 mt-2 font-medium cursor-pointer hover:underline">
              {item.singer.name}
            </div>
          </Link>
        </div>
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

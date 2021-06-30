import { useAppDispatch, useAppSelector } from "hooks";
import useAlbum from "hooks/useAlbum";
import Image from "next/image";
import { setOffset, setURI } from "redux/slices/player";
import spotify from "spotify";
import { msToTime } from "utils";
import Head from "next/head";

interface Props {
  id: string;
}

export default function Album({ id }: Props) {
  let album = useAlbum(id);

  const device_id = useAppSelector((state) => state.player.device_id);
  const track_id = useAppSelector((state) => state.player.track_id);
  const paused = useAppSelector((state) => state.player.paused);
  const dispatch = useAppDispatch();

  async function play(uri: string, offset: number, position_ms: number) {
    await spotify.playMusic(uri, offset, position_ms, device_id);
    dispatch(setURI(uri));
    dispatch(setOffset(offset));
  }

  return (
    <div className="pb-10">
      <Head>
        <title>Album: {album?.name}</title>
      </Head>
      <div className="w-full h-52 lg:h-60 2xl:h-72 flex justify-start p-4 ml-4 text-white">
        <div className="w-1/6 mr-8 flex justify-center items-center">
          <div className="w-full">
            <Image
              layout="responsive"
              height="64"
              width="64"
              src={album?.image || "/images/test.jpeg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-between my-8">
          <div className="text-sm">Album</div>
          <div className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
            {album?.name}
          </div>
          <div>
            <div className="flex text-sm">
              <div className="font-bold">
                {album?.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-gray-400 mx-8 text-sm">
        <div className="w-full flex pr-8 py-4 border-b border-gray-500">
          <div className="w-5/12 flex">
            <div className="w-1/7 text-center">#</div>
            <div>TIÊU ĐỀ</div>
          </div>
          <div className="w-7/12 flex justify-end">
            <svg width="1em" height="1em" viewBox="0 0 256 256">
              <path
                d="M128 230a102 102 0 1 1 102-102a102.115 102.115 0 0 1-102 102zm0-192a90 90 0 1 0 90 90a90.102 90.102 0 0 0-90-90zm62 90a6 6 0 0 0-6-6h-50V72a6 6 0 0 0-12 0v56a6 6 0 0 0 6 6h56a6 6 0 0 0 6-6z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        {album?.tracks.map((track, index) => (
          <div
            key={track.id}
            className="w-full flex items-center pr-8 py-2 my-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <div className="w-5/12 flex items-center">
              {track.id == track_id ? (
                paused ? (
                  <div className="w-1/7 flex justify-center items-center">
                    <div className="w-2/3 text-green-600 flex justify-center items-center text-xl">
                      <svg width="1em" height="1em" viewBox="0 0 256 256">
                        <path
                          d="M239.969 128a15.9 15.9 0 0 1-7.656 13.656l-143.97 87.985A15.998 15.998 0 0 1 64 215.992V40.008a15.998 15.998 0 0 1 24.344-13.649l143.969 87.985A15.9 15.9 0 0 1 239.969 128z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-1/7 flex justify-center items-center">
                    <div className="w-1/3">
                      <Image
                        layout="responsive"
                        height="64"
                        width="64"
                        src={"/gifs/playing.gif"}
                      />
                    </div>
                  </div>
                )
              ) : (
                <div className="w-1/7 text-center">{index + 1}</div>
              )}

              <div className="w-6/7">
                <div
                  className="text-white text-base cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis"
                  onClick={() => {
                    play("spotify:album:" + album?.id, index, 0);
                  }}
                >
                  {track.name}
                </div>
                <div className="text-xs">
                  {track.artists?.map((artist) => artist.name).join(", ")}
                </div>
              </div>
            </div>
            <div className="w-7/12 text-right">
              {msToTime(track.duration_ms)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

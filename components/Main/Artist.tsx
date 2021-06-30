import { useAppDispatch, useAppSelector } from "hooks";
import useArtist from "hooks/useArtist";
import useArtistTopTracks from "hooks/useArtistTopTracks";
import Image from "next/image";
import { setOffset, setURI } from "redux/slices/player";
import spotify from "spotify";
import { msToTime } from "utils";
import Head from "next/head";
interface Props {
  id: string;
}

export default function Artist({ id }: Props) {
  const profile = useArtist(id);
  const topTracks = useArtistTopTracks(id);
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
    <div className="px-10 pb-10">
      <Head>
        <title>Nghệ sĩ: {profile?.name}</title>
      </Head>
      <div className="h-72 text-gray-400">
        <div className="flex items-end h-full">
          <div className="h-full w-64">
            <Image
              layout="responsive"
              height="64"
              width="64"
              src={profile?.image || "/images/test.jpeg"}
              alt=""
            />
          </div>
          <div className="ml-8 pt-6 pb-3 h-full flex flex-col justify-between">
            <div className="text-white text-xl">Artist</div>
            <div>
              <div className="text-5xl text-white mb-6 font-black">
                {profile?.name}
              </div>
              <div>{profile?.followers} người theo dõi</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white mt-10 mb-6 text-3xl font-bold">Phổ biến</div>
      {topTracks?.map((track, index) => (
        <div
          key={track.id}
          className="text-gray-400 w-8/12 hover:bg-white hover:bg-opacity-10 py-2 px-4 rounded"
        >
          <div className="flex justify-between w-full items-center">
            <div className="flex w-7/12 items-center">
              <div className="w-1/12 flex justify-center items-center">
                {track.id == track_id ? (
                  paused ? (
                    <div className="w-2/3 flex justify-center items-center">
                      <div className="w-full text-green-600 flex justify-center items-center text-xl">
                        <svg width="1em" height="1em" viewBox="0 0 256 256">
                          <path
                            d="M239.969 128a15.9 15.9 0 0 1-7.656 13.656l-143.97 87.985A15.998 15.998 0 0 1 64 215.992V40.008a15.998 15.998 0 0 1 24.344-13.649l143.969 87.985A15.9 15.9 0 0 1 239.969 128z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="w-2/3 flex justify-center items-center">
                      <div className="w-full">
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
                  <div className="w-full flex justify-center items-center">
                    <div>{index + 1}</div>
                  </div>
                )}
              </div>
              <div className="flex items-center h-10">
                <Image
                  layout="responsive"
                  height="64"
                  width="64"
                  src={track.image || "/images/test.jpeg"}
                  alt=""
                />
                <div
                  className="ml-2 text-white hover:underline cursor-pointer"
                  onClick={() => {
                    play(track.uri, track.offset - 1, 0);
                  }}
                >
                  <div>{track.name}</div>
                </div>
              </div>
            </div>
            <div>{msToTime(track.duration_ms)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

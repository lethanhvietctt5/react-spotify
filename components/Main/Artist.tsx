import useArtist from "hooks/useArtist";
import useArtistTopTracks from "hooks/useArtistTopTracks";

interface Props {
  id: string;
}

function msToTime(duration: number) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let h: string;
  if (hours == 0) {
    h = "";
  } else if (hours < 10) {
    h = "0" + hours.toString();
  } else h = hours.toString();

  let m: string;
  if (minutes < 10) {
    m = "0" + minutes.toString();
  } else m = minutes.toString();

  let s: string;
  if (seconds < 10) {
    s = "0" + seconds.toString();
  } else s = seconds.toString();

  if (h.length > 0) {
    return h + ":" + m + ":" + s;
  } else return m + ":" + s;
}

export default function Artist({ id }: Props) {
  const profile = useArtist(id);
  const topTracks = useArtistTopTracks(id);

  return (
    <div className="px-10">
      <div className="h-72 text-gray-400">
        <div className="flex items-end h-full">
          <div className="h-full">
            <img className="h-full" src={profile?.image} alt="" />
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
        <div key={track.id} className="text-gray-400 w-8/12 hover:bg-white hover:bg-opacity-10 py-2 px-4 rounded">
          <div className="flex justify-between w-full items-center">
            <div className="flex w-7/12 items-center">
              <div className="w-1/12">{index+1}</div>
              <div className="flex items-center">
                <img className="w-1/12" src={track.image} alt="" />
                <div className="ml-2 text-white">
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

import useAlbum from "hooks/useAlbum";
import Image from "next/image";
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

export default function Album({ id }: Props) {
  let album = useAlbum(id);
  console.log(album);
  return (
    <div>
      <div className="w-full h-72 flex justify-start p-4 ml-4 text-white">
        <div className="w-1/6 mr-8">
          <Image
            layout="responsive"
            height="64"
            width="64"
            src={album?.image || "/images/test.jpeg"}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between my-8">
          <div className="text-sm">Album</div>
          <div className="text-6xl font-extrabold">{album?.name}</div>
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
          <div key={track.id} className="w-full flex items-center pr-8 py-2 my-2 hover:bg-white hover:bg-opacity-10 rounded">
            <div className="w-5/12 flex items-center">
              <div className="w-1/7 text-center">{index + 1}</div>
              <div className="w-6/7">
                <div className="text-white text-base">{track.name}</div>
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

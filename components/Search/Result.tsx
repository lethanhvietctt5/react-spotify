import Image from "next/image";
import { IResult } from ".";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "hooks";
import spotify from "spotify";
import { setOffset, setURI } from "redux/slices/player";
import Head from "next/head";

interface Props {
  result: IResult | undefined;
}

export default function Result({ result }: Props) {
  const device_id = useAppSelector((state) => state.player.device_id);
  const keyword = useAppSelector((state) => state.search.keyword);
  const dispatch = useAppDispatch();

  async function play(uri: string, offset: number, position_ms: number) {
    await spotify.playMusic(uri, offset - 1, position_ms, device_id);
    dispatch(setURI(uri));
    dispatch(setOffset(offset - 1));
  }

  function renderArtist() {
    if (result?.artists && result.artists.id.length > 0) {
      return (
        <div>
          <div className="text-2xl text-white font-bold mt-6 ml-6 hover:underline cursor-pointer">
            Nghệ sĩ
          </div>
          <div className="grid grid-cols-7 gap-4 mt-4 ml-4">
            <div>
              <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded">
                <div className="item w-full relative">
                  <div>
                    <Image
                      layout="responsive"
                      height="64"
                      width="64"
                      src={result.artists.image || "/images/test.jpeg"}
                      alt=""
                    />
                  </div>
                </div>
                <Link href={`/artist/${result.artists.id}`}>
                  <div className="text-sm text-white font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer hover:underline">
                    {result.artists.name}
                  </div>
                </Link>
                <div className="text-xs text-gray-400 mt-2 font-medium">
                  Nghệ sĩ
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  function renderTracks() {
    if (result?.tracks && result.tracks.length > 0) {
      return (
        <div>
          <div className="text-2xl text-white font-bold mt-6 ml-6 hover:underline cursor-pointer">
            Bản nhạc
          </div>
          <div className="grid grid-cols-7 gap-4 mt-4 ml-4">
            {result.tracks.map((track) => (
              <div key={track.id}>
                <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded">
                  <div className="item w-full relative">
                    <div>
                      <Image
                        layout="responsive"
                        height="64"
                        width="64"
                        src={track.image || "/images/test.jpeg"}
                        alt=""
                      />
                    </div>
                    <div
                      className="sub_item w-2/6 absolute bottom-0 right-0 mb-3 mr-3 invisible opacity-0"
                      onClick={() => {
                        play(track.uri, track.offset, 0);
                      }}
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
                    className="text-sm text-white font-semibold mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline cursor-pointer"
                    onClick={() => {
                      play(track.uri, track.offset, 0);
                    }}
                  >
                    {track.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 font-medium cursor-pointer hover:underline">
                    {track.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  function renderAlbums() {
    if (result?.albums && result.albums.length > 0) {
      return (
        <div>
          <div className="text-2xl text-white font-bold mt-6 ml-6 hover:underline cursor-pointer">
            Album
          </div>
          <div className="grid grid-cols-7 gap-4 mt-4 ml-4">
            {result.albums.map((album) => (
              <div key={album.id}>
                <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded">
                  <div className="item w-full relative">
                    <Link href={`/album/${album.id}`}>
                      <div className="cursor-pointer">
                        <Image
                          layout="responsive"
                          height="64"
                          width="64"
                          src={album.image || "/images/test.jpeg"}
                          alt=""
                        />
                      </div>
                    </Link>
                    <div
                      className="sub_item w-2/6 absolute bottom-0 right-0 mb-3 mr-3 invisible opacity-0 hover:underline cursor-pointer"
                      onClick={() => {
                        play(album.uri, 1, 0);
                      }}
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
                  <Link href={`/album/${album.id}`}>
                    <div className="text-sm text-white font-semibold mt-2 hover:underline cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {album.name}
                    </div>
                  </Link>
                  <div className="text-xs text-gray-400 mt-2 font-medium hover:underline cursor-pointer">
                    {album.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  function renderPlaylist() {
    if (result?.playlists && result.playlists.length > 0) {
      return (
        <div>
          <div className="text-2xl text-white font-bold mt-6 ml-6 hover:underline cursor-pointer">
            Playlist
          </div>
          <div className="grid grid-cols-7 gap-4 mt-4 ml-4">
            {result.playlists.map((playlist) => (
              <div key={playlist.id}>
                <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded">
                  <div className="item w-full relative">
                    <Link href={`/playlist/${playlist.id}`}>
                      <div className="cursor-pointer">
                        <Image
                          layout="responsive"
                          height="64"
                          width="64"
                          src={playlist.image || "/images/test.jpeg"}
                          alt=""
                        />
                      </div>
                    </Link>

                    <div
                      className="sub_item w-2/6 absolute bottom-0 right-0 mb-3 mr-3 invisible opacity-0"
                      onClick={() => {
                        play(playlist.uri, 1, 0);
                      }}
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
                  <Link href={`/playlist/${playlist.id}`}>
                    <div className="text-sm text-white font-semibold mt-2 hover:underline cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {playlist.name}
                    </div>
                  </Link>
                  <div className="text-xs text-gray-400 mt-2 font-medium hover:underline cursor-pointer">
                    {playlist.owner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="pr-4 pb-10">
      <Head>
        <title>Tìm kiếm: {keyword}</title>
      </Head>
      {renderArtist()}
      {renderAlbums()}
      {renderPlaylist()}
      {renderTracks()}
    </div>
  );
}

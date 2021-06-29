import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";
import Image from "next/image";
import Link from "next/link";
import { setOffset, setURI } from "redux/slices/player";
import Head from "next/head";

interface Track {
  id: string;
  name: string;
  artist: string;
  image: string;
  uri: string;
  offset: number;
}

interface Album {
  id: string;
  name: string;
  artist: string;
  image: string;
  uri: string;
}

export default function Library() {
  const token = useAppSelector((state) => state.auth.access_token);
  const [savedTracks, setSavedTracks] = useState<Track[]>();
  const [savedAlbums, setSavedAlbums] = useState<Album[]>();
  const device_id = useAppSelector((state) => state.player.device_id);
  const dispatch = useAppDispatch();

  async function play(uri: string, offset: number, position_ms: number) {
    await spotify.playMusic(uri, offset - 1, position_ms, device_id);
    dispatch(setURI(uri));
    dispatch(setOffset(offset - 1));
  }

  const fetchSavedTracks = async () => {
    const res = await spotify.getSavedTracks();
    let singleTrack: Track = {} as Track;
    let allSavedTracks: Track[] = [];
    for (const track of res.items) {
      singleTrack.id = track.track.id;
      singleTrack.artist = track.track.artists
        .map((artist: { id: string; name: string }) => artist.name)
        .join(", ");
      singleTrack.image = track.track.album.images[0].url;
      singleTrack.name = track.track.name;
      singleTrack.offset = track.track.track_number;
      singleTrack.uri = track.track.album.uri;
      allSavedTracks.push(JSON.parse(JSON.stringify(singleTrack)));
    }
    setSavedTracks(allSavedTracks);
  };

  const fetchSavedAlbums = async () => {
    const res = await spotify.getSavedAlbums();
    let singleAlbum: Album = {} as Album;
    let allSavedAlbums: Album[] = [];
    for (const track of res.items) {
      singleAlbum.id = track.album.id;
      singleAlbum.artist = track.album.artists
        .map((artist: { id: string; name: string }) => artist.name)
        .join(", ");
      singleAlbum.image = track.album.images[0].url;
      singleAlbum.name = track.album.name;
      singleAlbum.uri = track.album.uri;
      allSavedAlbums.push(JSON.parse(JSON.stringify(singleAlbum)));
    }
    setSavedAlbums(allSavedAlbums);
  };

  useEffect(() => {
    fetchSavedTracks();
    fetchSavedAlbums();
  }, [token]);

  function renderSavedTracks() {
    if (savedTracks && savedTracks.length > 0) {
      return (
        <div>
          <div className="text-2xl text-white font-bold mt-6 ml-6 hover:underline cursor-pointer">
            Nhạc đã lưu
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mt-4 ml-4">
            {savedTracks?.map((track) => (
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
                      className="sub_item w-1/5 absolute bottom-0 right-0 mb-3 mr-3 hidden"
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
  }

  function renderSavedAlbums() {
    if (savedAlbums && savedAlbums.length > 0) {
      return (
        <div>
          <div className="text-2xl text-white font-bold mt-10 ml-6 hover:underline cursor-pointer">
            Album đã lưu
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mt-4 ml-4">
            {savedAlbums.map((album) => (
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
                      className="sub_item w-1/5 absolute bottom-0 right-0 mb-3 mr-3 hidden hover:underline cursor-pointer"
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

  return (
    <div>
      <Head>
        <title>Thư viện</title>
      </Head>
      {renderSavedTracks()}
      {renderSavedAlbums()}
    </div>
  );
}

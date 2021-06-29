import { useEffect, useState } from "react";
import { useAppSelector } from ".";
import spotify from "spotify";

export interface Album {
  id: string;
  href: string;
  duration: number;
  singer: {
    name: string;
    id: string;
    href: string;
  };
  name: string;
  image: string;
  uri: string;
}

export default function useUserTopTracks() {
  const [newRelease, setNewRelease] = useState<Album[]>([]);
  const token = useAppSelector((state) => state.auth.access_token);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      if (token) {
        const res = await spotify.getNewReleaseTracks();
        let allITrack: Album[] = [] as Album[];
        let singleTrack: Album = {} as Album;
        for (const track of res.albums.items) {
          singleTrack.id = track.id;
          singleTrack.href = track.href;
          singleTrack.duration = track.duration_ms;
          singleTrack.name = track.name;
          singleTrack.image = track.images[0].url;
          singleTrack.singer = {
            name: track.artists[0].name,
            id: track.artists[0].id,
            href: track.artists[0].href,
          };
          singleTrack.uri = track.uri;
          let isExisting = allITrack.filter(
            (track) => track.id === singleTrack.id
          );
          if (isExisting.length <= 0) {
            allITrack.push(JSON.parse(JSON.stringify(singleTrack)));
          }
        }
        setNewRelease(allITrack);
      }
    };
    fetchRecentTracks();
  }, [token]);

  return newRelease;
}

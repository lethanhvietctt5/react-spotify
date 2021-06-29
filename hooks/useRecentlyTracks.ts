import { useEffect, useState } from "react";
import { useAppSelector } from ".";
import spotify from "spotify";

export interface RTrack {
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
  offset: number;
}

export default function useRecentlyTracks() {
  const [recentlyTracks, setRecentTracks] = useState<RTrack[]>([]);
  const token = useAppSelector((state) => state.auth.access_token);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      if (token) {
        const res = await spotify.getRecentlyPlayedTracks();
        let allRTrack: RTrack[] = [] as RTrack[];
        let singleTrack: RTrack = {} as RTrack;
        for (const track of res.items) {
          singleTrack.id = track.track.id;
          singleTrack.href = track.track.href;
          singleTrack.duration = track.track.duration_ms;
          singleTrack.name = track.track.name;
          singleTrack.image = track.track.album.images[0].url;
          singleTrack.singer = {
            name: track.track.artists[0].name,
            id: track.track.artists[0].id,
            href: track.track.artists[0].href,
          };
          singleTrack.uri = track.track.album.uri;
          singleTrack.offset = track.track.track_number;
          let isExisting = allRTrack.filter(
            (track) => track.id === singleTrack.id
          );
          if (isExisting.length <= 0) {
            allRTrack.push(JSON.parse(JSON.stringify(singleTrack)));
          }
        }
        setRecentTracks(allRTrack);
      }
    };
    fetchRecentTracks();
  }, [token]);

  return recentlyTracks;
}

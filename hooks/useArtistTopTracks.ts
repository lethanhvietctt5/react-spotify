import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

interface Track {
  id: string;
  name: string;
  image: string;
  duration_ms: number;
  uri: string;
  offset: number;
}

export default function useArtistTopTracks(artist_id: string) {
  const token = useAppSelector((state) => state.auth.access_token);
  const [tracks, setTracks] = useState<Track[]>();

  useEffect(() => {
    const fetArtistTopTracks = async () => {
      const res = await spotify.getArtistTopTracks(artist_id);
      let totalTopTracks: Track[] = [];

      totalTopTracks = res.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        image: track.album.images[0].url,
        duration_ms: track.duration_ms,
        uri: track.album.uri,
        offset: track.track_number,
      }));
      setTracks(totalTopTracks);
    };
    if (artist_id) fetArtistTopTracks();
  }, [token, artist_id]);

  return tracks;
}

import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

interface Artist {
  id: string;
  name: string;
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  artists: Array<Artist>;
}

interface Album {
  artists: Array<Artist>;
  id: string;
  image: string;
  name: string;
  tracks: Array<Track>;
}

export default function useAlbum(album_id: string) {
  const token = useAppSelector((state) => state.auth.access_token);
  const [album, setAlbum] = useState<Album>();
  useEffect(() => {
    console.log(album_id);
    const fetchAAlbum = async () => {
      if (spotify.access_token) {
        const res = await spotify.getAAlbum(album_id);
        let alb: Album = {} as Album;
        alb.artists = res.artists.map((artist: Artist) => ({
          id: artist.id,
          name: artist.name,
        }));
        alb.id = res.id;
        alb.image = res.images[0].url;
        alb.name = res.name;
        alb.tracks = res.tracks.items.map((track: Track) => ({
          id: track.id,
          name: track.name,
          duration_ms: track.duration_ms,
          artists: track.artists.map((artist: Artist) => ({
            id: artist.id,
            name: artist.name,
          })),
        }));
        setAlbum(alb);
      }
    };
    if (album_id) {
      fetchAAlbum();
    }
  }, [album_id]);
  return album;
}

import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

interface Artist {
  id: string;
  name: string;
}

interface Album {
  id: string;
  name: string;
}

interface Track {
  added_at: string;
  id: string;
  duration_ms: number;
  album: Album;
  name: string;
  artists: Artist[];
  image: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: Track[];
}

export default function usePlaylist(playlist_id: string) {
  const token = useAppSelector((state) => state.auth.access_token);
  const [playlist, setPlaylist] = useState<Playlist>();
  useEffect(() => {
    const fetchAPlaylist = async () => {
      if (spotify.access_token) {
        const res = await spotify.getAPlaylist(playlist_id);
        let pll: Playlist = {} as Playlist;
        pll.id = res.id;
        pll.name = res.name;
        pll.description = res.description;
        pll.image = res.images[0].url;
        pll.tracks = res.tracks.items.map((track: any) => ({
          added_at: track.added_at,
          id: track.track.id,
          name: track.track.name,
          duration_ms: track.track.duration_ms,
          album: { id: track.track.album.id, name: track.track.album.name },
          artists: track.track.album.artists.map((artist: Artist) => ({
            id: artist.id,
            name: artist.name,
          })),
          image: track.track.album.images[0].url,
        }));
        setPlaylist(pll);
      }
    };
    if (playlist_id) {
      fetchAPlaylist();
    }
  }, [token, playlist_id]);
  return playlist;
}

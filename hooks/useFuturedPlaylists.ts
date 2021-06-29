import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  uri: string;
}

export default function useFuturedPlaylists() {
  const token = useAppSelector((state) => state.auth.access_token);
  const [futuredPlaylists, setFuturedPlaylists] = useState<Playlist[]>();
  useEffect(() => {
    const fetchFuturedPlaylists = async () => {
      if (spotify.access_token) {
        const res = await spotify.getFuturedPlaylists();
        let playlists: Playlist[] = [];
        let pll: Playlist = {} as Playlist;
        for (const playlist of res.playlists.items) {
          pll.id = playlist.id;
          pll.name = playlist.name;
          pll.description = playlist.description;
          pll.image = playlist.images[0].url;
          pll.uri = playlist.uri;
          playlists.push(JSON.parse(JSON.stringify(pll)));
        }
        setFuturedPlaylists(playlists);
      }
    };
    fetchFuturedPlaylists();
  }, [token]);
  return futuredPlaylists;
}

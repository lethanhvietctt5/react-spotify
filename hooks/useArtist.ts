import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

interface Artist {
  id: string;
  image: string;
  followers: number;
  name: string;
}

export default function useArtist(artist_id: string) {
  const token = useAppSelector((state) => state.auth.access_token);
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    const fetchArtistProfile = async () => {
      const res = await spotify.getArtistProfile(artist_id);
      setArtist({
        id: res.id,
        name: res.name,
        followers: +res.followers.total,
        image: res.images[0].url,
      });
    };
    if (artist_id) fetchArtistProfile();
  }, [token, artist_id]);
  return artist;
}

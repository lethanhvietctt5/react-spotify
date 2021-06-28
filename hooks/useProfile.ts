import { useEffect, useState } from "react";
import { useAppSelector } from ".";
import spotify from "spotify";

interface User {
  display_name: string;
  email: string;
  url: string;
  image: string;
  id: string;
}

export default function useProfile() {
  const [user, setUser] = useState<User>();
  const token = useAppSelector((state) => state.auth.access_token);
  useEffect(() => {
    const fetchProfile = async () => {
      if (spotify.access_token) {
        const res = await spotify.getProfile();
        setUser({
          display_name: res.display_name,
          email: res.email,
          url: res.external_urls.spotify,
          image: res.images[0]?.url,
          id: res.id,
        });
      }
    };
    fetchProfile();
  }, [token]);

  return user;
}

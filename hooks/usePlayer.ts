import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";

export default function usePlayer() {
  const [player, setPlayer] = useState<any>();
  const token = useAppSelector((state) => state.auth.access_token);
  const [done, setDone] = useState(false);

  useEffect(() => {
    console.log(player);
    if (!player || !done) {
      setPlayer(window.Spotify?.Player)
    } else {
      setDone(true)
    }
  }, [token, done, player]);
  return player;
}

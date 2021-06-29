import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import spotify from "spotify";

interface Browse {
  id: string;
  name: string;
  image: string;
}

export default function useBrowse() {
  const token = useAppSelector((state) => state.auth.access_token);
  const [browses, setBrowses] = useState<Browse[]>();

  useEffect(() => {
    const fetchBrowses = async () => {
      const res = await spotify.getBrowses();
      let singleBrowse: Browse = {} as Browse;
      let allBrowse: Browse[] = [];
      for (const browse of res.categories.items) {
        singleBrowse.name = browse.name;
        singleBrowse.id = browse.id;
        singleBrowse.image = browse.icons[0].url;
        allBrowse.push(JSON.parse(JSON.stringify(singleBrowse)));
      }
      setBrowses(allBrowse);
    };

    fetchBrowses();
  }, [token]);
  return browses;
}

import { Playlist } from "hooks/useFuturedPlaylists";
import { Album } from "hooks/useNewRelease";
import { RTrack } from "hooks/useRecentlyTracks";
import { createContext } from "react";

interface HContext {
  recentlyTracks: RTrack[];
  newRelease: Album[];
  futuredPlaylists: Playlist[] | undefined;
}

const HomeContext = createContext<HContext>({} as HContext);

export default HomeContext;

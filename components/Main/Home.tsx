import useNewRelease from "hooks/useNewRelease";
import useRecentlyTracks from "hooks/useRecentlyTracks";
import Topic from "./Topic";
import Reac from "react";
import useFuturedPlaylists, { Playlist } from "hooks/useFuturedPlaylists";

export default function Home() {
  const recentlyTracks = useRecentlyTracks();
  const newRelease = useNewRelease();
  const futuredPlaylists = useFuturedPlaylists();
  return (
    <Reac.Fragment>
      <Topic
        title="Đã phát gần đây"
        sub_title="Lấy cảm hứng từ những hoạt động gần đây của bạn"
        tracks={recentlyTracks}
        type="track"
        playlists={[]}
      />
      <Topic
        title="Nhạc cho bạn"
        sub_title="Dựa trên những ca khúc bạn đã nghe"
        tracks={newRelease}
        type="album"
        playlists={[]}
      />
      <Topic
        title="Nổi bật"
        sub_title="Nổi bật trên các bảng xếp hạng gần đây"
        playlists={futuredPlaylists}
        tracks={[]}
        type="playlist"
      />
    </Reac.Fragment>
  );
}

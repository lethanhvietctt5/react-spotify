import useNewRelease from "hooks/useNewRelease";
import useRecentlyTracks from "hooks/useRecentlyTracks";
import Topic from "./Topic";
import Reac, { useContext } from "react";
import useFuturedPlaylists, { Playlist } from "hooks/useFuturedPlaylists";
import HomeContext from "context";

export default function Home() {
  const context = useContext(HomeContext);

  return (
    <Reac.Fragment>
      <Topic
        title="Đã phát gần đây"
        sub_title="Lấy cảm hứng từ những hoạt động gần đây của bạn"
        tracks={context.recentlyTracks}
        type="track"
        playlists={[]}
        albums={[]}
      />
      <Topic
        title="Nhạc cho bạn"
        sub_title="Dựa trên những ca khúc bạn đã nghe"
        tracks={[]}
        albums={context.newRelease}
        type="album"
        playlists={[]}
      />
      <Topic
        title="Nổi bật"
        sub_title="Nổi bật trên các bảng xếp hạng gần đây"
        playlists={context.futuredPlaylists}
        tracks={[]}
        albums={[]}
        type="playlist"
      />
    </Reac.Fragment>
  );
}

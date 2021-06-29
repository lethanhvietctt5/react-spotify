
import Topic from "./Topic";
import Reac, { useContext } from "react";
import HomeContext from "context";
import Head from "next/head"

export default function Home() {
  const context = useContext(HomeContext);

  return (
    <Reac.Fragment>
      <Head>
        <title>Trang chủ</title>
      </Head>
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

import Header from "./Header";
import Topic from "./Topic";
import useRecentlyTracks from "../../hooks/useRecentlyTracks";
import useNewRelease from "../../hooks/useNewRelease";

export default function Main() {
  const recentlyTracks = useRecentlyTracks();
  const newRelease = useNewRelease();
  return (
    <div className="w-main h-full bg-gradient-to-t from-start to-end overflow-y-scroll no-scrollbar pb-4">
      <Header />
      <Topic
        title="Đã phát gần đây"
        sub_title="Lấy cảm hứng từ những hoạt động gần đây của bạn"
        tracks={recentlyTracks}
      />
      <Topic
        title="Nhạc cho bạn"
        sub_title="Dựa trên những ca khúc bạn đã nghe"
        tracks={newRelease}
      />
    </div>
  );
}

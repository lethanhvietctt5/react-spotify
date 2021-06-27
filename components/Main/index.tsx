import Header from "./Header";
import Topic from "./Topic";
import useRecentlyTracks from "../../hooks/useRecentlyTracks";

export default function Main() {
  const recentlyTracks = useRecentlyTracks();
  return (
    <div className="w-main h-full bg-gradient-to-t from-start to-end overflow-y-scroll no-scrollbar">
      <Header />
      <Topic
        title="Đã phát gần đây"
        sub_title="Lấy cảm hứng từ những hoạt động gần đây của bạn"
        tracks={recentlyTracks}
      />
    </div>
  );
}

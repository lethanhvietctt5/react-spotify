import Playlist from "components/Main/Playlist";
import { useRouter } from "next/router";

export default function PlaylistPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return <Playlist id={id} />;
}

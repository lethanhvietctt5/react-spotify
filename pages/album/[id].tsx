import Album from "components/Main/Album";
import { useRouter } from "next/router";

export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return <Album id={id} />;
}

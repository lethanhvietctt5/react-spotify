import Artist from "components/Main/Artist";
import { useRouter } from "next/router";

export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return <Artist id={id} />;
}

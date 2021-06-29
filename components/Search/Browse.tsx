import useBrowse from "hooks/useBrowse";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Browse() {
  const browses = useBrowse();
  return (
    <div className="mt-8 px-6">
      <Head>
        <title>Tìm kiếm</title>
      </Head>
      <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {browses?.map((browse) => (
          <Link key={browse.id} href={`/search/${browse.id}`}>
            <div className="relative">
              <Image
                className="rounded"
                layout="responsive"
                height={64}
                width={64}
                src={browse.image || "/images/test.jpeg"}
              ></Image>
              <div className="absolute bottom-4 lg:bottom-6 xl:bottom-8 w-full px-4 flex justify-center text-white">
                <div className="whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold text-base">
                  {browse.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import useBrowse from "hooks/useBrowse";
import Image from "next/image";

export default function Browse() {
  const browses = useBrowse();
  return (
    <div className="mt-8 px-6">
      <div className="grid grid-cols-7 gap-4">
        {browses?.map((browse) => (
          <div key={browse.id} className="relative">
            <Image
              className="rounded"
              layout="responsive"
              height={64}
              width={64}
              src={browse.image || "/images/test.jpeg"}
            ></Image>
            <div className="absolute bottom-10 w-full px-4 flex justify-center text-white">
              <div className="whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold text-base">
                {browse.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

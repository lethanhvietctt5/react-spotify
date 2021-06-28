import Image from "next/image";

export default function Song() {
  return (
    <div className="w-1/3 lg:w-1/4 min-w-min h-full text-white flex items-center">
      <div className="h-full p-4 w-1/5">
        <Image layout="responsive" height="64" width="64" className="h-full" src="/images/test.jpeg" alt="" />
      </div>
      <div>
        <div className="text-sm">Đúng cũng thành sai</div>
        <div className="text-xs text-gray-400">Mỹ tâm</div>
      </div>
    </div>
  );
}

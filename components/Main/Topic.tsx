export default function Topic() {
  return (
    <div className="w-full px-8 text-white">
      <div className="text-2xl font-bold hover:underline cursor-pointer mb-6">
        Dựa trên danh sách nhạc gần đây
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="bg-end hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out p-4 rounded-lg">
          <div className="w-full relative">
            <img className="w-full" src="/images/test.jpeg" alt="" />
            <div className="absolute bottom-0 right-0 mb-3 mr-3">
              <img className="w-10" src="/svgs/play.svg" alt="" />
            </div>
          </div>
          <div className="text-lg font-semibold mt-2">Đúng cũng thành sai</div>
          <div className="text-sm text-gray-400 mt">Mỹ Tâm</div>
        </div>
      </div>
    </div>
  );
}

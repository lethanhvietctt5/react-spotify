import Controls from "./Controls";
import Song from "./Song";
import Volume from "./Volume";

export default function Music() {
  return (
    <div className="bg-footerBackground h-24 border-t border-gray-700 flex">
      <Song />
      <Controls />
      <Volume />
    </div>
  );
}

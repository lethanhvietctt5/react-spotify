import Logo from "./Logo";
import Menu from "./Menu";
import Playlist from "./Playlist";

function SideBar() {

  return (
    <div className="w-60 h-full bg-sidebarBackground overflow-y-scroll no-scrollbar">
      <Logo />
      <Menu/>
      <Playlist />
    </div>
  );
}

export default SideBar;

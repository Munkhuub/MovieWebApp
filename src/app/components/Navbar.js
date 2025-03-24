import { ArrowDown } from "./assets/ArrowDown";
import { LogoIcon } from "./assets/LogoIcon";
import { MoonIcon } from "./assets/MoonIcon";
import { SearchIcon } from "./assets/SearchIcon";

export const Navbar = () => {
  return (
    <div className="h-15 w-full py-3 ps-20 flex justify-between">
      <div className="flex gap-2 my-2 text-[16px] font-bold italic text-[#4338CA]">
        <LogoIcon />
        <p>Movie Z</p>
      </div>
      <div className="flex gap-3 ">
        <button className="h-9  py-2 px-4 rounded-md flex justify-center border border-[#E4E4E7] items-center shadow-sm">
          <ArrowDown />
          <p>Genre</p>
        </button>
        <div className=" flex w-[397px] relative pl-[38px] border rounded-md border-[#E4E4E7] items-center shadow-sm">
          <input type="text" className="" placeholder="Search..." />
          <div className="absolute left-[10px]">
            <SearchIcon />
          </div>
        </div>
      </div>

      <button className="p-[10px] border rounded-md border-[#E4E4E7] shadow-sm">
        <MoonIcon />
      </button>
    </div>
  );
};

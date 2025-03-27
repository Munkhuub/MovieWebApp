import { ArrowDown } from "./assets/ArrowDown";
import { LogoIcon } from "./assets/LogoIcon";
import { MoonIcon } from "./assets/MoonIcon";
import { SearchIcon } from "./assets/SearchIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Navbar: React.FunctionComponent = () => {
  return (
    <div className="h-15 w-full py-3 ps-20 flex justify-between">
      <div className="flex gap-2 my-2 text-[16px] font-bold italic text-[#4338CA]">
        <LogoIcon color="#4338CA" />
        <p>Movie Z</p>
      </div>
      <div className="flex gap-3 ">
        <Button variant="outline">
          <ArrowDown />
          <p>Genre</p>
        </Button>
        <div className=" flex w-[397px] relative pl-[38px] border rounded-md border-[#E4E4E7] items-center shadow-sm">
          <Input
            placeholder="Search.."
            className="border-none outline-none focus-visible:ring-transparent shadow-none"
          />
          <div className="absolute left-[10px]">
            <SearchIcon />
          </div>
        </div>
      </div>
      <Button variant="outline">
        <MoonIcon />
      </Button>
    </div>
  );
};

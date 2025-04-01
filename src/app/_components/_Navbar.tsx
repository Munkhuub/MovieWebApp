import { ArrowDown } from "./assets/ArrowDown";
import { LogoIcon } from "./assets/LogoIcon";
import { MoonIcon } from "./assets/MoonIcon";
import { SearchIcon } from "./assets/SearchIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export const Navbar: React.FunctionComponent = () => {
  return (
    <div className="w-full lg:px-20 px-5 flex justify-between py-5">
      <div className="flex gap-2 my-2 text-[16px] font-bold italic text-[#4338CA]">
        <LogoIcon color="#4338CA" />
        <p>Movie Z</p>
      </div>
      <div className="lg:flex gap-3 hidden ">
        <Button variant="outline">
          <ArrowDown />
          <p>Genre</p>
        </Button>
        <DropdownMenu> </DropdownMenu>
        <div className="w-95 flex gap-2 px-4 border rounded-md border-[#E4E4E7] items-center shadow-sm">
          <div className="">
            <SearchIcon />
          </div>
          <Input
            placeholder="Search.."
            className="border-none outline-none focus-visible:ring-transparent shadow-none"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className=" flex lg:hidden">
          <SearchIcon />
        </Button>
        <Button variant="outline">
          <MoonIcon />
        </Button>
      </div>
    </div>
  );
};

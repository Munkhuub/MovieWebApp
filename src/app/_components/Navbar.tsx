import { ArrowDown } from "./assets/ArrowDown";
import { LogoIcon } from "./assets/LogoIcon";
import { MoonIcon } from "./assets/MoonIcon";
import { SearchIcon } from "./assets/SearchIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar: React.FunctionComponent = () => {
  return (
    <div className="w-full lg:px-20 px-5 flex justify-between py-5">
      <a href="/" className="logo">
        <div className="flex gap-2 my-2 text-[16px] font-bold italic text-[#4338CA]">
          <LogoIcon color="#4338CA" />
          <p>Movie Z</p>
        </div>
      </a>
      <div className="lg:flex gap-3 hidden ">
        {/* <Button variant="outline">
          <ArrowDown />
          <p>Genre</p>
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border-[1px] border-[#E4E4E7] shadow-sm px-[10px] py-2 rounded-md">
            <ArrowDown /> Genre
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[577px]">
            <DropdownMenuLabel className="py-0">
              <p className="text-2xl font-bold">Genres</p>
              <p>See lists of movies by genre</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

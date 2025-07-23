import { MovieTeam } from "../page";

type CreditsProps = {
  movieTeam: MovieTeam | null;
};
export const Credits = ({ movieTeam }: CreditsProps) => {
  return (
    <div className="space-y-3 lg:space-y-4">
      <div className="flex lg:flex-row lg:gap-6 border-b-[1px] border-[#E4E4E7] pb-3 lg:pb-4">
        <span className="w-16 lg:w-24 text-sm lg:text-base font-medium lg:font-normal">
          Director
        </span>
        <span className="text-sm lg:text-base text-gray-700 lg:text-black">
          {movieTeam?.crew?.[0]?.name || "N/A"}
        </span>
      </div>
      <div className="flex lg:flex-row lg:gap-6 border-b-[1px] border-[#E4E4E7] pb-3 lg:pb-4">
        <span className="w-16 lg:w-24 text-sm lg:text-base font-medium lg:font-normal">
          Writers
        </span>
        <span className="text-sm lg:text-base text-gray-700 lg:text-black">
          {movieTeam?.crew?.[5]?.name || "N/A"}
        </span>
      </div>
      <div className="flex lg:flex-row lg:gap-6 border-b-[1px] border-[#E4E4E7] pb-3 lg:pb-4">
        <span className="w-16 lg:w-24 text-sm lg:text-base font-medium lg:font-normal">
          Stars
        </span>
        <span className="text-sm lg:text-base text-gray-700 lg:text-black">
          {movieTeam?.cast?.[0]?.name || "N/A"}
        </span>
      </div>
    </div>
  );
};

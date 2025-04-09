import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationComponent = {
  handlePrev: () => void;
  handleNext: () => void;
  currentPage: number[];
  lastPage: number;
  handlePage: (value: number) => void;
  page: number;
};

export const PaginationComponent = ({
  handlePrev,
  handleNext,
  currentPage,
  lastPage,
  handlePage,
  page,
}: PaginationComponent) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={page === 1} onClick={() => handlePage(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {currentPage.map((item, index) => {
          return (
            <PaginationItem key={index} className="flex gap-1">
              <PaginationLink
                onClick={() => handlePage(item)}
                className={`${
                  page === item ? "border-[1px] border-[#E4E4E7]" : ""
                }`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePage(lastPage)}>
            {lastPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

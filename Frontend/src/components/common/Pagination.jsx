import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ safePage, totalPages, goToPage, pageWindow }) => {
  return (
    <div className="bg-[#F3F6F9] h-[73px] px-[16px] flex items-center justify-center border-[rgba(130,143,143,0.25)] rounded-b-[12px] border-t-[1px]">
      <nav className="relative z-0 inline-flex flex-row items-center justify-center px-[6px] gap-[6px] h-[40px]" aria-label="Pagination">
        
        <button
          onClick={() => goToPage(1)}
          disabled={safePage === 1}
          className="box-border relative w-[40px] h-[40px] border border-[rgba(130,143,143,0.25)] rounded-full flex items-center justify-center text-[#212121] bg-white disabled:cursor-not-allowed disabled:opacity-[0.38]"
        >
          <ChevronsLeft size={22} className="opacity-[0.8]" />
          <span className="sr-only">First Page</span>
        </button>
        
        <button
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage === 1}
          className="box-border relative w-[40px] h-[40px] border border-[rgba(130,143,143,0.25)] rounded-full flex items-center justify-center text-[#212121] bg-white disabled:cursor-not-allowed disabled:opacity-[0.38]"
        >
          <ChevronLeft size={22} className="opacity-[0.8]" />
          <span className="sr-only">Previous Page</span>
        </button>
        
        {pageWindow.map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`box-border relative w-[40px] h-[40px] rounded-full flex items-center justify-center ${
              num === safePage
                ? 'bg-[#D6F1E6] border border-[#235347]'
                : 'bg-[rgba(130,143,143,0.25)] border border-[rgba(130,143,143,0.25)] hover:bg-[rgba(130,143,143,0.35)]'
            }`}
          >
            <span className="font-['Poppins'] font-medium text-[14px] leading-[21px] text-center text-[#212121]">
              {num}
            </span>
          </button>
        ))}

        <button
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage === totalPages}
          className="box-border relative w-[40px] h-[40px] bg-white border border-[rgba(130,143,143,0.25)] rounded-full flex items-center justify-center text-[#212121] disabled:cursor-not-allowed disabled:opacity-[0.38]"
        >
          <ChevronRight size={22} className="opacity-[0.8]" />
          <span className="sr-only">Next Page</span>
        </button>

        <button
          onClick={() => goToPage(totalPages)}
          disabled={safePage === totalPages}
          className="box-border relative w-[40px] h-[40px] bg-white border border-[rgba(130,143,143,0.25)] rounded-full flex items-center justify-center text-[#212121] disabled:cursor-not-allowed disabled:opacity-[0.38]"
        >
          <ChevronsRight size={22} className="opacity-[0.8]" />
          <span className="sr-only">Last Page</span>
        </button>

      </nav>
    </div>
  );
};

export default Pagination;

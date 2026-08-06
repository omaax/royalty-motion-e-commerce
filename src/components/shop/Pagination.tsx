import { ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, maxPage, onPage }) => {
  if (maxPage <= 1) return null;

  const pageNumbers = Array.from({ length: maxPage }, (_, i) => i + 1);

  return (
    <div className="pt-2 mt-1 border-t border-gray-100 flex items-center justify-center gap-3 text-xs font-mono font-bold tracking-widest uppercase shrink-0">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPage(page)}
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer text-[10px] ${
            currentPage === page ? 'bg-black text-white' : 'hover:bg-gray-100 text-black'
          }`}
        >
          {page}
        </button>
      ))}
      <span className="text-gray-400">...</span>
      <button
        onClick={() => onPage(Math.min(currentPage + 1, maxPage))}
        className="flex items-center gap-1.5 hover:opacity-60 transition-opacity pl-1 cursor-pointer text-[10px]"
      >
        <span>NEXT</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <span className="ml-8 text-gray-400 text-xs">✦</span>
    </div>
  );
};
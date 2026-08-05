import { ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, maxPage, onPage }) => {
  const pageNumbers = Array.from({ length: maxPage }, (_, i) => i + 1);

  return (
    <div className="pt-12 border-t border-gray-100 flex items-center justify-center gap-3 text-xs font-mono font-bold tracking-widest uppercase">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPage(page)}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === page ? 'bg-black text-white' : 'hover:bg-gray-100 text-black'
          }`}
        >
          {page}
        </button>
      ))}
      <span className="text-gray-400">...</span>
      <button
        onClick={() => onPage(Math.min(currentPage + 1, maxPage))}
        className="flex items-center gap-2 hover:opacity-60 transition-opacity pl-2 cursor-pointer"
      >
        <span>NEXT</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <span className="ml-12 text-gray-400 text-sm">✦</span>
    </div>
  );
};
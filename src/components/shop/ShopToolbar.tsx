import { Search, LayoutGrid, Grid2X2, List, ChevronDown } from 'lucide-react';
import { SortOption, GridCols } from '../../types';
import { SORT_LABELS } from '../../constants/shop';

interface ShopToolbarProps {
  sortBy: SortOption;
  onSortBy: (sort: SortOption) => void;
  gridCols: GridCols;
  onGridCols: (cols: GridCols) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
}

export const ShopToolbar: React.FC<ShopToolbarProps> = ({
  sortBy,
  onSortBy,
  gridCols,
  onGridCols,
  isSearchOpen,
  onToggleSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-black">
      <div className="text-[10px] sm:text-xs font-mono text-red-700 tracking-wider font-semibold leading-tight">
        <div>Gear forged for the future.</div>
        <div>For those who move in silence and lead in power.</div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onToggleSearch}
          className="p-1.5 hover:opacity-60 transition-opacity cursor-pointer"
          title="Search Shop"
        >
          <Search className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
          <span className="text-gray-500">SORT BY:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortBy(e.target.value as SortOption)}
              className="appearance-none bg-transparent pr-6 font-bold cursor-pointer focus:outline-none"
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
          <button
            onClick={() => onGridCols(4)}
            className={`p-1 hover:opacity-80 transition-opacity ${gridCols === 4 ? 'text-black font-bold' : 'text-gray-300'}`}
            title="4 Column Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onGridCols(2)}
            className={`p-1 hover:opacity-80 transition-opacity ${gridCols === 2 ? 'text-black font-bold' : 'text-gray-300'}`}
            title="2 Column Grid"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onGridCols(1)}
            className={`p-1 hover:opacity-80 transition-opacity ${gridCols === 1 ? 'text-black font-bold' : 'text-gray-300'}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
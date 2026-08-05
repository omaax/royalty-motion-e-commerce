import { CATEGORIES } from '../../constants/shop';

interface CategoryFilterProps {
  collapsed: boolean;
  onToggle: () => void;
  selectedCategory: string;
  onSelect: (category: string) => void;
  counts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  collapsed,
  onToggle,
  selectedCategory,
  onSelect,
  counts,
}) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left hover:opacity-70 cursor-pointer"
      >
        <span>CATEGORY</span>
        <span>{collapsed ? '+' : '—'}</span>
      </button>

      {!collapsed && (
        <div className="space-y-1 pt-1 pl-1 text-xs font-mono">
          {['All Products', ...CATEGORIES].map((catName) => {
            const isSelected = selectedCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => onSelect(catName)}
                className={`flex items-center justify-between w-full text-left transition-colors cursor-pointer ${
                  isSelected ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      isSelected ? 'bg-black' : 'border border-gray-300'
                    }`}
                  />
                  {catName}
                </span>
                <span className="text-[10px] text-gray-400">{counts[catName] ?? 0}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
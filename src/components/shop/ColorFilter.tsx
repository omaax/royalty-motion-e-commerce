import { PRODUCT_COLORS, COLOR_HEX } from '../../constants/shop';
import { ProductColor } from '../../types';

interface ColorFilterProps {
  collapsed: boolean;
  onToggle: () => void;
  selectedColor: string | null;
  onSelect: (color: string | null) => void;
  counts: Record<string, number>;
}

export const ColorFilter: React.FC<ColorFilterProps> = ({
  collapsed,
  onToggle,
  selectedColor,
  onSelect,
  counts,
}) => {
  return (
    <div className="space-y-1 pt-2 border-t border-gray-100">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
      >
        <span>COLOR</span>
        <span>{collapsed ? '+' : '—'}</span>
      </button>

      {!collapsed && (
        <div className="space-y-1.5 text-xs font-mono">
          {PRODUCT_COLORS.map((colorName) => {
            const isSelected = selectedColor === colorName;
            return (
              <button
                key={colorName}
                onClick={() => onSelect(isSelected ? null : colorName)}
                className={`flex items-center justify-between w-full text-left transition-colors cursor-pointer ${
                  isSelected ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    style={{ backgroundColor: COLOR_HEX[colorName as ProductColor] }}
                    className={`w-3.5 h-3.5 rounded-full inline-block border ${
                      colorName === 'White' ? 'border-gray-300' : 'border-transparent'
                    }`}
                  />
                  {colorName}
                </span>
                <span className="text-[10px] text-gray-400">{counts[colorName] ?? 0}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
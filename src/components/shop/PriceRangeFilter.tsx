import { PRICE_MIN, PRICE_MAX, PRICE_STEP } from '../../constants/shop';

interface PriceRangeFilterProps {
  collapsed: boolean;
  onToggle: () => void;
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  collapsed,
  onToggle,
  priceRange,
  onChange,
}) => {
  const [min, max] = priceRange;

  const handleMin = (val: number) => onChange([Math.min(val, max), max]);
  const handleMax = (val: number) => onChange([min, Math.max(val, min)]);

  return (
    <div className="space-y-1.5 pt-3 border-t border-gray-100">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
      >
        <span>PRICE</span>
        <span>{collapsed ? '+' : '—'}</span>
      </button>

      {!collapsed && (
        <div className="space-y-2 pt-1 text-xs font-mono">
          <div className="flex items-center justify-between text-gray-600">
            <span className="font-bold text-black">${min}</span>
            <span>TO</span>
            <span className="font-bold text-black">${max}</span>
          </div>

          <div className="relative h-5">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1 bg-black rounded-full"
              style={{
                left: `${((min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                width: `${((max - min) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
              }}
            ></div>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={min}
              onChange={(e) => handleMin(Number(e.target.value))}
              aria-label="Minimum price"
              className="absolute top-0 left-0 w-full h-5 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={max}
              onChange={(e) => handleMax(Number(e.target.value))}
              aria-label="Maximum price"
              className="absolute top-0 left-0 w-full h-5 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
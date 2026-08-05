import { Plus, Sparkles } from 'lucide-react';
import { ShopItem } from '../../types';

interface ProductCardProps {
  item: ShopItem;
  onQuickView: (item: ShopItem) => void;
  onAddToCart: (item: ShopItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onQuickView, onAddToCart }) => {
  return (
    <div className="group flex flex-col justify-between space-y-4 relative">
      <div
        onClick={() => onQuickView(item)}
        className="w-full aspect-[4/4] bg-[#f4f4f4] rounded-xl group-hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center justify-center"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative bg-gradient-to-b from-gray-50 to-gray-100/50">
            <span className="absolute top-2 left-2 text-xs font-mono text-gray-300">+</span>
            <span className="absolute top-2 right-2 text-xs font-mono text-gray-300">+</span>
            <span className="absolute bottom-2 left-2 text-xs font-mono text-gray-300">+</span>
            <span className="absolute bottom-2 right-2 text-xs font-mono text-gray-300">+</span>

            <div className="w-16 h-16 rounded-full border border-gray-200 group-hover:border-black flex items-center justify-center text-gray-300 group-hover:text-black transition-colors mb-3">
              <Sparkles className="w-6 h-6 stroke-[1.2]" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-gray-400 group-hover:text-black uppercase transition-colors">
              {item.category}
            </span>
          </div>
        )}

        {item.tag && (
          <span className="absolute top-3 right-3 bg-white text-black text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs border border-gray-100">
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
            {item.tag}
          </span>
        )}

        {!item.inStock && (
          <span className="absolute bottom-3 left-3 bg-red-700 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
            OUT OF STOCK
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="space-y-1 flex-1">
          <h3
            onClick={() => onQuickView(item)}
            className="font-mono text-xs font-bold tracking-widest text-black uppercase hover:underline cursor-pointer leading-snug"
          >
            {item.title}
          </h3>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            {item.category}
          </div>
          <div className="font-mono text-xs font-bold text-black">
            ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className="w-8 h-8 rounded-full border border-gray-300 group-hover:border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer flex-shrink-0"
          title="Add to Shopping Bag"
        >
          <Plus className="w-4 h-4 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
};
import { Plus, Sparkles, X } from 'lucide-react';
import { ShopItem } from '../../types';

interface QuickViewModalProps {
  item: ShopItem;
  onClose: () => void;
  onAddToCart: (item: ShopItem) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ item, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-black max-w-2xl w-full p-6 md:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="w-full aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-300">
                <Sparkles className="w-10 h-10 stroke-[1.2]" />
              </div>
            )}
            {item.tag && (
              <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
                {item.tag}
              </span>
            )}
          </div>

          <div className="space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                {item.category} • COLOR: {item.color}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wide">
                {item.title}
              </h3>
              <div className="font-mono text-lg font-bold">
                ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <p className="text-xs font-mono text-gray-600 leading-relaxed border-y border-gray-100 py-3">
              {item.description}
            </p>

            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs font-mono uppercase">
                STATUS:{' '}
                <span className={item.inStock ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                  {item.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                </span>
              </span>

              <button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                disabled={!item.inStock}
                className="px-5 py-2.5 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
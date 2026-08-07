import { Plus, Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShopItem } from '../../types';
import { COLOR_HEX } from '../../constants/shop';
import { MotionButton } from '../MotionButton';

interface ProductCardProps {
  item: ShopItem;
  onAddToCart: (item: ShopItem) => void;
  wished?: boolean;
  onToggleWishlist?: (item: ShopItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onAddToCart, wished, onToggleWishlist }) => {
  const navigate = useNavigate();
  const primaryImage = item.images[0];

  const openProduct = () => navigate(`/product/${item.id}`);

  return (
    <div className="group flex flex-col justify-between space-y-2 relative h-full min-h-0">
      <div
        onClick={openProduct}
        className="w-full h-48 sm:h-56 lg:h-auto lg:flex-1 lg:min-h-0 bg-[#f4f4f4] rounded-xl group-hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center justify-center p-2"
      >
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={item.title}
            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative bg-gradient-to-b from-gray-50 to-gray-100/50">
            <span className="absolute top-2 left-2 text-xs font-mono text-gray-300">+</span>
            <span className="absolute top-2 right-2 text-xs font-mono text-gray-300">+</span>
            <span className="absolute bottom-2 left-2 text-xs font-mono text-gray-300">+</span>
            <span className="absolute bottom-2 right-2 text-xs font-mono text-gray-300">+</span>

            <div className="w-12 h-12 rounded-full border border-gray-200 group-hover:border-black flex items-center justify-center text-gray-300 group-hover:text-black transition-colors mb-2">
              <Sparkles className="w-5 h-5 stroke-[1.2]" />
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

        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(item);
            }}
            className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all z-10 ${
              wished
                ? 'bg-black text-white'
                : 'bg-white/90 text-black shadow-xs border border-gray-200 hover:border-black'
            }`}
            title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`}
            />
          </button>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 pt-1 shrink-0">
        <div className="space-y-0.5 flex-1 min-w-0">
          <h3
            onClick={openProduct}
            className="font-mono text-xs font-bold tracking-widest text-black uppercase hover:underline cursor-pointer leading-snug truncate"
            title={item.title}
          >
            {item.title}
          </h3>
          <div className="font-mono text-xs font-bold text-black">
            ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          {item.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {item.colors.map((color) => (
                <span
                  key={color}
                  title={color}
                  style={{ backgroundColor: COLOR_HEX[color] }}
                  className={`w-3 h-3 rounded-full inline-block ${
                    color === 'White' ? 'border border-gray-300' : 'border border-black/10'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <MotionButton
          onClick={() => onAddToCart(item)}
          className="rounded-full w-8 h-8 flex-shrink-0"
          style={{ padding: 0 }}
          title="Add to Shopping Bag"
        >
          <Plus className="w-4 h-4 stroke-[1.5]" />
        </MotionButton>
      </div>
    </div>
  );
};
import React from 'react';
import { Plus, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopItem } from '../../types';
import { colorHex, formatPrice, normalizeColorName } from '../../api/mappers';
import { MotionButton } from '../MotionButton';
import { getOptimizedImage } from '../../utils/imageOptimize';

interface ProductCardProps {
  item: ShopItem;
  onAddToCart: (item: ShopItem) => void;
  wished?: boolean;
  onToggleWishlist?: (item: ShopItem) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ item, onAddToCart, wished, onToggleWishlist, priority }) => {
  const primaryImage = item.images[0];

  return (
    <div className="group flex flex-col justify-between space-y-2 relative h-full min-h-0">
      <div className="relative w-full h-40 sm:h-44 lg:h-85 shrink-0">
        <Link
          to={`/product/${item.id}`}
          title={item.title}
          className="flex items-center justify-center w-full h-full bg-[#f4f4f4] rounded-xl group-hover:shadow-md transition-all duration-300 overflow-hidden p-2"
        >
        {primaryImage ? (
          (() => {
            const opt = getOptimizedImage(primaryImage);
            return (
              <img
                src={opt?.webpSrc ?? primaryImage}
                alt={item.title}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                width={400}
                height={400}
                onError={(e) => { e.currentTarget.src = primaryImage; }}
                className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
              />
            );
          })()
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

        {!item.inStock && (
          <span className="absolute bottom-3 left-3 bg-red-700 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
            OUT OF STOCK
          </span>
        )}
        </Link>

        {onToggleWishlist && (
          <MotionButton
            variant={wished ? 'solid' : 'ghost'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(item);
            }}
            title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`absolute top-3 left-3 w-7 h-7 p-0 rounded-full justify-center items-center z-10 ${wished ? '' : 'bg-white'}`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`}
            />
          </MotionButton>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 pt-1 shrink-0">
        <div className="space-y-0.5 flex-1 min-w-0">
          <Link
            to={`/product/${item.id}`}
            className="font-mono text-xs font-bold tracking-widest text-black uppercase hover:underline cursor-pointer leading-snug truncate"
            title={item.title}
          >
            {item.title}
          </Link>
          <div className="font-mono text-xs font-bold text-black">
            <span className="inline-flex items-baseline gap-1.5">
              <span>{formatPrice(item.price)}</span>
              {item.originalPrice != null && item.originalPrice > 0 && (
                <span className="text-[10px] font-normal text-gray-400 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
            </span>
          </div>
          {item.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {item.colors.map((color) => (
                <span
                  key={color}
                  title={normalizeColorName(color)}
                  style={{ backgroundColor: colorHex(color) }}
                  className={`w-3 h-3 rounded-full inline-block border border-black/10 ${
                    color.trim().toLowerCase() === 'white' ? 'border border-gray-300' : ''
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
});
import { useEffect, useLayoutEffect, useMemo, useCallback, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useShopActions } from '../hooks/useCart';
import { useWishlistIds } from '../hooks/useWishlist';
import { colorHex, formatPrice, normalizeColorName } from '../api/mappers';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductInfoDrawer, InfoTab } from '../components/shop/ProductInfoDrawer';
import { MotionButton } from '../components/MotionButton';
import { SEO } from '../components/SEO';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: item, isPending } = useProduct(id);
  const { data: allProducts = [] } = useProducts({});
  const { onAddToCart, onToggleWishlist } = useShopActions();
  const wishlistIds = useWishlistIds();
  const wished = item ? wishlistIds.includes(item.id) : false;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [infoTab, setInfoTab] = useState<InfoTab | null>(null);

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateThumbArrows = useCallback(() => {
    const el = thumbStripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  const scrollThumbs = (direction: number) => {
    const el = thumbStripRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  const sizes = item?.measurements?.sizes ?? [];
  const colorList = item?.colors ?? [];
  const imageList = item?.images ?? [];

  useLayoutEffect(() => {
    const el = thumbStripRef.current;
    if (el) el.scrollLeft = 0;
    updateThumbArrows();
    window.addEventListener('resize', updateThumbArrows);
    return () => window.removeEventListener('resize', updateThumbArrows);
  }, [id, imageList.length, updateThumbArrows]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setSelectedColor(colorList[0] ?? null);
    setSelectedSize(sizes[0] ?? null);
    setInfoTab(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isPending && !item) {
    return (
      <main className="px-6 lg:px-12 pt-10 pb-20">
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 animate-pulse">
            Loading...
          </span>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="px-6 lg:px-12 pt-10 pb-20">
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-200">
          <Sparkles className="w-12 h-12 stroke-[1.2] text-gray-300" />
          <p className="font-mono text-sm uppercase text-gray-500">
            Product not found.
          </p>
          <Link
            to="/shop"
            className="px-6 py-2 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO SHOP</span>
          </Link>
        </div>
      </main>
    );
  }

  const primaryImage = imageList[activeImage];
  const relatedProducts = useMemo(
    () => allProducts.filter((p) => p.id !== item.id).slice(0, 4),
    [allProducts, item.id]
  );

  return (
    <main className="px-6 lg:px-12 pt-8 pb-16">
      <SEO
        title={item.title}
        description={item.description}
        type="product"
        product={{
          name: item.title,
          price: item.price,
          image: imageList[0] || '',
          description: item.description,
        }}
      />
      <Link
        to="/shop"
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="w-full aspect-[16/10] bg-[#f4f4f4] border border-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center p-6">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-300">
                <Sparkles className="w-14 h-14 stroke-[1.2]" />
              </div>
            )}
            <motion.button
              onClick={() => onToggleWishlist(item.id)}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className={`group absolute top-4 right-4 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer select-none z-10 ${
                wished
                  ? 'bg-black text-white'
                  : 'bg-white/90 text-black shadow-xs border border-gray-200'
              }`}
              title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <motion.div
                variants={{ initial: { x: '-100%' }, hover: { x: '0%' } }}
                transition={{ type: 'tween', ease: [0.25, 1, 0.5, 1], duration: 0.35 }}
                className={`absolute inset-0 ${wished ? 'bg-white' : 'bg-black'} pointer-events-none`}
              />
              <span
                className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
                  wished
                    ? 'text-white group-hover:text-black'
                    : 'text-black group-hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
              </span>
            </motion.button>
            {!item.inStock && (
              <span className="absolute bottom-4 left-4 bg-red-700 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
                OUT OF STOCK
              </span>
            )}
          </div>

          {imageList.length > 1 && (
            <div className="flex items-center gap-2">
              {canScrollLeft && (
                <button
                  onClick={() => scrollThumbs(-1)}
                  className="w-10 h-10 shrink-0 border border-gray-300 flex items-center justify-center rounded-md hover:border-black transition-colors cursor-pointer"
                  aria-label="Previous images"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <div
                ref={thumbStripRef}
                onScroll={updateThumbArrows}
                className="flex flex-1 min-w-0 gap-2.5 overflow-x-auto scrollbar-hide"
              >
                {imageList.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-32 h-32 shrink-0 bg-[#f4f4f4] border flex items-center justify-center p-2 rounded-md cursor-pointer transition-colors ${
                      activeImage === i
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`${item.title} view ${i + 1}`} loading="lazy" width={128} height={128} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
              {canScrollRight && (
                <button
                  onClick={() => scrollThumbs(1)}
                  className="w-10 h-10 shrink-0 border border-gray-300 flex items-center justify-center rounded-md hover:border-black transition-colors cursor-pointer"
                  aria-label="Next images"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
              <Link
                to={`/category/${encodeURIComponent(item.category)}`}
                className="cursor-pointer hover:text-black transition-colors"
                title={`View all ${item.category}`}
              >
                {item.category}
              </Link>
              {colorList.length > 0 && (
                <>
                  <span className="text-gray-300">/</span>
                  <span>{colorList.map((c) => normalizeColorName(c).toUpperCase()).join(' • ')}</span>
                </>
              )}
            </div>

            <h2 className="font-serif text-2xl md:text-4xl font-bold uppercase tracking-wide">
              {item.title}
            </h2>

            <div className="font-mono text-xl font-bold">
              <span className="inline-flex items-baseline gap-2">
                <span>{formatPrice(item.price)}</span>
                {item.originalPrice != null && item.originalPrice > 0 && (
                  <span className="text-sm font-normal text-gray-400 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </span>
            </div>

            <div className="text-[11px] font-mono uppercase tracking-widest">
              STATUS:{' '}
              <span className={item.inStock ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                {item.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>
          </div>

          {colorList.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                Color
              </div>
              <div className="flex items-center gap-2.5">
                {colorList.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                    title={normalizeColorName(color)}
                    aria-label={normalizeColorName(color)}
                    style={{ backgroundColor: colorHex(color) }}
                    className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                      color.trim().toLowerCase() === 'white' ? 'border border-gray-300' : 'border border-black/10'
                    } ${
                      selectedColor === color
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                  >
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-xs font-mono text-gray-600 leading-relaxed border-y border-gray-100 py-4">
            {item.description}
          </p>

          {sizes.length > 0 ? (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  Select Size
                </span>
                {selectedSize && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black font-bold">
                    {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <MotionButton
                      key={size}
                      variant={isSelected ? 'solid' : 'ghost'}
                      onClick={() => setSelectedSize(isSelected ? null : size)}
                      className="min-w-10 px-3 py-2 font-mono text-xs uppercase tracking-widest rounded-none"
                    >
                      {size}
                    </MotionButton>
                  );
                })}
              </div>
            </div>
          ) : (
            item.measurements?.sizeRange && (
              <div className="mt-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                Sizes: {item.measurements.sizeRange}
              </div>
            )
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <MotionButton
              variant="solid"
              onClick={() => onAddToCart(item, 1)}
              disabled={!item.inStock}
              className="font-mono text-xs uppercase tracking-widest px-5 py-3"
            >
              <Plus className="w-4 h-4 stroke-[1.5]" />
              <span>Add To Bag</span>
            </MotionButton>
          </div>

          <ul className="mt-4">
            {(
              [
                { key: 'measurements' as InfoTab, label: 'See Measurements' },
                { key: 'care' as InfoTab, label: 'Composition and Care' },
                { key: 'shipping' as InfoTab, label: 'Shipping and Returns' },
              ]
            ).map((row) => (
              <li key={row.key}>
                <button
                  onClick={() => setInfoTab(row.key)}
                  className="flex items-center gap-3 py-2.5 text-left text-xs font-mono uppercase tracking-widest text-gray-700 hover:text-black transition-colors cursor-pointer bg-transparent border-0 rounded-none appearance-none"
                >
                  <span>{row.label}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 lg:mt-20 pt-8 border-t border-gray-100">
          <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">
            You May Also Like
          </h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                item={related}
                onAddToCart={onAddToCart}
                wished={wishlistIds.includes(related.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </section>
      )}

      {infoTab && (
        <ProductInfoDrawer
          item={item}
          tab={infoTab}
          onClose={() => setInfoTab(null)}
        />
      )}
    </main>
  );
};
import React, { useState, useMemo } from 'react';
import {
  Search,
  LayoutGrid,
  Grid2X2,
  List,
  ChevronDown,
  Plus,
  ArrowRight,
  X,
  Check,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { ShopItem } from '../types';
import { SHOP_PRODUCTS } from '../data/shopData';
import crestRedImg from '@/assets/crest-red.png';

interface ShopPageProps {
  onAddToCart: (item: ShopItem) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 5000]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [gridCols, setGridCols] = useState<4 | 2 | 1>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedQuickViewItem, setSelectedQuickViewItem] = useState<ShopItem | null>(null);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [joinedSuccess, setJoinedSuccess] = useState<boolean>(false);

  // Accordion Collapse States
  const [collapseCategory, setCollapseCategory] = useState<boolean>(false);
  const [collapsePrice, setCollapsePrice] = useState<boolean>(false);
  const [collapseColor, setCollapseColor] = useState<boolean>(false);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((item) => {
      // Category
      if (selectedCategory !== 'All Products' && item.category !== selectedCategory) {
        return false;
      }
      // Price
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }
      // Color
      if (selectedColor && item.color !== selectedColor) {
        return false;
      }
      // In Stock
      if (inStockOnly && !item.inStock) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // featured default
    });
  }, [selectedCategory, priceRange, selectedColor, inStockOnly, sortBy, searchQuery]);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Products': SHOP_PRODUCTS.length,
      Wearables: SHOP_PRODUCTS.filter((i) => i.category === 'Wearables').length,
      Headgear: SHOP_PRODUCTS.filter((i) => i.category === 'Headgear').length,
      Accessories: SHOP_PRODUCTS.filter((i) => i.category === 'Accessories').length,
      Tech: SHOP_PRODUCTS.filter((i) => i.category === 'Tech').length,
      'Limited Edition': SHOP_PRODUCTS.filter((i) => i.category === 'Limited Edition').length,
    };
    return counts;
  }, []);

  // Color counts
  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Obsidian: SHOP_PRODUCTS.filter((i) => i.color === 'Obsidian').length,
      Graphite: SHOP_PRODUCTS.filter((i) => i.color === 'Graphite').length,
      Silver: SHOP_PRODUCTS.filter((i) => i.color === 'Silver').length,
      Bronze: SHOP_PRODUCTS.filter((i) => i.color === 'Bronze').length,
      White: SHOP_PRODUCTS.filter((i) => i.color === 'White').length,
    };
    return counts;
  }, []);

  const handleJoinCircle = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setJoinedSuccess(true);
      setTimeout(() => {
        setShowJoinModal(false);
        setJoinedSuccess(false);
        setEmailInput('');
      }, 2000);
    }
  };

  return (
    <>
      <div className="lg:flex lg:items-stretch">
      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDEBAR: FILTERS (reaches top of screen) */}
      {/* ------------------------------------------------------------- */}
      <aside className="order-2 lg:order-1 w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-t lg:border-t-0 border-gray-100 lg:border-r bg-white">
        {/* Shop Title */}
        <div className="px-6 lg:px-8 pt-7 pb-2">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-black uppercase">
            SHOP
          </h2>
        </div>

        {/* Filters */}
        <div className="px-6 lg:px-8 pt-4 space-y-2">
          {/* Filters Title Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-mono tracking-[0.2em] font-bold uppercase">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              FILTERS
            </span>
            <span className="text-gray-400">—</span>
          </div>

          {/* Category Accordion */}
          <div className="">
            <button
              onClick={() => setCollapseCategory(!collapseCategory)}
              className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left hover:opacity-70 cursor-pointer"
            >
              <span>CATEGORY</span>
              <span>{collapseCategory ? '+' : '—'}</span>
            </button>

            {!collapseCategory && (
              <div className="space-y-1 pt-1 pl-1 text-xs font-mono">
                {Object.entries(categoryCounts).map(([catName, count]) => {
                  const isSelected = selectedCategory === catName;
                  return (
                    <button
                      key={catName}
                      onClick={() => {
                        setSelectedCategory(catName);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center justify-between w-full text-left transition-colors cursor-pointer ${isSelected ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full inline-block ${isSelected ? 'bg-black' : 'border border-gray-300'
                            }`}
                        />
                        {catName}
                      </span>
                      <span className="text-[10px] text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Filter Accordion */}
          <div className="space-y-1.5 pt-3 border-t border-gray-100">
            <button
              onClick={() => setCollapsePrice(!collapsePrice)}
              className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
            >
              <span>PRICE</span>
              <span>{collapsePrice ? '+' : '—'}</span>
            </button>

            {!collapsePrice && (
              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="font-bold text-black">${priceRange[0]}</span>
                  <span>TO</span>
                  <span className="font-bold text-black">${priceRange[1]}</span>
                </div>

                <div className="relative h-5">
                  {/* Track */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
                  {/* Active Range */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1 bg-black rounded-full"
                    style={{
                      left: `${((priceRange[0] - 50) / (5000 - 50)) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / (5000 - 50)) * 100}%`,
                    }}
                  ></div>
                  {/* Min Handle */}
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), priceRange[1]);
                      setPriceRange([val, priceRange[1]]);
                      setCurrentPage(1);
                    }}
                    className="absolute top-0 left-0 w-full h-5 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  {/* Max Handle */}
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Math.max(Number(e.target.value), priceRange[0]);
                      setPriceRange([priceRange[0], val]);
                      setCurrentPage(1);
                    }}
                    className="absolute top-0 left-0 w-full h-5 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Color Swatches Accordion */}
          <div className="space-y-1 pt-2 border-t border-gray-100">
            <button
              onClick={() => setCollapseColor(!collapseColor)}
              className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
            >
              <span>COLOR</span>
              <span>{collapseColor ? '+' : '—'}</span>
            </button>

            {!collapseColor && (
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(colorCounts).map(([colorName, count]) => {
                  const isSelected = selectedColor === colorName;
                  const getColorHex = (name: string) => {
                    if (name === 'Obsidian') return '#121212';
                    if (name === 'Graphite') return '#4B5563';
                    if (name === 'Silver') return '#CBD5E1';
                    if (name === 'Bronze') return '#854D0E';
                    if (name === 'White') return '#FFFFFF';
                    return '#9CA3AF';
                  };

                  return (
                    <button
                      key={colorName}
                      onClick={() => {
                        setSelectedColor(isSelected ? null : colorName);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center justify-between w-full text-left transition-colors cursor-pointer ${isSelected ? 'font-bold text-black' : 'text-gray-600 hover:text-black'
                        }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          style={{ backgroundColor: getColorHex(colorName) }}
                          className={`w-3.5 h-3.5 rounded-full inline-block border ${colorName === 'White' ? 'border-gray-300' : 'border-transparent'
                            }`}
                        />
                        {colorName}
                      </span>
                      <span className="text-[10px] text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stock Toggle */}
          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-black rounded-none cursor-pointer"
              />
              <span>IN STOCK ONLY</span>
            </label>
          </div>

          {/* Reset Filters button if any filter applied */}
          {(selectedCategory !== 'All Products' || priceRange[0] > 50 || priceRange[1] < 5000 || selectedColor || inStockOnly || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setPriceRange([50, 5000]);
                setSelectedColor(null);
                setInStockOnly(false);
                setSearchQuery('');
              }}
              className="w-full py-2 border border-black text-[10px] font-mono tracking-widest uppercase hover:bg-black hover:text-white transition-all cursor-pointer mt-2"
            >
              RESET ALL FILTERS [✕]
            </button>
          )}

          {/* Decorative Stars Ambient */}
          <div className="py-4 flex justify-around text-black opacity-30 text-xs select-none">
            <span>•</span>
            <span>✦</span>
            <span>+</span>
            <span>✦</span>
          </div>

          {/* Bottom Left Promotion Box ("HONOR THE CODE") */}
          <div className="p-4 border border-black rounded-sm space-y-3 bg-white relative overflow-hidden group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-red-700/40 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                <img src={crestRedImg} alt="Honor Red Crest" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-xs tracking-wider uppercase text-black">
                  HONOR THE CODE
                </h4>
                <p className="text-[10px] font-mono text-gray-600 leading-tight">
                  Unlock exclusive gear and early access.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowJoinModal(true)}
              className="w-full text-left text-xs font-mono font-bold tracking-widest text-black hover:text-red-700 flex items-center gap-1.5 uppercase transition-colors pt-1 cursor-pointer"
            >
              <span>JOIN THE CIRCLE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN SHOP CONTENT                                            */}
      {/* ------------------------------------------------------------- */}
      <main className="px-6 lg:px-12 pt-10 lg:order-2 flex-1 min-w-0">
        {/* Shop Section Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Gear forged for the future.</div>
            <div>For those who move in silence and lead in power.</div>
          </div>

          {/* Controls: Sort By & View Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
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
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-transparent pr-6 font-bold cursor-pointer focus:outline-none"
                >
                  <option value="featured">FEATURED</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                  <option value="newest">NEWEST</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* View Switch Icons */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <button
                onClick={() => setGridCols(4)}
                className={`p-1 hover:opacity-80 transition-opacity ${gridCols === 4 ? 'text-black font-bold' : 'text-gray-300'}`}
                title="4 Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(2)}
                className={`p-1 hover:opacity-80 transition-opacity ${gridCols === 2 ? 'text-black font-bold' : 'text-gray-300'}`}
                title="2 Column Grid"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(1)}
                className={`p-1 hover:opacity-80 transition-opacity ${gridCols === 1 ? 'text-black font-bold' : 'text-gray-300'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay Input */}
        {isSearchOpen && (
          <div className="pt-3 pb-6 flex items-center gap-3 animate-fadeIn">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search armor, headgear, tech, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-xs font-mono uppercase tracking-widest bg-transparent focus:outline-none placeholder:text-gray-400"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 hover:text-black">
                Clear
              </button>
            )}
            <button onClick={() => setIsSearchOpen(false)} className="text-xs font-mono uppercase text-gray-500 hover:text-black">
              Close [✕]
            </button>
          </div>
        )}

        {/* Body Layout: Products Grid */}
        <section className="space-y-12 pt-6">
          {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 border border-dashed border-gray-200">
                <p className="font-mono text-sm uppercase text-gray-500">
                  No products found matching your active filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setPriceRange([50, 5000]);
                    setSelectedColor(null);
                    setInStockOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-6 py-2 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-x-6 gap-y-12 ${gridCols === 4
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                    : gridCols === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1'
                  }`}
              >
                {filteredProducts.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col justify-between space-y-4 relative"
                    >
                      {/* Item Image Slot Frame */}
                      <div
                        onClick={() => setSelectedQuickViewItem(item)}
                        className="w-full aspect-[4/4] bg-[#f4f4f4] rounded-xl group-hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center justify-center"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          /* Frame placeholder design with corner bracket accents */
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative bg-gradient-to-b from-gray-50 to-gray-100/50">
                            {/* Corner bracket accents */}
                            <span className="absolute top-2 left-2 text-xs font-mono text-gray-300">+</span>
                            <span className="absolute top-2 right-2 text-xs font-mono text-gray-300">+</span>
                            <span className="absolute bottom-2 left-2 text-xs font-mono text-gray-300">+</span>
                            <span className="absolute bottom-2 right-2 text-xs font-mono text-gray-300">+</span>

                            {/* Center Crest Emblem Placeholder */}
                            <div className="w-16 h-16 rounded-full border border-gray-200 group-hover:border-black flex items-center justify-center text-gray-300 group-hover:text-black transition-colors mb-3">
                              <Sparkles className="w-6 h-6 stroke-[1.2]" />
                            </div>

                            <span className="text-[10px] font-mono tracking-widest text-gray-400 group-hover:text-black uppercase transition-colors">
                              {item.category}
                            </span>
                          </div>
                        )}

                        {/* Status Tag Badge */}
                        {item.tag && (
                          <span className="absolute top-3 right-3 bg-white text-black text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs border border-gray-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
                            {item.tag}
                          </span>
                        )}

                        {/* Out of Stock Overlay */}
                        {!item.inStock && (
                          <span className="absolute bottom-3 left-3 bg-red-700 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>

                      {/* Item Details Row */}
                      <div className="flex items-start justify-between gap-2 pt-1">
                        <div className="space-y-1 flex-1">
                          <h3
                            onClick={() => setSelectedQuickViewItem(item)}
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

                        {/* Quick Add Button */}
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
                })}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="pt-12 border-t border-gray-100 flex items-center justify-center gap-3 text-xs font-mono font-bold tracking-widest uppercase">
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${currentPage === 1 ? 'bg-black text-white' : 'hover:bg-gray-100 text-black'
                  }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${currentPage === 2 ? 'bg-black text-white' : 'hover:bg-gray-100 text-black'
                  }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${currentPage === 3 ? 'bg-black text-white' : 'hover:bg-gray-100 text-black'
                  }`}
              >
                3
              </button>
              <span className="text-gray-400">...</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 3))}
                className="flex items-center gap-2 hover:opacity-60 transition-opacity pl-2 cursor-pointer"
              >
                <span>NEXT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Corner Star Accent */}
              <span className="ml-12 text-gray-400 text-sm">✦</span>
            </div>
          </section>
      </main>
    </div>

      {/* ------------------------------------------------------------- */}
      {/* QUICK VIEW MODAL                                              */}
      {/* ------------------------------------------------------------- */}
      {selectedQuickViewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-black max-w-2xl w-full p-6 md:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedQuickViewItem(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Product Image Slot */}
              <div className="w-full aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
                {selectedQuickViewItem.image ? (
                  <img
                    src={selectedQuickViewItem.image}
                    alt={selectedQuickViewItem.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-300">
                    <Sparkles className="w-10 h-10 stroke-[1.2]" />
                  </div>
                )}
                {selectedQuickViewItem.tag && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
                    {selectedQuickViewItem.tag}
                  </span>
                )}
              </div>

              {/* Product Details Slot */}
              <div className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                    {selectedQuickViewItem.category} • COLOR: {selectedQuickViewItem.color}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wide">
                    {selectedQuickViewItem.title}
                  </h3>
                  <div className="font-mono text-lg font-bold">
                    ${selectedQuickViewItem.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <p className="text-xs font-mono text-gray-600 leading-relaxed border-y border-gray-100 py-3">
                  {selectedQuickViewItem.description}
                </p>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="text-xs font-mono uppercase">
                    STATUS:{' '}
                    <span className={selectedQuickViewItem.inStock ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                      {selectedQuickViewItem.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                    </span>
                  </span>

                  <button
                    onClick={() => {
                      onAddToCart(selectedQuickViewItem);
                      setSelectedQuickViewItem(null);
                    }}
                    disabled={!selectedQuickViewItem.inStock}
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* JOIN THE CIRCLE NEWSLETTER MODAL                              */}
      {/* ------------------------------------------------------------- */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-black max-w-md w-full p-6 md:p-8 space-y-6 relative text-center">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full border border-red-700 text-red-700 flex items-center justify-center p-3 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M50 20 L65 35 L80 35 L70 52 L75 75 L50 60 L25 75 L30 52 L20 35 L35 35 Z" fill="currentColor" />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">
                HONOR THE CODE
              </h3>
              <p className="text-xs font-mono text-gray-600 leading-relaxed">
                Join the inner circle for exclusive drops, private archives, and priority access.
              </p>
            </div>

            {joinedSuccess ? (
              <div className="p-4 bg-gray-50 text-green-800 font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>WELCOME TO THE CIRCLE</span>
              </div>
            ) : (
              <form onSubmit={handleJoinCircle} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-xs font-mono tracking-widest uppercase focus:outline-none focus:border-black text-center"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  JOIN THE CIRCLE →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

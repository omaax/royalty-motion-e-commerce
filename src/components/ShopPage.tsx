import React, { useState, useMemo } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  LayoutGrid,
  Grid2X2,
  List,
  ChevronDown,
  Plus,
  ArrowRight,
  Minus,
  X,
  Check,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { ShopItem, CartItem } from '../types';
import { SHOP_PRODUCTS } from '../data/shopData';
import crestImg from '@/assets/crest.png';
import crestRedImg from '@/assets/crest-red.png';
import honorLogoImg from '@/assets/honor-logo.png';

interface ShopPageProps {
  onNavigateHome: () => void;
  onNavigatePage: (page: 'home' | 'shop' | 'collections' | 'about' | 'contact') => void;
  cartItems: CartItem[];
  onAddToCart: (item: ShopItem) => void;
  onOpenCart: () => void;
  activeNavTab: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigateHome,
  onNavigatePage,
  cartItems,
  onAddToCart,
  onOpenCart,
  activeNavTab,
}) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
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

  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((item) => {
      // Category
      if (selectedCategory !== 'All Products' && item.category !== selectedCategory) {
        return false;
      }
      // Price
      if (item.price > maxPrice) {
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
  }, [selectedCategory, maxPrice, selectedColor, inStockOnly, sortBy, searchQuery]);

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
    <div className="min-h-screen bg-white text-black font-jakarta selection:bg-black selection:text-white pb-20 relative">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER & NAVIGATION                                       */}
      {/* ------------------------------------------------------------- */}
      <header className="px-6 lg:px-12 pt-6 pb-4 border-b border-gray-100 relative bg-white">
        {/* Top Row Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0 pb-6">
          {/* Top Left Crest Logo & Motto (Stacked) */}
          <div className="flex flex-col items-start gap-3">
            <div
              onClick={onNavigateHome}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-black flex items-center justify-center p-1 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm"
              title="Home"
            >
              <img src={crestImg} alt="Guild Crest" className="w-full h-full object-cover" />
            </div>
            <div className="text-[9px] font-mono tracking-widest text-gray-800 uppercase leading-tight font-semibold">
              <div>STRENGTH IN SILENCE</div>
              <div>CROWN OF SHADOWS</div>
              <div>JUSTICE & SHADOW</div>
            </div>
          </div>

          {/* Center Brand Title 'HONOR' Artwork Image */}
          <div className="relative text-center my-2 md:my-0 self-center md:self-auto flex items-center justify-center">
            <img
              src={honorLogoImg}
              alt="HONOR"
              className="h-20 md:h-28 lg:h-32 object-contain select-none"
            />
          </div>

          {/* Top Right Subnav & Utility Icons */}
          <div className="flex flex-col items-end gap-3 self-end md:self-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 hover:opacity-60 transition-opacity cursor-pointer"
                title="Search Shop"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => setShowJoinModal(true)}
                className="p-1.5 hover:opacity-60 transition-opacity cursor-pointer"
                title="Account / Member Circle"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                onClick={onOpenCart}
                className="p-1.5 hover:opacity-60 transition-opacity cursor-pointer relative"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>

            <div className="hidden lg:flex items-center text-[10px] font-mono tracking-[0.2em] uppercase text-black font-medium mt-3">
              <span>LOYALTY</span>
              <span className="mx-1.5">•</span>
              <span>GUIDES</span>
              <span className="mx-1.5">•</span>
              <span>DESTINY</span>
              <span className="ml-1.5">✦</span>
            </div>
          </div>
        </div>

        {/* Search Overlay Input */}
        {isSearchOpen && (
          <div className="pt-3 pb-2 border-t border-gray-100 flex items-center gap-3 animate-fadeIn">
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

        {/* Center Main Nav Tabs */}
        <nav className="flex items-center justify-center gap-8 md:gap-12 pt-4 pb-1 text-xs font-mono tracking-[0.22em] uppercase">
          <button
            onClick={onNavigateHome}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            HOME
          </button>
          <button
            onClick={() => onNavigatePage('shop')}
            className="font-bold relative pb-1 cursor-pointer"
          >
            SHOP
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black"></span>
          </button>
          <button
            onClick={() => onNavigatePage('collections')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            COLLECTIONS
          </button>
          <button
            onClick={() => onNavigatePage('about')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            ABOUT
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            CONTACT
          </button>
        </nav>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN SHOP CONTENT                                            */}
      {/* ------------------------------------------------------------- */}
      <main className="px-6 lg:px-12 pt-10">
        {/* Shop Section Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-black uppercase">
              SHOP
            </h2>
            <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
              <div>Gear forged for the future.</div>
              <div>For those who move in silence and lead in power.</div>
            </div>
          </div>

          {/* Controls: Sort By & View Toggle */}
          <div className="flex items-center gap-6">
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

        {/* Body Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDEBAR FILTERS                                          */}
          {/* ------------------------------------------------------------- */}
          <aside className="lg:col-span-3 space-y-8 pr-0 lg:pr-6 border-r-0 lg:border-r border-gray-100">
            {/* Filters Title Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 text-xs font-mono tracking-[0.2em] font-bold uppercase">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                FILTERS
              </span>
              <span className="text-gray-400">—</span>
            </div>

            {/* Category Accordion */}
            <div className="space-y-3">
              <button
                onClick={() => setCollapseCategory(!collapseCategory)}
                className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
              >
                <span>CATEGORY</span>
                <span>{collapseCategory ? '+' : '—'}</span>
              </button>

              {!collapseCategory && (
                <div className="space-y-2.5 pt-1 pl-1 text-xs font-mono">
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
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setCollapsePrice(!collapsePrice)}
                className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
              >
                <span>PRICE</span>
                <span>{collapsePrice ? '+' : '—'}</span>
              </button>

              {!collapsePrice && (
                <div className="space-y-3 pt-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>$50</span>
                    <span className="font-bold text-black">${maxPrice}+</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Color Swatches Accordion */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setCollapseColor(!collapseColor)}
                className="flex items-center justify-between w-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-left py-1 hover:opacity-70 cursor-pointer"
              >
                <span>COLOR</span>
                <span>{collapseColor ? '+' : '—'}</span>
              </button>

              {!collapseColor && (
                <div className="space-y-2.5 pt-1 text-xs font-mono">
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
            {(selectedCategory !== 'All Products' || maxPrice < 5000 || selectedColor || inStockOnly || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setMaxPrice(5000);
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
          </aside>

          {/* ------------------------------------------------------------- */}
          {/* PRODUCTS GRID                                                */}
          {/* ------------------------------------------------------------- */}
          <section className="lg:col-span-9 space-y-12">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 border border-dashed border-gray-200">
                <p className="font-mono text-sm uppercase text-gray-500">
                  No products found matching your active filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setMaxPrice(5000);
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
                        className="w-full aspect-[4/5] bg-[#f4f4f4] rounded-xl group-hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center justify-center p-3"
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
        </div>
      </main>

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
    </div>
  );
};

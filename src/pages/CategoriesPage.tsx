import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { toKebab } from '../api/mappers';
import { SEO } from '../components/SEO';

export const CategoriesPage: React.FC = () => {
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts({});

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of products) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  return (
    <main className="px-6 lg:px-12 pt-10">
      <SEO
        title="Categories"
        description="Browse ROYALTY's product categories — wearables, headgear, accessories, and limited edition collections."
      />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
          CATEGORIES
        </h2>
        <div className="text-xs font-mono tracking-widest uppercase text-gray-500">
          {categories.length} CATEGORIES IN LINEUP
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-10">
        {categories.map((category) => {
          const slug = category.slug ?? toKebab(category.name);
          const count = categoryCounts[category.name] ?? 0;
          return (
            <Link
              key={category._id}
              to={`/category/${slug}`}
              className="relative p-6 border border-gray-200 hover:border-black transition-colors group space-y-4 flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-gray-400">
                <span>{slug.toUpperCase()}</span>
                <span className="group-hover:text-black transition-colors">✦</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-orbitron font-bold text-lg md:text-xl tracking-wide uppercase text-black leading-snug">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600 font-jakarta leading-relaxed">
                  {count} {count === 1 ? 'PRODUCT' : 'PRODUCTS'} IN THIS CATEGORY.
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-left text-[10px] font-mono font-bold tracking-widest text-black uppercase transition-colors pt-2 border-t border-gray-100">
                <span>VIEW CATEGORY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
};
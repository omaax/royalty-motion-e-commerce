import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLLECTION_ITEMS } from '../data/pageData';
import { COLLECTION_PRODUCTS } from '../data/shopData';

export const CollectionsPage: React.FC = () => {
  return (
    <main className="px-6 lg:px-12 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
              COLLECTIONS
            </h2>
            <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
              <div>Archive 2026 season lineup.</div>
              <div>Engineered lines forged for the future.</div>
            </div>
          </div>
          <div className="text-xs font-mono tracking-widest uppercase text-gray-500">
            {COLLECTION_ITEMS.length} SERIES IN ARCHIVE
          </div>
        </div>

        {/* Season Lineup */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-10">
          {COLLECTION_ITEMS.map((item) => {
            const count = COLLECTION_PRODUCTS[item.id]?.length ?? 0;
            return (
              <Link
                key={item.id}
                to={`/collections/${item.id}`}
                className="relative p-6 border border-gray-200 hover:border-black transition-colors group space-y-4 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  <span>{item.code}</span>
                  <span className="group-hover:text-black transition-colors">✦</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-orbitron font-bold text-lg md:text-xl tracking-wide uppercase text-black leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-jakarta leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
                    {count} {count === 1 ? 'PRODUCT' : 'PRODUCTS'}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-left text-[10px] font-mono font-bold tracking-widest text-black uppercase transition-colors pt-2 border-t border-gray-100">
                  <span>EXPLORE THE LINE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { JOURNAL_ITEMS } from '../data/pageData';

export const JournalPage: React.FC = () => {
  return (
    <main className="px-6 lg:px-12 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
              JOURNAL
            </h2>
            <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
              <div>Editorial dispatches.</div>
              <div>The architecture of next-gen fashion.</div>
            </div>
          </div>
          <div className="text-xs font-mono tracking-widest uppercase text-gray-500">
            {JOURNAL_ITEMS.length} DISPATCHES
          </div>
        </div>

        {/* Latest Dispatches */}
        <div className="divide-y divide-gray-100 pt-6">
          {JOURNAL_ITEMS.map((item, index) => (
            <Link
              key={item.id}
              to="/shop"
              className="py-8 group flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
            >
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase md:w-16">
                0{index + 1}
              </span>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="font-orbitron font-bold text-sm md:text-lg tracking-wide uppercase text-black group-hover:underline leading-snug">
                  {item.title}
                </h3>
              </div>
              <span className="text-gray-300 group-hover:text-black transition-colors text-xl">
                →
              </span>
            </Link>
          ))}
        </div>
      </main>
  );
};
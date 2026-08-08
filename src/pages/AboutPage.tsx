import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <main className="px-6 lg:px-12 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
              ABOUT
            </h2>
            <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
              <div>Strength in silence.</div>
              <div>The guild behind the gear.</div>
            </div>
          </div>
        </div>

        {/* Manifesto */}
        <div className="max-w-3xl pt-12 space-y-6">
          <p className="font-mono text-xs tracking-widest uppercase text-gray-500">
            LGPSM &mdash; EST. 2026
          </p>
          <p className="font-serif text-2xl md:text-3xl font-bold leading-snug uppercase text-black">
            Future-forward fashion engineered for those who move in silence and lead in power.
          </p>
          <div className="space-y-4 text-sm text-gray-600 font-jakarta leading-relaxed">
            <p>
              LGPSM forges garments, headgear, and tech for the modern operative &mdash;
              pieces built from recycled polymers, titanium-infused ceramics, and
              weather-sealed fabrics designed to outlast the season.
            </p>
            <p>
              Beyond trends. Built for tomorrow. Every drop is limited, every line
              archived, and every member of the circle gets first access.
            </p>
          </div>
        </div>
      </main>
  );
};
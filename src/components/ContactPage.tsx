import React from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <main className="px-6 lg:px-12 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-black uppercase">
              CONTACT
            </h2>
            <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
              <div>Open a line of communication.</div>
              <div>The circle is always listening.</div>
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 border border-gray-200 rounded-md flex items-center gap-4">
              <Mail className="w-5 h-5 stroke-[1.5] shrink-0" />
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  Direct Line
                </div>
                <div className="font-mono text-xs font-bold uppercase">
                  ops@lgpsm.armory
                </div>
              </div>
            </div>
            <div className="p-5 border border-gray-200 rounded-md flex items-center gap-4">
              <MapPin className="w-5 h-5 stroke-[1.5] shrink-0" />
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  HQ
                </div>
                <div className="font-mono text-xs font-bold uppercase">
                  Sector 7, Undisclosed Coordinates
                </div>
              </div>
            </div>
          </div>

          <form className="lg:col-span-7 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="CALLSIGN"
              className="w-full px-4 py-3 border border-gray-300 text-xs font-mono tracking-widest uppercase focus:outline-none focus:border-black"
            />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full px-4 py-3 border border-gray-300 text-xs font-mono tracking-widest uppercase focus:outline-none focus:border-black"
            />
            <textarea
              placeholder="TRANSMISSION"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 text-xs font-mono tracking-widest uppercase focus:outline-none focus:border-black resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <span>TRANSMIT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
  );
};
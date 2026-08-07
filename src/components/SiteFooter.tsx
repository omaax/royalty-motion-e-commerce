import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import crestImg from '@/assets/crest.png';
import { MotionButton } from './MotionButton';

const FOOTER_COLUMNS: { title: string; links: { label: string; path?: string }[] }[] = [
  {
    title: 'EXPLORE',
    links: [
      { label: 'SHOP', path: '/shop' },
      { label: 'CATEGORIES', path: '/categories' },
      { label: 'COLLECTIONS', path: '/collections' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'JOURNAL', path: '/journal' },
      { label: 'ABOUT', path: '/about' },
      { label: 'CONTACT', path: '/contact' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { label: "FAQ'S" },
      { label: 'SHIPPING & RETURNS' },
      { label: 'PRIVACY' },
      { label: 'TERMS' },
    ],
  },
];

const SOCIALS = [
  { label: 'Instagram', icon: Instagram },
  { label: 'Twitter', icon: Twitter },
  { label: 'YouTube', icon: Youtube },
];

export const SiteFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="px-6 lg:px-12 pt-10 pb-8 bg-white border-t border-black relative z-40 shrink-0">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Brand Block */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-28 h-28 rounded-full border border-black flex items-center justify-center p-1 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm shrink-0"
            title="Home"
          >
            <img src={crestImg} alt="Guild Crest" className="w-full h-full object-cover" />
          </button>
          <div className="text-sm font-mono tracking-widest uppercase leading-tight font-bold">
            <div>STRENGTH IN SILENCE</div>
            <div>CROWN OF SHADOWS</div>
            <div>JUSTICE & SHADOW</div>
          </div>
        </div>

        {/* Link Columns */}
        <div className="flex gap-12 md:gap-16">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} className="flex flex-col items-start gap-3">
              <h4 className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-gray-400">
                {column.title}
              </h4>
              {column.links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => link.path && navigate(link.path)}
                  className="text-xs font-mono tracking-[0.2em] uppercase font-bold cursor-pointer group relative pb-1"
                >
                  <span className="group-hover:opacity-60 transition-opacity">{link.label}</span>
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ))}
            </nav>
          ))}
        </div>

        {/* Contact + Socials */}
        <div className="flex flex-col items-center md:items-end justify-between gap-4 md:max-w-xs">
          <a
            href="mailto:hello@honor.example"
            className="font-jakarta text-sm text-gray-700 hover:text-black transition-colors font-normal"
          >
            hello@honor.example
          </a>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <MotionButton
                key={label}
                title={label}
                className="rounded-full w-9 h-9"
                style={{ padding: 0 }}
              >
                <Icon className="w-4 h-4 stroke-[1.8]" />
              </MotionButton>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold">
          © 2026 HONOR — CLASSIC FORWARD FASHION
        </div>
      </div>
    </footer>
  );
};
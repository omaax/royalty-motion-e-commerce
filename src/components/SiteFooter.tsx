import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import crestImg from '@/assets/crest.png';
import { APP_EMAIL, APP_NAME, APP_TAGLINE, APP_YEAR } from '../constants/branding';
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
  const [openColumn, setOpenColumn] = useState<string | null>('EXPLORE');
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <footer className="px-6 lg:px-12 pt-6 pb-5 bg-white border-t border-black relative z-40 shrink-0">
      <div className="flex flex-col items-start md:flex-row md:items-stretch justify-between gap-8">
        {/* Brand Block */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="w-28 h-28 rounded-full border border-black flex items-center justify-center p-1 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm shrink-0"
            title="Home"
          >
            <img src={crestImg} alt="Guild Crest" className="w-full h-full object-cover" />
          </Link>
          <div className="text-sm font-mono tracking-widest uppercase leading-tight font-bold">
            <div>STRENGTH IN SILENCE</div>
            <div>CROWN OF SHADOWS</div>
            <div>JUSTICE & SHADOW</div>
          </div>
        </div>

        {/* Link Columns */}
        <div className="flex flex-col w-full md:w-auto md:flex-row md:flex-wrap gap-x-12 gap-y-8 md:gap-x-16">
          {FOOTER_COLUMNS.map((column) => {
            const isOpen = openColumn === column.title;
            return (
              <nav key={column.title} className="flex flex-col items-start gap-3 w-full md:w-auto border-t border-black/10 md:border-0 pt-3 md:pt-0">
                <button
                  type="button"
                  onClick={() => setOpenColumn(isOpen ? null : column.title)}
                  className="flex items-center justify-between w-full md:pointer-events-none md:cursor-default cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <h4 className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-gray-400">
                    {column.title}
                  </h4>
                  <span className="text-sm text-gray-400 md:hidden">{isOpen ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {(isOpen || isDesktop) && (
                    <motion.div
                      key="links"
                      initial={isDesktop ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={isDesktop ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden flex flex-col gap-3 pt-1 md:pt-0"
                    >
                      {column.links.map((link) =>
                        link.path ? (
                          <Link
                            key={link.label}
                            to={link.path}
                            className="text-left text-xs font-mono tracking-[0.2em] uppercase font-bold cursor-pointer group relative pb-1 whitespace-nowrap"
                          >
                            <span className="relative inline-block">
                              {link.label}
                              <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </span>
                          </Link>
                        ) : (
                          <span
                            key={link.label}
                            className="text-left text-xs font-mono tracking-[0.2em] uppercase font-bold group relative pb-1 whitespace-nowrap"
                          >
                            <span className="relative inline-block">
                              {link.label}
                              <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </span>
                          </span>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>
            );
          })}
        </div>

        {/* Contact + Socials */}
        <div className="flex flex-col items-center md:items-end justify-between gap-4 md:max-w-xs">
          <a
            href={`mailto:${APP_EMAIL}`}
            className="font-jakarta text-sm text-gray-700 hover:text-black transition-colors font-normal"
          >
            {APP_EMAIL}
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
      <div className="mt-5 pt-3 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold">
          © {APP_YEAR} {APP_NAME} — {APP_TAGLINE}
        </div>
      </div>
    </footer>
  );
};
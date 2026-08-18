import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import { RollingText } from '../RollingText';
import { UserProfile } from '../../types';

const PROFILE_TABS: { label: string; path: string; end?: boolean }[] = [
  { label: 'ACCOUNT', path: '/profile', end: true },
  { label: 'ORDER HISTORY', path: '/profile/orders' },
];

interface ProfileLayoutProps {
  profile: UserProfile;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({ profile }) => {
  return (
    <main className="px-6 lg:px-12 pt-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
            PROFILE
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Your account &amp; orders</div>
            <div>Forged. Sealed. Ready for delivery.</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pt-8">
        <aside className="lg:w-72 xl:w-80 shrink-0 flex flex-col">
          <div className="flex items-center gap-4 p-5 border border-gray-200 rounded-md">
            <div className="w-14 h-14 rounded-full border border-black flex items-center justify-center bg-black text-white shrink-0">
              <UserRound className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
                MEMBER
              </div>
              <div className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                {profile.name}
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase truncate">
                {profile.email}
              </div>
            </div>
          </div>

          <nav className="mt-4 flex lg:flex-col gap-2 lg:border lg:border-gray-200 lg:rounded-md lg:p-3">
            {PROFILE_TABS.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.end}
                className={({ isActive }) =>
                  `group relative pb-1 lg:pb-2 cursor-pointer whitespace-nowrap text-left text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold px-2 py-1 transition-colors ${
                    isActive ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <RollingText>{tab.label}</RollingText>
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-[3px] bg-black origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
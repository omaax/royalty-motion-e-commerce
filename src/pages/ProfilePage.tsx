import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Check, LogOut, X, MapPin, PackageCheck, Wallet, Heart } from 'lucide-react';
import { MotionButton } from '../components/MotionButton';
import { useMe, useUpdateProfile, useLogout } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { useWishlistIds } from '../hooks/useWishlist';
import { pushToast } from '../lib/useToast';

interface DraftProfile {
  name: string;
  email: string;
  phone: string;
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: profile } = useMe();
  const updateProfile = useUpdateProfile();
  const logout = useLogout();
  const { data: orders = [] } = useOrders();
  const wishlistCount = useWishlistIds().length;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<DraftProfile>({
    name: profile?.name ?? '',
    email: profile?.email ?? '',
    phone: profile?.phone ?? '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startEditing = () => {
    setDraft({
      name: profile?.name ?? '',
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft({
      name: profile?.name ?? '',
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
    });
    setIsEditing(false);
  };

  const saveEditing = () => {
    updateProfile.mutate(
      { name: draft.name, email: draft.email, phone: draft.phone || undefined },
      {
        onSuccess: () => {
          setIsEditing(false);
          pushToast('Profile updated.');
        },
        onError: (error) => {
          pushToast(error instanceof Error ? error.message : 'Could not update profile.');
        },
      }
    );
  };

  const totalSpent = orders.reduce((acc, o) => acc + o.total, 0);

  const stats = [
    { label: 'TOTAL ORDERS', value: orders.length, icon: PackageCheck },
    { label: 'TOTAL SPENT', value: `EGP ${totalSpent.toFixed(2)}`, icon: Wallet },
    { label: 'WISHLIST', value: wishlistCount, icon: Heart },
  ];

  const fields: { label: string; value?: string; key?: keyof DraftProfile }[] = [
    { label: 'Full Name', key: 'name', value: profile?.name },
    { label: 'Email', key: 'email', value: profile?.email },
    { label: 'Phone', key: 'phone', value: profile?.phone },
    { label: 'Member Since', value: profile?.createdAt ? new Date(profile.createdAt).getFullYear().toString() : '—' },
  ];

  return (
    <div className="space-y-8">
      <section className="p-6 border border-gray-200 rounded-md space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
            Account Details
          </h3>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <MotionButton
                variant="ghost"
                onClick={cancelEditing}
                className="font-mono text-[10px] tracking-widest uppercase px-4 py-1.5"
              >
                <span>CANCEL</span>
                <X className="w-3.5 h-3.5" />
              </MotionButton>
              <MotionButton
                variant="solid"
                onClick={saveEditing}
                className="font-mono text-[10px] tracking-widest uppercase px-4 py-1.5"
              >
                <span>SAVE</span>
                <Check className="w-3.5 h-3.5" />
              </MotionButton>
            </div>
          ) : (
            <button
              type="button"
              onClick={startEditing}
              className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 stroke-[1.8]" />
              EDIT
            </button>
          )}
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1 border-b border-gray-100 pb-3">
              <dt className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
                {field.label}
              </dt>
              <dd>
                {isEditing && field.key ? (
                  <input
                    type="text"
                    value={draft[field.key]}
                    onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-transparent text-xs font-jakarta font-semibold text-black uppercase tracking-wide outline-none border-b border-black pb-0.5 focus:border-black transition-colors"
                  />
                ) : (
                  <span className="text-xs font-jakarta font-semibold text-black uppercase tracking-wide">
                    {field.value || '— Not set —'}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="p-6 border border-gray-200 rounded-md flex flex-col items-start gap-3">
            <Icon className="w-5 h-5 stroke-[1.5] text-gray-500" />
            <div className="font-orbitron font-bold text-2xl text-black">
              {typeof value === 'number' ? value.toLocaleString('en-US') : value}
            </div>
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
              {label}
            </div>
          </div>
        ))}
      </section>

      <section className="p-6 border border-gray-200 rounded-md space-y-3">
        <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black flex items-center gap-2">
          <MapPin className="w-4 h-4 stroke-[1.8]" />
          Shipping Address
        </h3>
        <p className="text-xs font-jakarta font-semibold text-gray-700 uppercase tracking-wide">
          Add a default shipping address during checkout to speed up future orders.
        </p>
      </section>

      <section className="border-t border-gray-200 pt-6 flex items-center justify-between gap-4">
        <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
          Signed in as {profile?.email}
        </div>
        <MotionButton
          variant="ghost"
          onClick={handleLogout}
          className="font-mono text-[10px] tracking-widest uppercase px-4 py-2"
        >
          <span>SIGN OUT</span>
          <LogOut className="w-3.5 h-3.5" />
        </MotionButton>
      </section>
    </div>
  );
};
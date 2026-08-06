import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartButtonProps {
  cartCount: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ cartCount }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="hover:opacity-60 transition-opacity cursor-pointer"
      title="Shopping Bag"
    >
      <ShoppingBag className="w-5 h-5 stroke-[2]" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
};
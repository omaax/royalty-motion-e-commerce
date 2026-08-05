import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface JoinCircleModalProps {
  onClose: () => void;
}

export const JoinCircleModal: React.FC<JoinCircleModalProps> = ({ onClose }) => {
  const [emailInput, setEmailInput] = useState('');
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setJoinedSuccess(true);
      setTimeout(() => {
        onClose();
        setJoinedSuccess(false);
        setEmailInput('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-black max-w-md w-full p-6 md:p-8 space-y-6 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full border border-red-700 text-red-700 flex items-center justify-center p-3 mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M50 20 L65 35 L80 35 L70 52 L75 75 L50 60 L25 75 L30 52 L20 35 L35 35 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">
            HONOR THE CODE
          </h3>
          <p className="text-xs font-mono text-gray-600 leading-relaxed">
            Join the inner circle for exclusive drops, private archives, and priority access.
          </p>
        </div>

        {joinedSuccess ? (
          <div className="p-4 bg-gray-50 text-green-800 font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>WELCOME TO THE CIRCLE</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="ENTER YOUR EMAIL ADDRESS"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-xs font-mono tracking-widest uppercase focus:outline-none focus:border-black text-center"
            />
            <button
              type="submit"
              className="w-full py-3 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer"
            >
              JOIN THE CIRCLE →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
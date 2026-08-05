import { ArrowRight } from 'lucide-react';
import crestRedImg from '@/assets/crest-red.png';

interface JoinCircleBoxProps {
  onOpen: () => void;
}

export const JoinCircleBox: React.FC<JoinCircleBoxProps> = ({ onOpen }) => {
  return (
    <div className="p-4 border border-black rounded-sm space-y-3 bg-white relative overflow-hidden group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-red-700/40 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
          <img src={crestRedImg} alt="Honor Red Crest" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-serif font-bold text-xs tracking-wider uppercase text-black">
            HONOR THE CODE
          </h4>
          <p className="text-[10px] font-mono text-gray-600 leading-tight">
            Unlock exclusive gear and early access.
          </p>
        </div>
      </div>

      <button
        onClick={onOpen}
        className="w-full text-left text-xs font-mono font-bold tracking-widest text-black hover:text-red-700 flex items-center gap-1.5 uppercase transition-colors pt-1 cursor-pointer"
      >
        <span>JOIN THE CIRCLE</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
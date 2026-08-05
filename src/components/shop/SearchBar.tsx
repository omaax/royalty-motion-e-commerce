import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQuery: (query: string) => void;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onQuery, onClose }) => {
  return (
    <div className="pt-3 pb-6 flex items-center gap-3 animate-fadeIn">
      <Search className="w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search armor, headgear, tech, accessories..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        className="flex-1 text-xs font-mono uppercase tracking-widest bg-transparent focus:outline-none placeholder:text-gray-400"
        autoFocus
      />
      {query && (
        <button onClick={() => onQuery('')} className="text-xs text-gray-400 hover:text-black">
          Clear
        </button>
      )}
      <button
        onClick={onClose}
        className="text-xs font-mono uppercase text-gray-500 hover:text-black"
      >
        Close [✕]
      </button>
    </div>
  );
};
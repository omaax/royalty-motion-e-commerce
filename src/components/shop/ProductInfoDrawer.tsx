import { motion } from 'motion/react';
import { Ruler, ScanLine, Sparkles, Truck, X } from 'lucide-react';
import { Category, ShopItem } from '../../types';

export type InfoTab = 'measurements' | 'care' | 'shipping';

interface ProductInfoDrawerProps {
  item: ShopItem;
  tab: InfoTab;
  onClose: () => void;
}

interface InfoRow {
  label: string;
  value: string;
}

const TAB_LABELS: Record<InfoTab, string> = {
  measurements: 'Measurements',
  care: 'Composition and Care',
  shipping: 'Shipping and Returns',
};

const TAB_ICONS: Record<InfoTab, React.ReactNode> = {
  measurements: <Ruler className="w-4 h-4 stroke-[1.5]" />,
  care: <Sparkles className="w-4 h-4 stroke-[1.5]" />,
  shipping: <Truck className="w-4 h-4 stroke-[1.5]" />,
};

const CARE_ROWS: Record<Category, InfoRow[]> = {
  Wearables: [
    { label: 'Fabric', value: 'High-thread recycled polymer weave' },
    { label: 'Construction', value: 'Seam-welded articulated panels' },
    { label: 'Care', value: 'Cold wash and air dry. Do not iron.' },
  ],
  Headgear: [
    { label: 'Material', value: 'Titanium-infused ceramic polymer' },
    { label: 'Interior', value: 'Memory-foam smart liner' },
    { label: 'Care', value: 'Wipe clean with a soft dry cloth.' },
  ],
  Accessories: [
    { label: 'Material', value: 'Aerospace-grade alloy' },
    { label: 'Finish', value: 'Hand-burnished' },
    { label: 'Care', value: 'Polish with a microfibre cloth.' },
  ],
  Tech: [
    { label: 'Shell', value: 'Aerospace silver-alloy housing' },
    { label: 'Core', value: 'Sealed quantum processing module' },
    { label: 'Care', value: 'Keep dry. Clean with a lint-free cloth.' },
  ],
  'Limited Edition': [
    { label: 'Construction', value: 'Hand-finished, numbered piece' },
    { label: 'Case', value: 'Registered archival presentation case' },
    { label: 'Care', value: 'Store in the archival case indoors.' },
  ],
};

const SHIPPING_ROWS: InfoRow[] = [
  { label: 'Shipping', value: 'Complimentary worldwide' },
  { label: 'Delivery', value: '5 – 7 business days' },
  { label: 'Returns', value: '30-day return window' },
  { label: 'Condition', value: 'Unworn, unwashed, tags attached' },
];

const RowList: React.FC<{ rows: InfoRow[]; note?: string }> = ({ rows, note }) => (
  <>
    <ul className="space-y-0">
      {rows.map((row) => (
        <li
          key={row.label}
          className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-b-0"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-gray-600 shrink-0">
            {row.label}
          </span>
          <span className="font-mono text-xs font-bold text-black text-right">{row.value}</span>
        </li>
      ))}
    </ul>
    {note && (
      <p className="text-[10px] font-mono text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
        {note}
      </p>
    )}
  </>
);

const MeasurementsView: React.FC<{ item: ShopItem }> = ({ item }) => {
  const measurements = item.measurements;

  if (!measurements) {
    return (
      <p className="text-xs font-mono text-gray-500 leading-relaxed">
        Detailed measurements for this item are not available yet.
      </p>
    );
  }

  const rows: InfoRow[] = [];
  if (measurements.sizes?.length) {
    rows.push({ label: 'Available Sizes', value: measurements.sizeRange ?? measurements.sizes.join(' / ') });
  }
  rows.push(...measurements.dimensions);

  return (
    <RowList
      rows={rows}
      note="All measurements taken flat. Allow a tolerance of ± 1 cm for hand-finished pieces."
    />
  );
};

export const ProductInfoDrawer: React.FC<ProductInfoDrawerProps> = ({ item, tab, onClose }) => {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fadeIn"
        onClick={onClose}
      />

      <motion.aside
        key={tab}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', ease: [0.25, 1, 0.5, 1], duration: 0.35 }}
        className="absolute inset-y-0 right-0 w-[var(--drawer-max)] max-w-full bg-white border-l border-black flex flex-col"
      >
        <div className="flex items-center justify-between px-[var(--drawer-pad)] py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {TAB_ICONS[tab]}
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
              {TAB_LABELS[tab]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-[var(--drawer-pad)] py-5 space-y-5">
          <div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide">{item.title}</h3>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {item.category}
            </div>
          </div>

          {tab === 'measurements' && <MeasurementsView item={item} />}
          {tab === 'care' && <RowList rows={CARE_ROWS[item.category]} />}
          {tab === 'shipping' && <RowList rows={SHIPPING_ROWS} />}
        </div>
      </motion.aside>
    </div>
  );
};
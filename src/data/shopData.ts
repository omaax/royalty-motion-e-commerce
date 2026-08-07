import { ShopItem, CollectionId } from '../types';
import sinnerTShirtImg from '@/assets/products/sinner-tshirt.png';
import ancientTShirtImg from '@/assets/products/ANCIENT-tshirt.png';
import HiddenInPlainSight1 from '@/assets/products/Hidden-in-Plain Sight-1.png';
import HiddenInPlainSight2 from '@/assets/products/Hidden-in-Plain Sight-2.png';
import HiddenInPlainSight3 from '@/assets/products/Hidden-in-Plain Sight-3.png';
import masoueradeWhite from '@/assets/products/masouerade-white.png';
import masoueradeBlack from '@/assets/products/masouerade-black.png';
import ancientTShirtWhite from '@/assets/products/ANCIENT-tshirt-white.png';

export const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: 'sinner-tshirt',
    title: 'SINNER T-SHIRT',
    price: 750.0,
    category: 'Wearables',
    collection: 'series-01',
    colors: ['Obsidian', 'Graphite', 'White'],
    inStock: true,
    tag: 'FEATURED',
    description: 'Precision 3D sculpted ceremonial headpiece forged from titanium-infused ceramic polymer with integrated neural interface dampeners.',
    images: [sinnerTShirtImg],
    measurements: {
      sizeRange: 'S—XXL',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      dimensions: [
        { label: 'Chest', value: '48—56 cm' },
        { label: 'Length', value: '72 cm' },
        { label: 'Shoulder', value: '44 cm' },
        { label: 'Sleeve', value: '22 cm' },
      ],
    },
  },
  {
    id: 'hidden-in-plain-sight',
    title: 'HIDDEN IN PLAIN SIGHT',
    price: 750.0,
    category: 'Wearables',
    collection: 'series-01',
    colors: ['Obsidian', 'Graphite', 'White'],
    inStock: true,
    tag: 'FEATURED',
    description: 'Precision 3D sculpted ceremonial headpiece forged from titanium-infused ceramic polymer with integrated neural interface dampeners.',
    images: [HiddenInPlainSight1, HiddenInPlainSight2, HiddenInPlainSight3,],
    measurements: {
      sizeRange: 'S—XXL',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      dimensions: [
        { label: 'Chest', value: '48—56 cm' },
        { label: 'Length', value: '72 cm' },
        { label: 'Shoulder', value: '44 cm' },
        { label: 'Sleeve', value: '22 cm' },
      ],
    },
  },
  {
    id: 'ancient-tshirt',
    title: 'ANCIENT T-SHIRT',
    price: 750.0,
    category: 'Wearables',
    collection: 'series-02',
    colors: ['Obsidian', 'Bronze'],
    inStock: true,
    tag: 'FEATURED',
    description: 'Precision 3D sculpted ceremonial headpiece forged from titanium-infused ceramic polymer with integrated neural interface dampeners.',
    images: [ancientTShirtImg],
    measurements: {
      sizeRange: 'S—XXL',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      dimensions: [
        { label: 'Chest', value: '48 – 56 cm' },
        { label: 'Length', value: '71 cm' },
        { label: 'Shoulder', value: '44 cm' },
        { label: 'Sleeve', value: '22 cm' },
      ],
    },
  },
  {
    id: 'masouerade-black',
    title: 'MASOUERADE BLACK',
    price: 750.0,
    category: 'Wearables',
    collection: 'series-02',
    colors: ['Obsidian', 'Bronze'],
    inStock: true,
    tag: 'Limited Edition',
    description: 'Precision 3D sculpted ceremonial headpiece forged from titanium-infused ceramic polymer with integrated neural interface dampeners.',
    images: [masoueradeBlack],
    measurements: {
      sizeRange: 'S—XXL',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      dimensions: [
        { label: 'Chest', value: '48 – 56 cm' },
        { label: 'Length', value: '71 cm' },
        { label: 'Shoulder', value: '44 cm' },
        { label: 'Sleeve', value: '22 cm' },
      ],
    },
  },
  {
    id: 'masouerade-white',
    title: 'MASOUERADE WHITE',
    price: 750.0,
    category: 'Wearables',
    collection: 'series-03',
    colors: ['Obsidian', 'Bronze'],
    inStock: true,
    tag: 'New',
    description: 'Precision 3D sculpted ceremonial headpiece forged from titanium-infused ceramic polymer with integrated neural interface dampeners.',
    images: [masoueradeWhite],
    measurements: {
      sizeRange: 'S—XXL',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      dimensions: [
        { label: 'Chest', value: '48 – 56 cm' },
        { label: 'Length', value: '71 cm' },
        { label: 'Shoulder', value: '44 cm' },
        { label: 'Sleeve', value: '22 cm' },
      ],
    },
  },
  {
    id: 'ancient-tshirt-white',
    title: 'ANCIENT T-SHIRT WHITE',
    price: 750.0,
    category: 'Wearables',
    collection: 'series-03',
    colors: ['White'],
    inStock: false,
    tag: 'FEATURED',
    description: 'Precision 3D sculpted ceremonial headpiece forged from titanium-infused ceramic polymer with integrated neural interface dampeners.',
    images: [ancientTShirtWhite],
    measurements: {
      sizeRange: 'S—XXL',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      dimensions: [
        { label: 'Chest', value: '48 – 56 cm' },
        { label: 'Length', value: '71 cm' },
        { label: 'Shoulder', value: '44 cm' },
        { label: 'Sleeve', value: '22 cm' },
      ],
    },
  },
];

export const COLLECTION_PRODUCTS = SHOP_PRODUCTS.reduce<Record<CollectionId, ShopItem[]>>(
  (acc, product) => {
    if (product.collection) {
      (acc[product.collection] ??= []).push(product);
    }
    return acc;
  },
  {
    'series-01': [],
    'series-02': [],
    'series-03': [],
  }
);
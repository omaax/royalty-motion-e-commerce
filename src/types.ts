export interface ShopItem {
  id: string;
  title: string;
  price: number;
  category: 'Wearables' | 'Headgear' | 'Accessories' | 'Tech' | 'Limited Edition';
  color: 'Obsidian' | 'Graphite' | 'Silver' | 'Bronze' | 'White';
  inStock: boolean;
  tag?: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  item: ShopItem;
  quantity: number;
}

export interface CollectionItem {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface JournalItem {
  id: string;
  date: string;
  title: string;
  readTime: string;
}

export interface ToastMessage {
  id: string;
  text: string;
}


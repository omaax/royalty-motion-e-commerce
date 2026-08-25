export type AdminUser = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  status: "active" | "inactive";
};

export type AdminPayment = {
  id: string;
  userId: string;
  amount: number;
  name: string;
  email: string;
  status: "pending" | "processing" | "success" | "failed";
};

export const adminProducts = [
  {
    id: 1,
    name: "ANCIENT Hoodie",
    shortDescription: "Premium heavyweight hoodie from the ANCIENT collection.",
    description:
      "Crafted from premium heavyweight French terry cotton, the ANCIENT Hoodie embodies the core philosophy of Classic Forward Fashion — timeless silhouettes elevated with modern craftsmanship. Features a structured hood, ribbed cuffs, and a kangaroo pocket with hidden zip compartment.",
    price: 149.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["black", "gray"],
    images: {
      black: "/admin/products/ANCIENT.png",
      gray: "/admin/products/ANCIENT-2.png",
    },
  },
  {
    id: 2,
    name: "Masquerade Tee",
    shortDescription: "Bold graphic tee with masquerade mask design.",
    description:
      "The Masquerade Tee is a statement piece featuring an intricate masquerade mask graphic screen-printed on premium combed cotton. Relaxed fit with reinforced shoulder seams and a signature woven label at the hem.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/masouerade-black.png",
      white: "/admin/products/masouerade-white.png",
    },
  },
  {
    id: 3,
    name: "Sinner Pullover",
    shortDescription: "Statement pullover from the Sinner series.",
    description:
      "From the Sinner series, this pullover merges streetwear edge with refined construction. Heavyweight brushed fleece interior, dropped shoulders, and a bold chest graphic that defines the ROYALTY aesthetic.",
    price: 89.9,
    sizes: ["s", "m", "l"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/sinner-tshirt.png",
      white: "/admin/products/ancient-tshirt-white.png",
    },
  },
  {
    id: 4,
    name: "Hidden in Plain Sight Tee",
    shortDescription: "Minimalist tee with hidden detail.",
    description:
      "A minimalist essential with a concealed design element revealed only under certain light. Cut from 220gsm organic cotton with a clean, boxy silhouette and tonal stitching throughout.",
    price: 49.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/Hidden-in-Plain Sight-1.png",
      white: "/admin/products/Hidden-in-Plain Sight-2.png",
    },
  },
  {
    id: 5,
    name: "ANCIENT T-Shirt",
    shortDescription: "Classic cotton tee from ANCIENT series.",
    description:
      "The foundation piece of the ANCIENT series. Premium 100% combed cotton, pre-shrunk construction, and a relaxed regular fit. Features a subtle embossed ANCIENT logo on the left chest.",
    price: 39.9,
    sizes: ["s", "m", "l"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/ANCIENT-tshirt.png",
      white: "/admin/products/ancient-tshirt-white.png",
    },
  },
];

export const adminUsers: AdminUser[] = [
  { id: "u1", avatar: "/admin/users/1.png", name: "Marcus Aurelio", email: "marcus.a@royalty.com", status: "active" },
  { id: "u2", avatar: "/admin/users/2.png", name: "Victoria Chen", email: "v.chen@royalty.com", status: "active" },
  { id: "u3", avatar: "/admin/users/3.png", name: "Darius Kingsley", email: "d.kingsley@royalty.com", status: "inactive" },
  { id: "u4", avatar: "/admin/users/4.png", name: "Sophia Laurent", email: "s.laurent@royalty.com", status: "active" },
  { id: "u5", avatar: "/admin/users/5.png", name: "Elijah Montgomery", email: "e.montgomery@royalty.com", status: "active" },
  { id: "u6", avatar: "/admin/users/6.png", name: "Camille Dubois", email: "c.dubois@royalty.com", status: "inactive" },
  { id: "u7", avatar: "/admin/users/7.png", name: "Rafael Santoro", email: "r.santoro@royalty.com", status: "active" },
  { id: "u8", avatar: "/admin/users/8.png", name: "Nadia Petrov", email: "n.petrov@royalty.com", status: "active" },
  { id: "u9", avatar: "/admin/users/9.png", name: "Levi Ashford", email: "l.ashford@royalty.com", status: "inactive" },
  { id: "u10", avatar: "/admin/users/10.png", name: "Aria Fontaine", email: "a.fontaine@royalty.com", status: "active" },
];

export const adminPayments: AdminPayment[] = [
  { id: "p1", userId: "u1", amount: 149.9, name: "Marcus Aurelio", email: "marcus.a@royalty.com", status: "success" },
  { id: "p2", userId: "u2", amount: 59.9, name: "Victoria Chen", email: "v.chen@royalty.com", status: "success" },
  { id: "p3", userId: "u3", amount: 89.9, name: "Darius Kingsley", email: "d.kingsley@royalty.com", status: "pending" },
  { id: "p4", userId: "u4", amount: 149.9, name: "Sophia Laurent", email: "s.laurent@royalty.com", status: "success" },
  { id: "p5", userId: "u5", amount: 49.9, name: "Elijah Montgomery", email: "e.montgomery@royalty.com", status: "processing" },
  { id: "p6", userId: "u6", amount: 39.9, name: "Camille Dubois", email: "c.dubois@royalty.com", status: "failed" },
  { id: "p7", userId: "u7", amount: 149.9, name: "Rafael Santoro", email: "r.santoro@royalty.com", status: "success" },
  { id: "p8", userId: "u8", amount: 59.9, name: "Nadia Petrov", email: "n.petrov@royalty.com", status: "success" },
  { id: "p9", userId: "u9", amount: 89.9, name: "Levi Ashford", email: "l.ashford@royalty.com", status: "pending" },
  { id: "p10", userId: "u10", amount: 149.9, name: "Aria Fontaine", email: "a.fontaine@royalty.com", status: "success" },
  { id: "p11", userId: "u1", amount: 49.9, name: "Marcus Aurelio", email: "marcus.a@royalty.com", status: "success" },
  { id: "p12", userId: "u2", amount: 89.9, name: "Victoria Chen", email: "v.chen@royalty.com", status: "processing" },
  { id: "p13", userId: "u3", amount: 39.9, name: "Darius Kingsley", email: "d.kingsley@royalty.com", status: "success" },
  { id: "p14", userId: "u4", amount: 59.9, name: "Sophia Laurent", email: "s.laurent@royalty.com", status: "success" },
  { id: "p15", userId: "u5", amount: 149.9, name: "Elijah Montgomery", email: "e.montgomery@royalty.com", status: "pending" },
  { id: "p16", userId: "u6", amount: 149.9, name: "Camille Dubois", email: "c.dubois@royalty.com", status: "success" },
  { id: "p17", userId: "u7", amount: 39.9, name: "Rafael Santoro", email: "r.santoro@royalty.com", status: "failed" },
  { id: "p18", userId: "u8", amount: 89.9, name: "Nadia Petrov", email: "n.petrov@royalty.com", status: "success" },
  { id: "p19", userId: "u9", amount: 59.9, name: "Levi Ashford", email: "l.ashford@royalty.com", status: "success" },
  { id: "p20", userId: "u10", amount: 49.9, name: "Aria Fontaine", email: "a.fontaine@royalty.com", status: "processing" },
  { id: "p21", userId: "u1", amount: 89.9, name: "Marcus Aurelio", email: "marcus.a@royalty.com", status: "success" },
  { id: "p22", userId: "u2", amount: 39.9, name: "Victoria Chen", email: "v.chen@royalty.com", status: "success" },
  { id: "p23", userId: "u3", amount: 149.9, name: "Darius Kingsley", email: "d.kingsley@royalty.com", status: "success" },
  { id: "p24", userId: "u4", amount: 149.9, name: "Sophia Laurent", email: "s.laurent@royalty.com", status: "pending" },
  { id: "p25", userId: "u5", amount: 59.9, name: "Elijah Montgomery", email: "e.montgomery@royalty.com", status: "success" },
  { id: "p26", userId: "u6", amount: 49.9, name: "Camille Dubois", email: "c.dubois@royalty.com", status: "success" },
  { id: "p27", userId: "u7", amount: 149.9, name: "Rafael Santoro", email: "r.santoro@royalty.com", status: "processing" },
  { id: "p28", userId: "u8", amount: 39.9, name: "Nadia Petrov", email: "n.petrov@royalty.com", status: "success" },
  { id: "p29", userId: "u9", amount: 89.9, name: "Levi Ashford", email: "l.ashford@royalty.com", status: "failed" },
  { id: "p30", userId: "u10", amount: 149.9, name: "Aria Fontaine", email: "a.fontaine@royalty.com", status: "success" },
  { id: "p31", userId: "u1", amount: 59.9, name: "Marcus Aurelio", email: "marcus.a@royalty.com", status: "success" },
  { id: "p32", userId: "u2", amount: 149.9, name: "Victoria Chen", email: "v.chen@royalty.com", status: "success" },
  { id: "p33", userId: "u3", amount: 49.9, name: "Darius Kingsley", email: "d.kingsley@royalty.com", status: "success" },
  { id: "p34", userId: "u4", amount: 39.9, name: "Sophia Laurent", email: "s.laurent@royalty.com", status: "processing" },
  { id: "p35", userId: "u5", amount: 89.9, name: "Elijah Montgomery", email: "e.montgomery@royalty.com", status: "success" },
  { id: "p36", userId: "u6", amount: 149.9, name: "Camille Dubois", email: "c.dubois@royalty.com", status: "success" },
];

export const latestTransactions = [
  {
    id: 1,
    title: "Order Payment",
    badge: "John Doe",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 2,
    title: "Subscription Renewal",
    badge: "Jane Smith",
    image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 850,
  },
  {
    id: 3,
    title: "Refund Processed",
    badge: "Alex Morgan",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 220,
  },
  {
    id: 4,
    title: "Bulk Order",
    badge: "Sam Wilson",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 3200,
  },
  {
    id: 5,
    title: "Order Payment",
    badge: "Chris Lee",
    image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 180,
  },
];

export const popularProducts = [
  {
    id: 1,
    name: "ANCIENT Hoodie",
    shortDescription: "Premium heavyweight hoodie.",
    price: 149.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "gray"],
    images: {
      black: "/admin/products/ANCIENT.png",
      gray: "/admin/products/ANCIENT-2.png",
    },
  },
  {
    id: 2,
    name: "Masquerade Tee",
    shortDescription: "Bold graphic tee.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/masouerade-black.png",
      white: "/admin/products/masouerade-white.png",
    },
  },
  {
    id: 3,
    name: "Sinner Pullover",
    shortDescription: "Statement pullover.",
    price: 89.9,
    sizes: ["s", "m", "l"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/sinner-tshirt.png",
      white: "/admin/products/ancient-tshirt-white.png",
    },
  },
  {
    id: 4,
    name: "Hidden in Plain Sight Tee",
    shortDescription: "Minimalist tee.",
    price: 49.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/Hidden-in-Plain Sight-1.png",
      white: "/admin/products/Hidden-in-Plain Sight-2.png",
    },
  },
  {
    id: 5,
    name: "ANCIENT T-Shirt",
    shortDescription: "Classic cotton tee.",
    price: 39.9,
    sizes: ["s", "m", "l"],
    colors: ["black", "white"],
    images: {
      black: "/admin/products/ANCIENT-tshirt.png",
      white: "/admin/products/ancient-tshirt-white.png",
    },
  },
];

import armorImg from '@/assets/products/armor.png';
import cubeImg from '@/assets/products/cube.png';
import coreImg from '@/assets/products/core.png';
import visorImg from '@/assets/products/visor.png';
import bladesImg from '@/assets/products/blades.png';

const productImageMap: Record<string, string> = {
  'stealthweave-armor': armorImg,
  'watchers-cloak': armorImg,
  'cyber-tex-overcoat': armorImg,
  'phantom-rig': armorImg,
  'legacy-data-cube': cubeImg,
  'oracle-core': coreImg,
  'aether-shield': coreImg,
  'sentinel-visor': visorImg,
  'shadow-crown-helm': visorImg,
  'valkyrie-crown': visorImg,
  'void-blades': bladesImg,
  'eclipse-band': bladesImg,
};

export function getProductImageDataUrl(id: string): string {
  if (productImageMap[id]) {
    return productImageMap[id];
  }
  return armorImg;
}
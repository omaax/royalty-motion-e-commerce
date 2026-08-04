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

  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Pure clean studio white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1000, 1000);

  // Soft studio contact shadow on floor
  const drawFloorShadow = (cx: number, cy: number, rx: number, ry: number, opacity = 0.15) => {
    ctx.save();
    const shadowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
    shadowGrad.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
    shadowGrad.addColorStop(0.5, `rgba(0, 0, 0, ${opacity * 0.4})`);
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  ctx.save();

  switch (id) {
    case 'oracle-core': {
      // 1. ORACLE CORE - Black orb sphere with central golden eye & kintsugi cracks
      drawFloorShadow(500, 850, 320, 70, 0.22);

      const cx = 500;
      const cy = 520;
      const r = 280;

      // Outer sphere body gradient
      const sphereGrad = ctx.createRadialGradient(cx - 90, cy - 100, 30, cx, cy, r);
      sphereGrad.addColorStop(0, '#3a3a3a');
      sphereGrad.addColorStop(0.4, '#1c1c1c');
      sphereGrad.addColorStop(0.85, '#0b0b0b');
      sphereGrad.addColorStop(1, '#020202');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Sphere texture segments & gold kintsugi cracks
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#e6c667';
      ctx.shadowBlur = 12;

      // Radial gold veins
      const numVeins = 8;
      for (let i = 0; i < numVeins; i++) {
        const angle = (i * Math.PI * 2) / numVeins + 0.2;
        ctx.beginPath();
        let currR = 90;
        let currA = angle;
        ctx.moveTo(cx + Math.cos(currA) * currR, cy + Math.sin(currA) * currR);

        for (let step = 0; step < 4; step++) {
          currR += 45;
          currA += (Math.sin(step + i) * 0.15);
          ctx.lineTo(cx + Math.cos(currA) * currR, cy + Math.sin(currA) * currR);
        }
        ctx.stroke();
      }

      // Dark cracked panels
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Central glowing lens eye
      const lensR = 80;
      const lensGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, lensR);
      lensGrad.addColorStop(0, '#ffffff');
      lensGrad.addColorStop(0.2, '#fef3c7');
      lensGrad.addColorStop(0.5, '#d97706');
      lensGrad.addColorStop(0.8, '#78350f');
      lensGrad.addColorStop(1, '#1c1917');

      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 25;
      ctx.fillStyle = lensGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.fill();

      // Concentric gold lens rings
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.stroke();

      break;
    }

    case 'sentinel-visor': {
      // 2. SENTINEL VISOR - Sleek black tactical visor with strap & gold side hinge
      drawFloorShadow(500, 880, 360, 60, 0.18);

      // Back elastic strap
      ctx.fillStyle = '#171717';
      ctx.beginPath();
      ctx.moveTo(180, 520);
      ctx.bezierCurveTo(220, 420, 780, 420, 820, 520);
      ctx.bezierCurveTo(780, 580, 220, 580, 180, 520);
      ctx.fill();

      // Visor Main Lens Frame
      const visorGrad = ctx.createLinearGradient(150, 400, 850, 700);
      visorGrad.addColorStop(0, '#262626');
      visorGrad.addColorStop(0.3, '#171717');
      visorGrad.addColorStop(0.7, '#0a0a0a');
      visorGrad.addColorStop(1, '#1c1c1c');

      ctx.fillStyle = visorGrad;
      ctx.beginPath();
      ctx.moveTo(140, 500);
      ctx.bezierCurveTo(140, 400, 860, 400, 860, 500);
      ctx.bezierCurveTo(860, 750, 650, 880, 500, 880);
      ctx.bezierCurveTo(350, 880, 140, 750, 140, 500);
      ctx.fill();

      // Glossy lens shine reflection
      const shineGrad = ctx.createLinearGradient(200, 420, 600, 650);
      shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      shineGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
      shineGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = shineGrad;
      ctx.beginPath();
      ctx.moveTo(180, 480);
      ctx.bezierCurveTo(250, 430, 750, 430, 820, 480);
      ctx.bezierCurveTo(800, 650, 600, 750, 500, 750);
      ctx.bezierCurveTo(400, 750, 200, 650, 180, 480);
      ctx.fill();

      // Gold Hinge Accent on Temple
      ctx.fillStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(710, 690, 18, 8, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(290, 690, 18, 8, 0.3, 0, Math.PI * 2);
      ctx.fill();

      break;
    }

    case 'void-blades': {
      // 3. VOID BLADES - Dual organic ceremonial black & gold daggers
      drawFloorShadow(500, 890, 380, 50, 0.15);

      const drawBlade = (x1: number, y1: number, x2: number, y2: number, scale = 1) => {
        ctx.save();
        ctx.translate(x1, y1);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.rotate(angle);

        // Blade Dark Metallic Body
        const bladeGrad = ctx.createLinearGradient(0, -30, 550 * scale, 30);
        bladeGrad.addColorStop(0, '#0a0a0a');
        bladeGrad.addColorStop(0.3, '#262626');
        bladeGrad.addColorStop(0.7, '#171717');
        bladeGrad.addColorStop(1, '#050505');

        ctx.fillStyle = bladeGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(150 * scale, -45 * scale, 380 * scale, -25 * scale, 550 * scale, 0);
        ctx.bezierCurveTo(380 * scale, 25 * scale, 150 * scale, 45 * scale, 0, 0);
        ctx.fill();

        // Center Gold Spine Channel
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 5 * scale;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(40 * scale, 0);
        ctx.lineTo(480 * scale, 0);
        ctx.stroke();

        // Gold Emblem Hilt Accent
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.arc(100 * scale, 0, 12 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      // Upper long blade
      drawBlade(150, 800, 820, 400, 1.1);

      // Lower parallel blade
      drawBlade(200, 890, 780, 550, 0.9);

      break;
    }

    case 'eclipse-band': {
      // 4. ECLIPSE BAND - Wide dark obsidian ring with dual gold seam lines
      drawFloorShadow(500, 840, 320, 60, 0.2);

      const cx = 500;
      const cy = 520;

      // Outer Ring Band Body
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);

      const ringGrad = ctx.createLinearGradient(-260, -180, 260, 180);
      ringGrad.addColorStop(0, '#262626');
      ringGrad.addColorStop(0.3, '#0f0f0f');
      ringGrad.addColorStop(0.7, '#262626');
      ringGrad.addColorStop(1, '#0a0a0a');

      // Outer ellipse
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 270, 190, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner Hole (Hollow)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.ellipse(0, 0, 180, 125, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';

      // Inner Gold Surface Reflection
      const innerGoldGrad = ctx.createLinearGradient(-180, -125, 180, 125);
      innerGoldGrad.addColorStop(0, '#854d0e');
      innerGoldGrad.addColorStop(0.5, '#fef08a');
      innerGoldGrad.addColorStop(1, '#713f12');

      ctx.strokeStyle = innerGoldGrad;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.ellipse(0, 0, 182, 127, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Parallel Gold Seam Lines
      ctx.strokeStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 4.5;

      ctx.beginPath();
      ctx.ellipse(0, 0, 245, 172, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 155, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      break;
    }

    case 'shadow-crown-helm': {
      // 5. SHADOW CROWN HELM - Full face dark sculpt mask with gold thorn crown
      drawFloorShadow(500, 920, 260, 50, 0.22);

      // Head / Mask Base Silhouette
      const maskGrad = ctx.createLinearGradient(300, 100, 700, 900);
      maskGrad.addColorStop(0, '#262626');
      maskGrad.addColorStop(0.4, '#121212');
      maskGrad.addColorStop(0.8, '#050505');
      maskGrad.addColorStop(1, '#171717');

      ctx.fillStyle = maskGrad;

      // Wrapped Neck & Head
      ctx.beginPath();
      ctx.moveTo(320, 920);
      ctx.lineTo(380, 680);
      ctx.bezierCurveTo(200, 500, 200, 250, 480, 100);
      ctx.bezierCurveTo(780, 100, 780, 500, 620, 680);
      ctx.lineTo(680, 920);
      ctx.closePath();
      ctx.fill();

      // Gold Fracture Veins down face
      ctx.strokeStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(480, 250);
      ctx.lineTo(420, 380);
      ctx.lineTo(520, 460);
      ctx.lineTo(380, 580);
      ctx.lineTo(460, 660);
      ctx.stroke();

      // Golden Thorn / Branch Crown on Brow
      ctx.fillStyle = '#d4af37';
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;

      // Crown Arch
      ctx.beginPath();
      ctx.moveTo(220, 340);
      ctx.quadraticCurveTo(500, 260, 760, 320);
      ctx.quadraticCurveTo(500, 320, 220, 340);
      ctx.fill();

      // Spiky thorns & leaves
      for (let x = 240; x <= 740; x += 35) {
        const height = 40 + Math.sin(x * 0.05) * 25;
        ctx.beginPath();
        ctx.moveTo(x - 12, 320);
        ctx.lineTo(x, 320 - height);
        ctx.lineTo(x + 12, 320);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      break;
    }

    case 'watchers-cloak': {
      // 6. WATCHER'S CLOAK - Black draped hooded cloak with back gold crest
      drawFloorShadow(500, 920, 340, 60, 0.2);

      // Cloak Draped Body
      const cloakGrad = ctx.createLinearGradient(200, 100, 800, 900);
      cloakGrad.addColorStop(0, '#1c1c1c');
      cloakGrad.addColorStop(0.3, '#0a0a0a');
      cloakGrad.addColorStop(0.8, '#000000');
      cloakGrad.addColorStop(1, '#171717');

      ctx.fillStyle = cloakGrad;
      ctx.beginPath();
      ctx.moveTo(340, 100);
      ctx.bezierCurveTo(450, 70, 550, 70, 660, 100);
      ctx.lineTo(850, 880);
      ctx.bezierCurveTo(650, 930, 350, 930, 150, 880);
      ctx.closePath();
      ctx.fill();

      // Fold Shadow Lines
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(340, 100); ctx.lineTo(250, 880);
      ctx.moveTo(420, 100); ctx.lineTo(380, 900);
      ctx.moveTo(580, 100); ctx.lineTo(620, 900);
      ctx.moveTo(660, 100); ctx.lineTo(750, 880);
      ctx.stroke();

      // Upper Back Mantle
      ctx.fillStyle = '#171717';
      ctx.beginPath();
      ctx.moveTo(300, 180);
      ctx.lineTo(500, 320);
      ctx.lineTo(700, 180);
      ctx.lineTo(660, 100);
      ctx.lineTo(340, 100);
      ctx.closePath();
      ctx.fill();

      // Central Gold Gothic Spine Crest
      ctx.fillStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(500, 220);
      ctx.lineTo(540, 300);
      ctx.lineTo(500, 480);
      ctx.lineTo(460, 300);
      ctx.closePath();
      ctx.fill();

      // Vertical Gold Trailing Brocade Lines
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(500, 480);
      ctx.lineTo(500, 880);
      ctx.stroke();

      break;
    }

    case 'stealthweave-armor': {
      // 7. STEALTHWEAVE ARMOR - Black anatomical armored torso mannequin with gold pinstripes
      drawFloorShadow(500, 920, 280, 50, 0.22);

      // Torso / Suit Base
      const armorGrad = ctx.createLinearGradient(200, 100, 800, 900);
      armorGrad.addColorStop(0, '#262626');
      armorGrad.addColorStop(0.3, '#121212');
      armorGrad.addColorStop(0.8, '#050505');
      armorGrad.addColorStop(1, '#171717');

      ctx.fillStyle = armorGrad;

      // Torso outline
      ctx.beginPath();
      ctx.moveTo(400, 80);
      ctx.lineTo(600, 80);
      ctx.lineTo(820, 260);
      ctx.lineTo(720, 890);
      ctx.lineTo(280, 890);
      ctx.lineTo(180, 260);
      ctx.closePath();
      ctx.fill();

      // Pectoral & Abdominal Muscle Plates
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      ctx.beginPath();
      // Pecs
      ctx.moveTo(500, 180); ctx.lineTo(500, 520);
      ctx.moveTo(250, 320); ctx.quadraticCurveTo(500, 420, 750, 320);
      // Abs
      ctx.moveTo(350, 520); ctx.lineTo(650, 520);
      ctx.moveTo(360, 620); ctx.lineTo(640, 620);
      ctx.moveTo(380, 720); ctx.lineTo(620, 720);
      ctx.stroke();

      // Precision Gold Seam Lines
      ctx.strokeStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3.5;

      ctx.beginPath();
      ctx.moveTo(500, 100); ctx.lineTo(500, 500);
      ctx.moveTo(280, 280); ctx.lineTo(480, 220);
      ctx.moveTo(720, 280); ctx.lineTo(520, 220);
      ctx.moveTo(300, 450); ctx.lineTo(480, 380);
      ctx.moveTo(700, 450); ctx.lineTo(520, 380);
      ctx.stroke();

      break;
    }

    case 'legacy-data-cube': {
      // 8. LEGACY DATA CUBE - Isometric 3D obsidian cube with gold kintsugi cracks
      drawFloorShadow(500, 880, 300, 60, 0.22);

      const cx = 500;
      const cy = 500;
      const size = 260;

      // Isometric Top Facet
      const topGrad = ctx.createLinearGradient(cx - size, cy - size, cx + size, cy);
      topGrad.addColorStop(0, '#3a3a3a');
      topGrad.addColorStop(1, '#1c1c1c');

      ctx.fillStyle = topGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx + size * 0.9, cy - size * 0.5);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx - size * 0.9, cy - size * 0.5);
      ctx.closePath();
      ctx.fill();

      // Left Facet
      const leftGrad = ctx.createLinearGradient(cx - size, cy, cx, cy + size);
      leftGrad.addColorStop(0, '#171717');
      leftGrad.addColorStop(1, '#050505');

      ctx.fillStyle = leftGrad;
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.9, cy - size * 0.5);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + size);
      ctx.lineTo(cx - size * 0.9, cy + size * 0.5);
      ctx.closePath();
      ctx.fill();

      // Right Facet
      const rightGrad = ctx.createLinearGradient(cx, cy, cx + size, cy + size);
      rightGrad.addColorStop(0, '#262626');
      rightGrad.addColorStop(1, '#0f0f0f');

      ctx.fillStyle = rightGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + size * 0.9, cy - size * 0.5);
      ctx.lineTo(cx + size * 0.9, cy + size * 0.5);
      ctx.lineTo(cx, cy + size);
      ctx.closePath();
      ctx.fill();

      // Gold Kintsugi Fractures across cube
      ctx.strokeStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 4;

      // Cube edges
      ctx.beginPath();
      ctx.moveTo(cx, cy - size); ctx.lineTo(cx, cy + size);
      ctx.moveTo(cx - size * 0.9, cy - size * 0.5); ctx.lineTo(cx, cy);
      ctx.moveTo(cx + size * 0.9, cy - size * 0.5); ctx.lineTo(cx, cy);
      ctx.stroke();

      // Facet cracks
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy - 80); ctx.lineTo(cx - 40, cy + 120);
      ctx.moveTo(cx + 80, cy - 60); ctx.lineTo(cx + 140, cy + 80);
      ctx.moveTo(cx - 80, cy - 180); ctx.lineTo(cx + 60, cy - 140);
      ctx.stroke();

      break;
    }

    default: {
      // Stylized default luxury product render
      drawFloorShadow(500, 850, 300, 60, 0.18);

      const grad = ctx.createRadialGradient(400, 400, 50, 500, 500, 300);
      grad.addColorStop(0, '#262626');
      grad.addColorStop(1, '#050505');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(500, 500, 260, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.stroke();
      break;
    }
  }

  ctx.restore();

  const dataUrl = canvas.toDataURL('image/png');
  productCache[id] = dataUrl;
  return dataUrl;
}

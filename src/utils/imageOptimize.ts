function deriveWebpPaths(pngUrl: string): { webpSrc: string; webpSrcSet: string } | null {
  const productMatch = pngUrl.match(/\/assets\/products\/(.+)\.png$/);
  if (productMatch) {
    const baseName = productMatch[1];
    const basePath = pngUrl.replace(/\/assets\/products\/.+\.png$/, '/assets/products/webp');
    return {
      webpSrc: `${basePath}/${baseName}-400w.webp`,
      webpSrcSet: `${basePath}/${baseName}-400w.webp 400w, ${basePath}/${baseName}-800w.webp 800w`,
    };
  }

  const assetMatch = pngUrl.match(/\/assets\/([^/]+)\.png$/);
  if (assetMatch) {
    const baseName = assetMatch[1];
    const basePath = pngUrl.replace(/\/assets\/[^/]+\.png$/, '/assets/webp');
    if (baseName === 'honor-logo') {
      return {
        webpSrc: `${basePath}/${baseName}-800w.webp`,
        webpSrcSet: `${basePath}/${baseName}-400w.webp 400w, ${basePath}/${baseName}-800w.webp 800w`,
      };
    }
    return {
      webpSrc: `${basePath}/${baseName}-560w.webp`,
      webpSrcSet: `${basePath}/${baseName}-280w.webp 280w, ${basePath}/${baseName}-560w.webp 560w`,
    };
  }

  return null;
}

export function getOptimizedImage(pngUrl: string): { webpSrc: string; webpSrcSet: string } | null {
  return deriveWebpPaths(pngUrl);
}

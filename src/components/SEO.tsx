import { Helmet } from 'react-helmet-async';
import { APP_NAME, APP_TAGLINE } from '../constants/branding';

const SITE_URL = 'https://royalty.example/motion-e-commerce';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  product?: {
    name: string;
    price: number;
    image: string;
    description?: string;
  };
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image = `${SITE_URL}/og-image.png`,
  type = 'website',
  product,
}) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — ${APP_TAGLINE}`;
  const metaDescription = description || `${APP_NAME} — ${APP_TAGLINE}. Discover cutting-edge streetwear, limited edition drops, and avant-garde accessories designed for the next generation.`;
  const pageUrl = canonical || SITE_URL;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: `${APP_NAME} — ${APP_TAGLINE}`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: APP_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/shop?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={APP_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* Product-specific */}
      {product && (
        <>
          <meta property="og:type" content="product" />
          <meta property="product:price:amount" content={product.price.toString()} />
          <meta property="product:price:currency" content="USD" />
        </>
      )}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
};

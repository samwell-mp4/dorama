import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaJson = null
}) {
  const siteName = 'Doramas Dublados';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Streaming de Doramas e Séries Dubladas`;
  const defaultDesc = 'Assista aos melhores doramas dublados em português, mini-dramas e séries exclusivas com qualidade cinematográfica.';
  const metaDesc = description || defaultDesc;
  const currentCanonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://doramasdublados.online');
  const defaultImage = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80';
  const image = ogImage || defaultImage;

  return (
    <Helmet>
      {/* Title e Metadados Básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={currentCanonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentCanonical} />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD Estruturado */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
}

/**
 * Utilitário para gerar Schema JSON-LD de Séries
 */
export function buildSeriesSchema(media, url) {
  if (!media) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": media.title,
    "description": media.synopsis,
    "image": media.poster,
    "numberOfEpisodes": media.chapterCount,
    "inLanguage": "pt-BR",
    "url": url,
    "aggregateRating": media.rating ? {
      "@type": "AggregateRating",
      "ratingValue": media.rating,
      "bestRating": "10",
      "worstRating": "1",
      "ratingCount": "154"
    } : undefined
  };
}

/**
 * Utilitário para gerar Schema JSON-LD de Episódios
 */
export function buildEpisodeSchema(media, episodeNum, url) {
  if (!media) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": `${media.title} — Episódio ${episodeNum}`,
    "episodeNumber": episodeNum,
    "partOfSeries": {
      "@type": "TVSeries",
      "name": media.title
    },
    "image": media.poster,
    "url": url
  };
}

/**
 * Schema para Breadcrumbs
 */
export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

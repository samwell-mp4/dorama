import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1/reelshort';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
});

// Cache em memória para buscas rápidas
const memoryCache = new Map();

export const api = {
  // Step 1: Search com cache
  searchDrama: async (keywords) => {
    const key = `search_${keywords.toLowerCase().trim()}`;
    if (memoryCache.has(key)) {
      return memoryCache.get(key);
    }
    const response = await apiClient.get(`/search`, { params: { keywords } });
    memoryCache.set(key, response.data);
    return response.data;
  },
  
  // Get Bookshelves
  getBookshelves: async () => {
    const key = 'bookshelves';
    if (memoryCache.has(key)) {
      return memoryCache.get(key);
    }
    const response = await apiClient.get(`/bookshelves`);
    memoryCache.set(key, response.data);
    return response.data;
  },

  // Step 2: Get Episodes
  getEpisodes: async (bookId, filteredTitle) => {
    const key = `episodes_${bookId}_${filteredTitle}`;
    if (memoryCache.has(key)) {
      return memoryCache.get(key);
    }
    const response = await apiClient.get(`/episodes/${bookId}`, {
      params: { filtered_title: filteredTitle }
    });
    memoryCache.set(key, response.data);
    return response.data;
  },

  // Step 3: Get Video URL
  getVideo: async (bookId, episodeNum, filteredTitle, chapterId) => {
    const response = await apiClient.get(`/video/${bookId}/${episodeNum}`, {
      params: {
        filtered_title: filteredTitle,
        chapter_id: chapterId
      }
    });
    return response.data;
  },

  // Catálogo Amplo Multi-Termos (Retorna dezenas de séries reais deduplicadas)
  getFullCatalog: async () => {
    const cacheKey = 'full_catalog_aggregated';
    if (memoryCache.has(cacheKey)) {
      return memoryCache.get(cacheKey);
    }

    const keywords = [
      'amor', 'ceo', 'vingança', 'casamento', 'chefe', 
      'drama', 'rico', 'paixao', 'herdeiro', 'secreto',
      'marido', 'esposa', 'bilionario'
    ];

    const aggregated = new Map();

    // 1. Puxar livros das estantes primeiro
    try {
      const shelvesData = await api.getBookshelves();
      if (shelvesData?.bookshelves) {
        shelvesData.bookshelves.forEach(shelf => {
          (shelf.books || []).forEach(b => {
            if (b?.book_id && (b.chapter_count || 0) > 0) {
              aggregated.set(String(b.book_id), b);
            }
          });
        });
      }
    } catch (e) {
      console.warn('Erro ao agregar estantes:', e);
    }

    // 2. Puxar buscas em paralelo (em lotes para não sobrecarregar a API)
    const batchPromises = keywords.map(async (kw) => {
      try {
        const res = await api.searchDrama(kw);
        (res?.results || []).forEach(b => {
          if (b?.book_id && (b.chapter_count || 0) > 0) {
            aggregated.set(String(b.book_id), b);
          }
        });
      } catch (err) {
        // silencioso
      }
    });

    await Promise.allSettled(batchPromises);

    const resultList = Array.from(aggregated.values());
    memoryCache.set(cacheKey, resultList);
    return resultList;
  }
};

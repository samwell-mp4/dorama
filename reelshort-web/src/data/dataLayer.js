/**
 * Data Layer & Media Validation Engine
 * Centraliza normalização, validação de disponibilidade e regras de negócio.
 */

const IS_DEV = import.meta.env?.DEV;

// Blacklist de IDs de séries que não possuem episódios ativos na API oficial
const SEED_UNAVAILABLE_IDS = [
  '6940cedcaae90fa706016ea6', // O amor é uma dança perigosa
  '6a71c6465712485e300679a2', // Você Foi Substituído, Primeiro Amor
  '69a81f75f5eeb01aaa026074', // Amor Traído
  '6853e0137702e68651063011', // Amor Inacessível
  '688c37a6e7b40d9b9e03e947', // Amor Além do CEO
  '6a97e0ebf08a1a4c190e7e7d', // O Chefe da Máfia Domina o Instituto
  '6a42343d0a4c032682026d8e', // A Traição da Noiva, O Inferno de Dante
  '6a8c3b2adb670706480599d2', // Eu Comando o Harém dos Ermos
  '6a50c58c0c5ed0d1f001de68', // Sai da Frente! A Rainha da Máfia Renasceu
  '6a7acf20595aa5588b05ffd7', // O Novo CEO É Meu Ginecologista
  '6a97e18db5672dd9e508e729', // Grávida do Meu Rígido CEO Pai
  '6836adfe8d3cf19d21097398', // A Vingança da Esposa CEO
  '6a9e8e7c598656220b02d446', // Você Não Pode Parar Minha Super Visão de Raio-X
  '6a4dbeeb3e58d2e18a050a37', // Minha Visão de Raio-X Vê Bem Através de Você
  '6a9ab32b30e7d830c1072bd2'  // Casamento Relâmpago com o Bilionário Indomável
];

const STORAGE_UNAVAILABLE_KEY = 'doramas_unavailable_ids_v1';

export function getUnavailableIds() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_UNAVAILABLE_KEY) : null;
    const custom = raw ? JSON.parse(raw) : [];
    return new Set([...SEED_UNAVAILABLE_IDS, ...custom]);
  } catch (e) {
    return new Set(SEED_UNAVAILABLE_IDS);
  }
}

export function addUnavailableId(id) {
  if (!id || typeof window === 'undefined') return;
  try {
    const cleanId = String(id).trim();
    const raw = localStorage.getItem(STORAGE_UNAVAILABLE_KEY);
    const custom = raw ? JSON.parse(raw) : [];
    if (!custom.includes(cleanId)) {
      custom.push(cleanId);
      localStorage.setItem(STORAGE_UNAVAILABLE_KEY, JSON.stringify(custom));
    }
  } catch (e) {
    console.error('Error adding unavailable id:', e);
  }
}

/**
 * Validação centralizada de disponibilidade de conteúdo.
 * REGRA CRÍTICA: Séries com 0 episódios ou sem episódios válidos NUNCA são exibidas.
 */
export function isContentAvailable(content) {
  if (!content) return false;

  const id = content.book_id || content.id;
  const title = content.book_title || content.title;
  const poster = content.book_pic || content.poster;

  if (!id || !title) {
    if (IS_DEV) {
      console.warn('[MediaValidation] Item ignored: Missing ID or Title', content);
    }
    return false;
  }

  // Filtrar títulos sem episódios da blacklist
  const unavailableSet = getUnavailableIds();
  if (unavailableSet.has(String(id))) {
    if (IS_DEV) {
      console.warn(`[MediaValidation] Series filtered (phantom blacklist): "${title}" (ID: ${id})`);
    }
    return false;
  }

  // Identificar tipo (padrão: series para mini-dramas da ReelShort)
  const type = content.type || 'series';

  if (type === 'series' || type === 'tv') {
    // Validação de contagem de capítulos
    const chapterCount = Number(content.chapter_count ?? content.chapterCount ?? 0);
    const episodes = content.episodes;

    // Se temos array de episódios, deve conter ao menos 1
    if (Array.isArray(episodes) && episodes.length === 0) {
      if (IS_DEV) {
        console.warn(`[MediaValidation] Series ignored (0 episodes array): "${title}" (ID: ${id})`);
      }
      return false;
    }

    // Se não temos array de episódios, checar chapterCount
    if (!episodes && chapterCount <= 0) {
      if (IS_DEV) {
        console.warn(`[MediaValidation] Series ignored (chapter_count <= 0): "${title}" (ID: ${id})`);
      }
      return false;
    }
  } else if (type === 'movie') {
    // Para filmes, verificar se possui dados essenciais
    if (!poster) {
      if (IS_DEV) {
        console.warn(`[MediaValidation] Movie ignored (no poster): "${title}" (ID: ${id})`);
      }
      return false;
    }
  }

  return true;
}

/**
 * Filtra uma lista de conteúdos aplicando a validação estrita.
 */
export function filterAvailableContent(list) {
  if (!Array.isArray(list)) return [];
  return list.filter(isContentAvailable);
}

/**
 * Gera um slug amigável e limpo para SEO.
 * Exemplo: "Amor Proibido", "654321" -> "amor-proibido--654321"
 */
export function generateSlug(title, id) {
  if (!title) return String(id || 'conteudo');
  
  const cleanTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return id ? `${cleanTitle}--${id}` : cleanTitle;
}

/**
 * Extrai o ID e o título limpo de um slug.
 */
export function parseSlug(slug) {
  if (!slug) return { id: null, title: '' };
  
  const parts = slug.split('--');
  if (parts.length > 1) {
    const id = parts[parts.length - 1];
    const cleanTitle = parts.slice(0, parts.length - 1).join('--').replace(/-/g, ' ');
    return { id, title: cleanTitle };
  }

  return { id: slug, title: slug.replace(/-/g, ' ') };
}

/**
 * Normaliza objetos de mídias de diferentes formatos da API para um modelo padronizado.
 */
export function normalizeMedia(raw, type = 'series') {
  if (!raw) return null;

  const id = String(raw.book_id || raw.id || '');
  const title = raw.book_title || raw.title || 'Sem título';
  const originalTitle = raw.original_title || raw.book_title || title;
  const filteredTitle = raw.filtered_title || generateSlug(title);
  const poster = raw.book_pic || raw.poster || '';
  const backdrop = raw.backdrop || poster; // Fallback elegante
  const chapterCount = Number(raw.chapter_count || raw.chapterCount || raw.episodes?.length || 0);

  return {
    id,
    title,
    originalTitle,
    filteredTitle,
    slug: generateSlug(title, id),
    type,
    poster,
    backdrop,
    chapterCount,
    genres: raw.genres || ['Drama', 'Romance'],
    rating: raw.rating || 8.9,
    year: raw.year || 2024,
    synopsis: raw.special_desc || raw.synopsis || raw.desc || 'Acompanhe os episódios completos desta produção dramática com reviravoltas intensas e histórias envolventes.',
    director: raw.director || 'Direção Exclusiva',
    cast: raw.cast || ['Elenco Principal'],
    episodes: raw.episodes || []
  };
}

/* =========================================================
   CONTINUAR ASSISTINDO & HISTÓRICO (LocalStorage)
========================================================= */

const STORAGE_HISTORY_KEY = 'dramaflix_continue_watching_v1';
const STORAGE_FAVORITES_KEY = 'dramaflix_my_list_v1';

export function getContinueWatching() {
  try {
    const saved = localStorage.getItem(STORAGE_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error reading continue watching history:', e);
    return [];
  }
}

export function saveContinueWatching(item) {
  try {
    if (!item || !item.id) return;
    const history = getContinueWatching();
    
    // Remover duplicatas anteriores
    const filtered = history.filter(h => h.id !== item.id);
    
    // Adicionar no topo
    const updated = [
      {
        id: item.id,
        title: item.title,
        slug: item.slug || generateSlug(item.title, item.id),
        filteredTitle: item.filteredTitle,
        poster: item.poster,
        episodeNum: item.episodeNum || 1,
        chapterId: item.chapterId || '',
        season: item.season || 1,
        timestamp: item.timestamp || 0,
        duration: item.duration || 0,
        percentage: Math.min(100, Math.max(0, Math.round(item.percentage || 0))),
        updatedAt: Date.now()
      },
      ...filtered
    ].slice(0, 20); // Guardar até 20 itens mais recentes

    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving continue watching history:', e);
  }
}

export function getMyList() {
  try {
    const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function toggleMyList(media) {
  try {
    if (!media || !media.id) return false;
    const list = getMyList();
    const index = list.findIndex(m => m.id === media.id);
    
    let updated;
    let isAdded = false;
    if (index >= 0) {
      updated = list.filter(m => m.id !== media.id);
      isAdded = false;
    } else {
      updated = [
        {
          id: media.id,
          title: media.title,
          slug: media.slug || generateSlug(media.title, media.id),
          poster: media.poster,
          chapterCount: media.chapterCount,
          addedAt: Date.now()
        },
        ...list
      ];
      isAdded = true;
    }
    
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(updated));
    return isAdded;
  } catch (e) {
    console.error('Error toggling my list:', e);
    return false;
  }
}

export function isInMyList(id) {
  if (!id) return false;
  const list = getMyList();
  return list.some(m => m.id === String(id));
}

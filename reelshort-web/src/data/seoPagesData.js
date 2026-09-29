/**
 * Base de Dados Completa de SEO Programático - Doramas Dublados
 * Mapeamento exato das palavras-chave de maior volume no Semrush Brasil (> 2.000.000 buscas/mês)
 * Cobre termos de alta intenção transacional e informacional:
 * - dorama assistir online, dorama online site, doramas online, dorama sites
 * - dorama online gratis, doramas online site, dorama assistir online dublado
 * - doramas online de graça, kdrama online, dorama dublado assistir online
 * - assistir doramas gratis, doramas mais assistidos, dorama novo, doramas love
 * - doramas netflix, meu dorama, doramas de romance, ceo, vingança, etc.
 */

export const SEO_HUBS = {
  // =========================================================================
  // 1. TERMOS DA CONSULTA SEMRUSH (IMAGEM 4 - CHECKBOXES DO USUÁRIO)
  // =========================================================================
  'dorama-assistir-online': {
    slug: 'dorama-assistir-online',
    searchTerm: 'amor',
    navLabel: 'Dorama Assistir Online',
    h1: 'Dorama Assistir Online Dublado em Português Grátis',
    metaTitle: 'Dorama Assistir Online — Novelas Asiáticas Grátis em HD',
    metaDescription: 'Dorama assistir online grátis com dublagem em português! Acesse os melhores capítulos de novelas asiáticas e mini-dramas sem mensalidade e em alta definição.',
    badge: '100% GRÁTIS • STREAMING HD',
    lead: 'Assista a doramas online diretamente no seu navegador. Episódios rápidos, dublados em português e liberados para maratonar sem parar.',
    editorialTitle: 'Como Funciona o Dorama Assistir Online no Brasil?',
    editorialText: `Procurando dorama para assistir online sem complicações? O Doramas Dublados reúne produções asiáticas consagradas e mini-dramas verticais rápidos com áudio 100% em português brasileiro. Diferente de plataformas que cobram assinaturas caras ou exigem cadastros burocráticos, nosso serviço é sustentado por publicidade digital, permitindo que você assista a qualquer episódio instantaneamente no seu celular, tablet, Smart TV ou computador.`,
    targetKeywords: ['dorama assistir online', 'assistir dorama online', 'dorama online assistir', 'assistir dorama', 'ver dorama online'],
    faqs: [
      {
        question: 'Preciso pagar para assistir dorama online aqui?',
        answer: 'Não! Todo o catálogo é 100% gratuito e livre para você maratonar sem precisar cadastrar cartão de crédito.'
      },
      {
        question: 'Os episódios possuem áudio dublado em português?',
        answer: 'Sim, todas as séries contam com dublagem completa em português (PT-BR) com vozes profissionais.'
      },
      {
        question: 'O site funciona no celular Android e iPhone?',
        answer: 'Sim, o player foi desenvolvido para se adaptar perfeitamente a telas de celulares e tablets com carregamento veloz.'
      }
    ]
  },

  'dorama-online-site': {
    slug: 'dorama-online-site',
    searchTerm: 'casamento',
    navLabel: 'Dorama Online Site',
    h1: 'Dorama Online Site Oficial — Streaming de Novelas Asiáticas',
    metaTitle: 'Dorama Online Site Oficial — Assistir Séries Dubladas Grátis',
    metaDescription: 'O melhor dorama online site do Brasil! Plataforma rápida, responsiva e 100% gratuita para assistir séries asiáticas completas e dubladas em HD.',
    badge: 'SITE OFICIAL • SEM ASSINATURA',
    lead: 'Seu portal definitivo de doramas online. Uma biblioteca organizada com histórias de amor, intrigas corporativas e vinganças envolventes.',
    editorialTitle: 'O Melhor Dorama Online Site Para Fãs de Novelas Asiáticas',
    editorialText: `Encontrar um bom dorama online site que não trave e não empesteie sua tela com pop-ups maliciosos é o maior desejo de quem ama dramas asiáticos. O Doramas Dublados foi projetado com tecnologia moderna de streaming com CDN distribuída, garantindo que os episódios carreguem sem engasgos mesmo em conexões móveis. Nosso catálogo é atualizado diariamente com novos lançamentos e capítulos completos.`,
    targetKeywords: ['dorama online site', 'site de dorama online', 'dorama site online', 'assistir dorama site', 'portal de dorama'],
    faqs: [
      {
        question: 'O que diferencia este dorama online site de outros na web?',
        answer: 'Oferecemos catálogo totalmente dublado em português, player vertical moderno, carregamento ultrarrápido e livre acesso sem cobrar mensalidade.'
      },
      {
        question: 'Posso salvar meus doramas favoritos no site?',
        answer: 'Sim! Utilize a função "Minha Lista" para marcar suas séries favoritas e continuar de onde parou a qualquer momento.'
      }
    ]
  },

  'doramas-online': {
    slug: 'doramas-online',
    searchTerm: 'drama',
    navLabel: 'Doramas Online',
    h1: 'Doramas Online — Assista a Séries e Novelas Grátis em Full HD',
    metaTitle: 'Doramas Online — Melhores Séries e Dramas Asiáticos Dublados',
    metaDescription: 'Assista a doramas online grátis em alta definição! Catálogo repleto de mini-dramas, romances arrebatadores, vinganças e histórias de CEO dubladas.',
    badge: 'DORAMAS ONLINE • FULL HD',
    lead: 'Explore centenas de títulos de doramas online. Da comédia romântica mais fofa aos dramas de suspense e casamento por conveniência.',
    editorialTitle: 'Por Que Assistir Doramas Online Virou Paixão Nacional?',
    editorialText: `O público brasileiro se apaixonou pelas novelas asiáticas pela qualidade impecável das produções, química inigualável entre os casais e roteiros que não enrolam. No Doramas Dublados, trazemos o que há de melhor no formato tradicional e nos novos mini-dramas dinâmicos: episódios que vão direto ao ponto, com reviravoltas intensas a cada minuto e resolução Full HD sem cobranças surpresa.`,
    targetKeywords: ['doramas online', 'dorama online', 'assistir doramas online', 'ver doramas online', 'doramas online dublado'],
    faqs: [
      {
        question: 'Quantos episódios tem cada dorama online?',
        answer: 'O número de episódios varia de acordo com o título: nossos mini-dramas possuem entre 60 e 120 episódios curtos e ágeis de 1 a 2 minutos cada.'
      },
      {
        question: 'Existe limite diário de episódios para assistir?',
        answer: 'Nenhum limite! Você pode maratonar séries completas do primeiro ao último episódio no mesmo dia.'
      }
    ]
  },

  'dorama-sites': {
    slug: 'dorama-sites',
    searchTerm: 'rico',
    navLabel: 'Dorama Sites',
    h1: 'Melhores Dorama Sites — Guia e Plataforma de Streaming Grátis',
    metaTitle: 'Dorama Sites — Qual o Melhor Site para Assistir Doramas Grátis?',
    metaDescription: 'Cansado de dorama sites com anúncios invasivos ou cobranças? Conheça a melhor plataforma brasileira para maratonar novelas asiáticas dubladas de graça.',
    badge: 'GUIA DE SITES • AVALIAÇÃO',
    lead: 'Descubra por que este é o site número 1 de doramas no Brasil e confira como aproveitar a melhor experiência de streaming gratuito.',
    editorialTitle: 'Comparando Dorama Sites: O Que Torna Nossa Plataforma Superior?',
    editorialText: `Ao pesquisar por "dorama sites" na internet, muitos usuários se deparam com sites antigos, cheios de links quebrados ou exigindo assinaturas internacionais caras em dólar. O Doramas Dublados nasceu para entregar uma experiência premium equivalente a streamings internacionais, porém totalmente aberto ao público brasileiro. Com design moderno, navegação intuitiva e dublagens profissionais, somos o destino favorito dos dorameiros.`,
    targetKeywords: ['dorama sites', 'sites de doramas', 'dorama site gratis', 'sites para assistir doramas', 'melhores sites de doramas'],
    faqs: [
      {
        question: 'Este site é seguro para navegar?',
        answer: 'Sim, nossa plataforma utiliza conexões criptografadas HTTPS, respeita os padrões de segurança do Google e é monitorada continuamente.'
      },
      {
        question: 'Preciso instalar algum reprodutor ou extensão?',
        answer: 'Não, o vídeo roda direto no seu navegador com player HTML5 nativo compatível com Chrome, Safari, Edge e Firefox.'
      }
    ]
  },

  'dorama-online-gratis': {
    slug: 'dorama-online-gratis',
    searchTerm: 'bilionario',
    navLabel: 'Dorama Online Grátis',
    h1: 'Dorama Online Grátis — Streaming Sem Mensalidade e Sem Cadastro',
    metaTitle: 'Dorama Online Grátis — Assista a Capítulos Completos em HD',
    metaDescription: 'Assistir dorama online grátis agora mesmo! Todos os capítulos liberados com dublagem profissional em português. Sem assinatura e sem burocracia.',
    badge: '100% DE GRAÇA • SEM CARTÃO',
    lead: 'Tudo liberado: assista a doramas online grátis sem precisar assinar nada. De romances com CEOs a superações de famílias nobres.',
    editorialTitle: 'Assista a Dorama Online Grátis Sem Assinatura Nem Cartão',
    editorialText: `A maioria dos serviços de streaming exige planos mensais que aumentam a cada ano. Nossa missão é democratizar as melhores novelas asiáticas no Brasil: oferecemos dorama online grátis financiado por anúncios parceiros. Você não precisa nem informar cartão de crédito ou criar conta se não quiser. Basta acessar, escolher a série e dar play imediatamente.`,
    targetKeywords: ['dorama online gratis', 'dorama online grátis', 'doramas online gratis', 'assistir dorama online gratis', 'dorama gratis online'],
    faqs: [
      {
        question: 'Por que o serviço é grátis?',
        answer: 'O site é monetizado através de anúncios exibidos na página, permitindo cobrir os custos de servidores sem cobrar mensalidade dos espectadores.'
      },
      {
        question: 'O áudio é em português do Brasil?',
        answer: 'Sim! Todas as produções possuem dublagem profissional em português com excelente sincronia.'
      }
    ]
  },

  'doramas-online-site': {
    slug: 'doramas-online-site',
    searchTerm: 'chefe',
    navLabel: 'Doramas Online Site',
    h1: 'Doramas Online Site — O Maior Catálogo de Séries Asiáticas',
    metaTitle: 'Doramas Online Site — Séries e Mini-Dramas Dublados em Português',
    metaDescription: 'Procurando doramas online site? Acesse centenas de produções dramáticas, comédias românticas e histórias intensas dubladas em português do Brasil.',
    badge: 'CATÁLOGO BRASILEIRO • COMPLETO',
    lead: 'Seu ponto de encontro para descobrir doramas online com os atores e atrizes mais talentosos da Ásia.',
    editorialTitle: 'O Doramas Online Site Mais Completo em Português',
    editorialText: `Se você estava à procura de um "doramas online site" com organização impecável por categorias (Romance, CEO, Vingança, Casamento por Contrato, Dramas Históricos), encontrou seu novo cantinho favorito. Nosso acervo passa por uma curadoria constante para garantir episódios em alta definição, sem travamento de vídeo e com dublagem fluida que agrada tanto a quem já é dorameiro veterano quanto aos novatos no gênero.`,
    targetKeywords: ['doramas online site', 'site doramas online', 'portal doramas online', 'assistir doramas online site'],
    faqs: [
      {
        question: 'Posso assistir no trabalho ou transporte público?',
        answer: 'Sim! Os episódios curtos são perfeitos para pausas de café, almoço ou viagens de ônibus e metrô.'
      }
    ]
  },

  'dorama-assistir-online-dublado': {
    slug: 'dorama-assistir-online-dublado',
    searchTerm: 'marido',
    navLabel: 'Dorama Assistir Online Dublado',
    h1: 'Dorama Assistir Online Dublado — Episódios Completos em PT-BR',
    metaTitle: 'Dorama Assistir Online Dublado — Novelas em Português Grátis',
    metaDescription: 'Dorama assistir online dublado em português! Aproveite áudio nítido, elenco de dublagem profissional e transmissão sem travamentos no seu celular ou PC.',
    badge: 'DUBLAGEM PROFISSIONAL • PT-BR',
    lead: 'Não se preocupe em ler legendas enquanto assiste. Desfrute de áudio dublado e atuações intensas do começo ao fim.',
    editorialTitle: 'A Comodidade de Dorama Assistir Online Dublado',
    editorialText: `Muitas pessoas deixavam de assistir novelas asiáticas por cansaço visual de ler legendas rápidas ou por preferirem ouvir enquanto fazem tarefas do dia a dia. Com o dorama assistir online dublado, você não perde nenhum detalhe visual da cinematografia, dos olhares dos atores ou dos cenários luxuosos. Nossa dublagem em português brasileiro foi gravada com estúdios e vozes que transmitem toda a emoção do texto original.`,
    targetKeywords: ['dorama assistir online dublado', 'assistir dorama online dublado', 'dorama online dublado assistir', 'dorama dublado online', 'assistir dorama dublado'],
    faqs: [
      {
        question: 'As vozes são de atores profissionais?',
        answer: 'Sim! As dublagens contam com dubladores experientes que adaptam piadas, gírias e tons emocionais para o português brasileiro com naturalidade.'
      }
    ]
  },

  'doramas-online-de-graca': {
    slug: 'doramas-online-de-graca',
    searchTerm: 'esposa',
    navLabel: 'Doramas Online de Graça',
    h1: 'Doramas Online de Graça — Novelas e Séries Sem Pagar Nada',
    metaTitle: 'Doramas Online de Graça — 100% Liberado Sem Mensalidade',
    metaDescription: 'Assista a doramas online de graça! Plataforma mantida por anúncios para que você possa curtir todos os episódios sem cartão de crédito ou assinatura.',
    badge: '100% DE GRAÇA • SEM MENSALIDADE',
    lead: 'Curta suas séries favoritas sem gastar nenhum centavo. Tudo aberto para maratonar à vontade.',
    editorialTitle: 'O Prazer de Assistir Doramas Online de Graça Sem Surpresas',
    editorialText: `Muitos serviços prometem "teste grátis", mas exigem colocar número de cartão e cobram taxas inesperadas após poucos dias. No Doramas Dublados, nossa filosofia é transparente: o site é doramas online de graça do primeiro ao último episódio. Graças à publicidade não invasiva, mantemos os servidores ativos e garantimos que todo fã brasileiro de K-dramas e C-dramas possa assistir quando quiser.`,
    targetKeywords: ['doramas online de graça', 'doramas online de graca', 'doramas gratis online', 'assistir doramas de graça', 'ver doramas de graça'],
    faqs: [
      {
        question: 'Existe algum plano pago escondido no site?',
        answer: 'Não! Removemos qualquer plano de assinatura de 5 reais: 100% dos títulos e episódios são liberados gratuitamente para todos.'
      }
    ]
  },

  'kdrama-online': {
    slug: 'kdrama-online',
    searchTerm: 'coreano',
    navLabel: 'K-Drama Online',
    h1: 'K-Drama Online — Séries Coreanas Dubladas em Português',
    metaTitle: 'K-Drama Online — Melhores Séries Coreanas Dubladas em HD',
    metaDescription: 'Assista ao melhor do K-Drama online! Séries coreanas dubladas em português, comédias românticas, thrillers e produções emocionantes sem pagar nada.',
    badge: 'K-DRAMAS • COREIA DO SUL',
    lead: 'A onda Hallyu chegou para ficar. Assista aos K-Dramas online mais famosos do mundo dublados com qualidade de cinema.',
    editorialTitle: 'O Fenômeno Mundial do K-Drama Online no Brasil',
    editorialText: `As séries coreanas conquistaram o coração dos brasileiros graças a narrativas inovadoras, trilhas sonoras orquestradas (OSTs) e protagonistas apaixonantes. No nosso portal de K-Drama online, você encontra produções inspiradas nas maiores fórmulas coreanas: romances de herdeiros chaebol, reencontros do destino, viagens no tempo e comédias românticas que arrancam suspiros.`,
    targetKeywords: ['kdrama online', 'k-drama online', 'kdramas online', 'assistir kdrama online', 'kdrama dublado', 'dramas coreanos online'],
    faqs: [
      {
        question: 'O que diferencia um K-Drama de uma série tradicional?',
        answer: 'Os K-dramas costumam focar no desenvolvimento profundo dos relacionamentos, valorizam sentimentos familiares e possuem estética cinematográfica rica.'
      }
    ]
  },

  'dorama-dublado-assistir-online': {
    slug: 'dorama-dublado-assistir-online',
    searchTerm: 'vingança',
    navLabel: 'Dorama Dublado Assistir Online',
    h1: 'Dorama Dublado Assistir Online — Capítulos Rápidos em Alta Resolução',
    metaTitle: 'Dorama Dublado Assistir Online — Streaming Completo em HD',
    metaDescription: 'Encontre seu dorama dublado para assistir online hoje! Episódios curtos e viciantes com áudio em português, sem necessidade de baixar aplicativos pesados.',
    badge: 'HD RÁPIDO • STREAMING INSTANTÂNEO',
    lead: 'Dê o play agora mesmo no dorama dublado mais emocionante da internet e viva cada reviravolta.',
    editorialTitle: 'Dorama Dublado Assistir Online: Praticidade e Emoção em Qualquer Tela',
    editorialText: `Quer chegar em casa, deitar no sofá e maratonar sua novela asiática sem ter que se preocupar em baixar arquivos de torrent ou lidar com players cheios de vírus? Ao buscar por dorama dublado assistir online, você encontra em nossa plataforma um ambiente limpo, com player responsivo que memoriza seu episódio e qualidade de vídeo adaptativa para não consumir seu pacote de dados.`,
    targetKeywords: ['dorama dublado assistir online', 'assistir dorama dublado online', 'ver dorama dublado online', 'dorama dublado gratis online'],
    faqs: [
      {
        question: 'Como avançar para o próximo episódio?',
        answer: 'Nosso player possui controles intuitivos na tela e lista lateral com todos os episódios numerados para navegação rápida.'
      }
    ]
  },

  // =========================================================================
  // 2. HUBS DE ALTO VOLUME (SEMRUSH GRUPOS: ASSISTIR, LOVE, NETFLIX, ETC.)
  // =========================================================================
  'assistir-doramas-gratis': {
    slug: 'assistir-doramas-gratis',
    searchTerm: 'amor',
    navLabel: 'Assistir Grátis',
    h1: 'Assistir Doramas Grátis Online Dublado em Português',
    metaTitle: 'Assistir Doramas Grátis — Novelas e Séries Dubladas em HD',
    metaDescription: 'Assistir doramas grátis completo e dublado em português! Catálogo completo de mini-dramas e novelas asiáticas sem assinatura, sem cartão e em alta definição.',
    badge: '100% GRÁTIS • SEM MENSALIDADE',
    lead: 'Encontre e assista a doramas grátis com dublagem completa em português. Todos os capítulos liberados para você maratonar no celular, computador ou Smart TV.',
    editorialTitle: 'Onde e Como Assistir Doramas Grátis?',
    editorialText: `Se você está procurando onde assistir doramas grátis com excelente qualidade de áudio e imagem, chegou ao lugar certo. O Doramas Dublados reúne centenas de produções dramáticas, comédias românticas, histórias de vingança e dramas de época totalmente dublados em português do Brasil. Diferente de outros streamings pagos, nossa plataforma é 100% mantida por publicidade, garantindo acesso livre a qualquer episódio sem necessidade de assinar pacotes mensais.`,
    targetKeywords: ['assistir doramas gratis', 'assistir dorama', 'assistir doramas', 'doramas para assistir', 'doramas bons para assistir', 'assistir doramas grátis'],
    faqs: [
      {
        question: 'Como assistir doramas grátis sem pagar nada?',
        answer: 'Basta navegar pelo catálogo do nosso site, escolher a novela ou série desejada e clicar no episódio. Não cobramos mensalidade e não exigimos dados de cartão de crédito.'
      },
      {
        question: 'Os episódios são dublados em português?',
        answer: 'Sim! As produções contam com dublagem profissional em português (PT-BR), proporcionando uma experiência imersiva e acessível.'
      },
      {
        question: 'Posso assistir no celular ou Smart TV?',
        answer: 'Com certeza. O site é totalmente responsivo e funciona perfeitamente nos navegadores de smartphones Android, iPhones, tablets e navegadores de Smart TVs.'
      }
    ]
  },

  'doramas-online-dublado': {
    slug: 'doramas-online-dublado',
    searchTerm: 'casamento',
    navLabel: 'Doramas Online Dublado',
    h1: 'Doramas Online Dublados — Novelas e Séries em Português',
    metaTitle: 'Doramas Online Dublado — Assistir Novelas Asiáticas Grátis',
    metaDescription: 'Assista a doramas online dublado em português! Novelas asiáticas, mini-dramas de romance e séries de sucesso transmitidas em Full HD sem travar.',
    badge: 'DORAMAS ONLINE • ALTA DEFINIÇÃO',
    lead: 'A maior biblioteca de doramas online com dublagem em português. Streaming rápido, reprodução contínua e capítulos completos sem cobrança.',
    editorialTitle: 'A Experiência de Assistir Doramas Online em Português',
    editorialText: `A busca por doramas online cresceu exponencialmente no Brasil, conquistando fãs de todas as idades. Nosso portal foi construído com tecnologia moderna de streaming que garante carregamento instantâneo, permitindo que você assista às novelas coreanas, chinesas e asiáticas dubladas com áudio limpo e resolução nítida. Não perca nenhuma reviravolta dos dramas mais comentados da internet.`,
    targetKeywords: ['doramas online', 'dorama online', 'doramas dublados', 'assistir doramas online dublado', 'doramas online dublados'],
    faqs: [
      {
        question: 'Qual é o melhor site para assistir doramas online dublado?',
        answer: 'O Doramas Dublados Grátis é a principal referência no Brasil por oferecer streaming de alta velocidade sem cobrar assinatura e com catálogo constantemente atualizado.'
      },
      {
        question: 'Preciso baixar algum programa para assistir online?',
        answer: 'Não é necessário baixar nada. Você assiste diretamente pelo navegador de internet com reprodução instantânea.'
      }
    ]
  },

  'doramas-mais-assistidos': {
    slug: 'doramas-mais-assistidos',
    searchTerm: 'ceo',
    navLabel: 'Mais Assistidos',
    h1: 'Doramas Mais Assistidos — Os Maiores Sucessos de Audiência',
    metaTitle: 'Doramas Mais Assistidos — Ranking das Melhores Novelas de 2026',
    metaDescription: 'Veja quais são os doramas mais assistidos pelo público brasileiro! Ranking completo com as melhores séries asiáticas e novelas dubladas grátis.',
    badge: 'RANKING DE AUDIÊNCIA • TOP SUCESSOS',
    lead: 'Descubra os doramas que estão dominando as redes sociais e conquistando recordes de visualizações no Brasil.',
    editorialTitle: 'Quais São os Doramas Mais Assistidos?',
    editorialText: `Os doramas mais assistidos combinam romances ardentes, disputas corporativas de bilionários (CEO), superações familiares e vinganças eletrizantes. Títulos como histórias de casamento por conveniência, herdeiros secretos e reencontros do destino lideram a preferência dos espectadores. Confira nossa seleção dos mais populares e comece a maratonar agora mesmo.`,
    targetKeywords: ['doramas mais assistidos', 'melhores doramas', 'doramas bons para assistir', 'dorama mais assistido', 'doramas populares'],
    faqs: [
      {
        question: 'Como são escolhidos os doramas mais assistidos?',
        answer: 'Nosso ranking é baseado nas visualizações reais dos episódios e nas avaliações e comentários da comunidade de espectadores da plataforma.'
      },
      {
        question: 'Todos os doramas do ranking estão disponíveis completos?',
        answer: 'Sim! Todos os títulos listados possuem todos os episódios disponíveis para você assistir do início ao desfecho.'
      }
    ]
  },

  'dorama-novo': {
    slug: 'dorama-novo',
    searchTerm: 'herdeiro',
    navLabel: 'Dorama Novo',
    h1: 'Dorama Novo — Lançamentos Recentes e Novidades Dubladas',
    metaTitle: 'Dorama Novo — Lançamentos Recentes de Novelas e Séries',
    metaDescription: 'Procurando um dorama novo para assistir? Confira os lançamentos mais recentes de novelas asiáticas dubladas em português, com novidades todos os dias.',
    badge: 'LANÇAMENTOS EXCLUSIVOS • NOVIDADES',
    lead: 'Fique por dentro de todos os lançamentos recentes do mundo dos doramas e seja o primeiro a conferir as novas estreias.',
    editorialTitle: 'Procurando um Dorama Novo para Maratonar?',
    editorialText: `O catálogo do Doramas Dublados recebe novos títulos e episódios constantemente. Se você já assistiu aos clássicos e quer encontrar um dorama novo e surpreendente, explore nossa curadoria de novidades. Cada produção traz atuações marcantes, roteiros dinâmicos com episódios rápidos de 1 a 2 minutos no estilo mini-drama, perfeitos para quem ama histórias intensas.`,
    targetKeywords: ['dorama novo', 'doramas novos', 'novo dorama', 'lancamentos de doramas', 'doramas recentes'],
    faqs: [
      {
        question: 'Com que frequência novos doramas são adicionados?',
        answer: 'Adicionamos novas séries, mini-dramas e capítulos semanalmente ao catálogo oficial.'
      }
    ]
  },

  'doramas-love': {
    slug: 'doramas-love',
    searchTerm: 'paixao',
    navLabel: 'Doramas Love',
    h1: 'Doramas Love — Séries Românticas e Novelas de Amor Dubladas',
    metaTitle: 'Doramas Love — Novelas de Romance e Amor Dubladas Grátis',
    metaDescription: 'Apaixone-se com os melhores doramas love! Séries de romance, casamento de fachada, amor secreto e comédias românticas dubladas em português e grátis.',
    badge: 'ROMANCE & PAIXÃO • DORAMAS LOVE',
    lead: 'Histórias emocionantes de amor, desencontros, contratos de casamento e paixões arrebatadoras que vão acelerar seu coração.',
    editorialTitle: 'O Fascínio dos Doramas Love no Brasil',
    editorialText: `O termo "Doramas Love" se tornou sinônimo das narrativas românticas asiáticas mais apaixonantes. Seja no estilo inimigos que viram amantes (enemies to lovers), casamentos arranjados por contratos empresariais ou amores proibidos entre chefes e subordinadas, essas séries cativam pela química dos protagonistas e reviravoltas cheias de emoção. Assista a todas as séries de amor dubladas em alta definição sem custos.`,
    targetKeywords: ['doramas love', 'dorama love', 'secret love dorama', 'a love so beautiful dorama', 'doramas de amor', 'doramas romanticos'],
    faqs: [
      {
        question: 'Quais os temas mais populares nos doramas de romance?',
        answer: 'Os temas favoritos incluem casamento por contrato, romance com CEO milionário, vingança amorosa e histórias de amor que superam preconceitos familiares.'
      }
    ]
  },

  'app-para-assistir-doramas-gratis': {
    slug: 'app-para-assistir-doramas-gratis',
    searchTerm: 'chefe',
    navLabel: 'App Grátis',
    h1: 'App para Assistir Doramas Dublados em Português Grátis',
    metaTitle: 'App para Assistir Doramas Dublados em Português Grátis',
    metaDescription: 'Procurando um app para assistir doramas dublados em português grátis? Use nosso Web App PWA sem baixar nada da Play Store e assista a novelas em HD!',
    badge: 'WEB APP OFICIAL • 100% DE GRAÇA',
    lead: 'Acesse o aplicativo web oficial do Doramas Dublados diretamente no seu celular ou Smart TV sem ocupar memória do aparelho.',
    editorialTitle: 'O Melhor Aplicativo para Assistir Doramas de Graça',
    editorialText: `Muitos usuários buscam por um "aplicativo para assistir dorama de graça" ou "app para assistir doramas dublados em português grátis" nas lojas de aplicativos, mas acabam encontrando serviços cheios de cobranças ocultas ou mensalidades pesadas. O Doramas Dublados funciona como uma Progressive Web Application (PWA): você pode adicionar o atalho do site na tela inicial do seu celular Android ou iPhone e ter um aplicativo completo, fluido e com reprodução em tela cheia sem pagar absolutamente nada.`,
    targetKeywords: ['app para assistir doramas dublados em portugues gratis', 'aplicativo para assistir dorama de graça', 'dorama love app', 'doramas love app', 'app doramas gratis'],
    faqs: [
      {
        question: 'Como instalar o aplicativo no celular Android ou iPhone?',
        answer: 'Basta abrir este site no navegador do celular (Chrome ou Safari), tocar no menu de opções (três pontinhos ou botão de compartilhar) e selecionar "Adicionar à Tela de Início".'
      },
      {
        question: 'O aplicativo cobra alguma mensalidade?',
        answer: 'Não! O uso é 100% gratuito e livre para todos os episódios do catálogo.'
      }
    ]
  },

  'doramas-coreanos': {
    slug: 'doramas-coreanos',
    searchTerm: 'drama',
    navLabel: 'Doramas Coreanos',
    h1: 'Doramas Coreanos Dublados — Os Melhores K-Dramas Online',
    metaTitle: 'Doramas Coreanos Dublados — Séries e K-Dramas Grátis em HD',
    metaDescription: 'Assista aos melhores doramas coreanos dublados em português! K-dramas completos de romance, mistério, comédia e família online sem pagar nada.',
    badge: 'K-DRAMAS • PRODUÇÕES COREANAS',
    lead: 'Explore os aclamados doramas coreanos que conquistaram o mundo com produções cinematográficas e atuações inesquecíveis.',
    editorialTitle: 'Por Que os Doramas Coreanos Fazem Tanto Sucesso?',
    editorialText: `Os K-Dramas (doramas da Coreia do Sul) são conhecidos mundialmente pela excelência técnica, trilhas sonoras emocionantes (OSTs) e narrativas envolventes que prendem a atenção do primeiro ao último segundo. No Doramas Dublados você encontra produções inspiradas nas tendências coreanas, dubladas com qualidade de estúdio para você aproveitar sem cansar lendo legendas.`,
    targetKeywords: ['doramas coreanos', 'dorama coreano', 'k-dramas dublados', 'assistir dorama coreano', 'doramas da coreia'],
    faqs: [
      {
        question: 'O que significa a palavra Dorama?',
        answer: 'Dorama é a pronúncia japonesa para a palavra drama, e no Ocidente tornou-se o termo popular utilizado para se referir a séries dramáticas asiáticas (coreanas, chinesas, japonesas e tailandesas).'
      }
    ]
  },

  'doramas-netflix': {
    slug: 'doramas-netflix',
    searchTerm: 'vingança',
    navLabel: 'Doramas Netflix',
    h1: 'Doramas Estilo Netflix — Alternativas Dubladas 100% Grátis',
    metaTitle: 'Doramas Netflix — Melhores Alternativas Dubladas Grátis',
    metaDescription: 'Fã de doramas da Netflix? Assista a séries e novelas asiáticas dubladas com a mesma qualidade de streaming, totalmente grátis e sem assinatura mensal.',
    badge: 'QUALIDADE NETFLIX • STREAMING LIVRE',
    lead: 'Encontre doramas com a mesma qualidade cinematográfica das produções de grandes plataformas, mas sem pagar mensalidade.',
    editorialTitle: 'Alternativa Gratuita aos Doramas da Netflix',
    editorialText: `Com o aumento constante dos valores das assinaturas de streaming como a Netflix, muitos fãs de doramas procuram alternativas gratuitas para acompanhar suas séries favoritas. O Doramas Dublados oferece um catálogo especializado em dramas rápidos e novelas completas em alta definição, permitindo que você assista quando e onde quiser sem comprometer seu orçamento.`,
    targetKeywords: ['doramas netflix', 'dorama netflix', 'dorama estilo netflix', 'assistir doramas netflix gratis'],
    faqs: [
      {
        question: 'Preciso ter conta na Netflix para assistir aqui?',
        answer: 'Não! Nossa plataforma é um streaming independente e 100% gratuito. Você não precisa de assinatura de nenhum outro serviço.'
      }
    ]
  },

  'meu-dorama': {
    slug: 'meu-dorama',
    searchTerm: 'bilionario',
    navLabel: 'Meu Dorama',
    h1: 'Meu Dorama — Seu Portal de Novelas e Séries Asiáticas Grátis',
    metaTitle: 'Meu Dorama — Assista a Séries e Novelas Dubladas Online',
    metaDescription: 'Acesse o Meu Dorama! Salve seus títulos favoritos na sua lista pessoal, acompanhe o histórico e assista a centenas de capítulos dublados em HD.',
    badge: 'PORTAL MEU DORAMA • 100% GRÁTIS',
    lead: 'Seu cantinho especial para salvar séries favoritas, continuar assistindo de onde parou e descobrir novas histórias.',
    editorialTitle: 'Personalize Sua Experiência no Meu Dorama',
    editorialText: `No Meu Dorama, você tem controle total sobre o que assiste. Com recursos como "Minha Lista" e "Continuar Assistindo", você nunca perde o ponto exato onde pausou seu capítulo. Nosso player inteligente memoriza seu progresso automaticamente e avança para o próximo episódio sem interrupções indesejadas.`,
    targetKeywords: ['meu dorama', 'meus doramas', 'portal dorama', 'doramas gratis brasil'],
    faqs: [
      {
        question: 'Como salvar uma série na Minha Lista?',
        answer: 'Basta clicar no botão "+ Minha Lista" em qualquer card ou página de detalhes da novela. Seus títulos favoritos ficam salvos automaticamente no seu navegador.'
      }
    ]
  },

  // =========================================================================
  // 3. TERMOS ADICIONAIS DE ALTO VOLUME E INTENÇÃO ORGÂNICA
  // =========================================================================
  'assistir-doramas': {
    slug: 'assistir-doramas',
    searchTerm: 'amor',
    navLabel: 'Assistir Doramas',
    h1: 'Assistir Doramas — O Maior Acervo de Novelas Asiáticas Dubladas',
    metaTitle: 'Assistir Doramas — As Melhores Novelas Asiáticas Dubladas',
    metaDescription: 'Onde assistir doramas dublados em português? Aqui você assiste a centenas de capítulos completos de mini-dramas e novelas asiáticas grátis em HD.',
    badge: 'ASSISTIR DORAMAS • 18.000+ BUSCAS',
    lead: 'Milhares de pessoas buscam diariamente onde assistir doramas. Seja bem-vindo à melhor casa dos dorameiros brasileiros.',
    editorialTitle: 'Por Onde Começar a Assistir Doramas?',
    editorialText: `Assistir doramas é uma experiência viciante. Com enredos bem construídos, atuações carismáticas e episódios dinâmicos, essas produções cativam desde o primeiro capítulo. Se você está começando agora, recomendamos nossos títulos mais populares que tratam de casamentos arranjados, reencontros inesperados e reviravoltas no mundo dos grandes impérios familiares.`,
    targetKeywords: ['assistir doramas', 'ver doramas', 'doramas para assistir', 'onde assistir doramas'],
    faqs: [
      {
        question: 'Qual o melhor dorama para quem nunca assistiu antes?',
        answer: 'Sugerimos começar por comédias românticas ou dramas de casamento por contrato, como "Ligada Pelo Amor" ou "Conquistei um Bilionário Para Ser Meu Marido".'
      }
    ]
  },

  'assistir-dorama': {
    slug: 'assistir-dorama',
    searchTerm: 'casamento',
    navLabel: 'Assistir Dorama',
    h1: 'Assistir Dorama — Encontre Sua Próxima Série Favorita',
    metaTitle: 'Assistir Dorama Dublado em Português — Streaming Rápido',
    metaDescription: 'Quer assistir dorama dublado agora? Escolha entre romances, histórias de casamento por contrato e vinganças familiares sem pagar nada.',
    badge: 'ESCOLHA SEU DRAMA • SEM CUSTO',
    lead: 'Encontre exatamente o dorama que combina com seu momento: histórias de amor emocionante, intriga ou superação pessoal.',
    editorialTitle: 'Como Escolher um Dorama Para Assistir Hoje?',
    editorialText: `Navegue pelas nossas categorias temáticas e descubra episódios feitos sob medida para maratonar no celular. Se busca emoções fortes, confira nossas séries de vingança. Se busca aquecer o coração, nossos romances e casamentos com bilionários são escolhas perfeitas.`,
    targetKeywords: ['assistir dorama', 'ver dorama', 'procurar dorama', 'dorama dublado online'],
    faqs: [
      {
        question: 'Os doramas já estão finalizados?',
        answer: 'Sim, a maioria das séries já conta com a temporada completa liberada para você assistir sem pausas.'
      }
    ]
  },

  'doramas-para-assistir': {
    slug: 'doramas-para-assistir',
    searchTerm: 'herdeiro',
    navLabel: 'Doramas para Assistir',
    h1: 'Doramas para Assistir — As Melhores Recomendações de 2026',
    metaTitle: 'Doramas Para Assistir — Lista Definitiva de Novelas Dubladas',
    metaDescription: 'Descubra os melhores doramas para assistir hoje! Lista selecionada com as séries asiáticas e mini-dramas dublados mais envolventes e bem avaliados.',
    badge: 'RECOMENDAÇÕES • GUIA 2026',
    lead: 'Não perca tempo procurando: confira nossa lista das séries asiáticas mais comentadas e bem avaliadas pelos fãs.',
    editorialTitle: 'Seleção Especial: Os Melhores Doramas para Assistir',
    editorialText: `Com tantas opções na internet, fica difícil saber o que vale a pena maratonar. Nossa equipe testou e reuniu os doramas com maior índice de aprovação da comunidade. Histórias que prendem do primeiro ao último capítulo com atuações de arrepiar e dublagens em português que tornam tudo mais prático.`,
    targetKeywords: ['doramas para assistir', 'doramas recomendados', 'indicações de doramas', 'quais doramas assistir'],
    faqs: [
      {
        question: 'Vocês têm doramas de época ou históricos?',
        answer: 'Sim, temos tanto romances contemporâneos de CEO quanto dramas imperiais e históricos com rica caracterização de época.'
      }
    ]
  },

  'doramas-bons-para-assistir': {
    slug: 'doramas-bons-para-assistir',
    searchTerm: 'ceo',
    navLabel: 'Doramas Bons para Assistir',
    h1: 'Doramas Bons para Assistir — Séries Viciantes que Valem a Pena',
    metaTitle: 'Doramas Bons Para Assistir — Top Séries Imperdíveis Dubladas',
    metaDescription: 'Procurando doramas bons para assistir do começo ao fim sem cansar? Confira nossa curadoria de dramas com roteiros dinâmicos e episódios rápidos.',
    badge: 'TOP QUALIDADE • NOTA MÁXIMA',
    lead: 'Apenas histórias com roteiros envolventes, ritmo acelerado e finais surpreendentes.',
    editorialTitle: 'O Que Faz um Dorama Ser Considerado Bom?',
    editorialText: `Um dorama bom de verdade não pode ter enrolação. Cada minuto precisa trazer uma revelação, uma troca de olhares tensa ou um confronto inesperado. Nossos mini-dramas verticais elevam essa fórmula à perfeição, transformando cada capítulo em uma injeção de pura adrenalina e emoção.`,
    targetKeywords: ['doramas bons para assistir', 'dorama bom', 'doramas legais', 'melhores doramas dublados'],
    faqs: [
      {
        question: 'Dá para assistir no intervalo do trabalho?',
        answer: 'Com certeza! Episódios de 1 a 2 minutos são ideais para preencher pequenas pausas do dia.'
      }
    ]
  },

  'doramas-dublados': {
    slug: 'doramas-dublados',
    searchTerm: 'paixao',
    navLabel: 'Doramas Dublados',
    h1: 'Doramas Dublados em Português — Catálogo Completo e Oficial',
    metaTitle: 'Doramas Dublados — Séries Asiáticas com Dublagem PT-BR Grátis',
    metaDescription: 'A maior seleção de doramas dublados do Brasil! Assista a todas as novelas asiáticas com voz em português, sem necessidade de legendas e 100% grátis.',
    badge: 'DUBLAGEM COMPLETA • SEM CUSTO',
    lead: 'Esqueça as legendas rápidas: assista com dublagem brasileira autêntica e aproveite cada cena com conforto.',
    editorialTitle: 'O Crescimento dos Doramas Dublados no Brasil',
    editorialText: `A dublagem em português revolucionou a popularidade das novelas asiáticas no país. Famílias inteiras que antes tinham preguiça de acompanhar séries com legendas agora se reúnem em frente à tela para maratonar os dramas dublados. Nosso portal é dedicado 100% a produções com áudio em português, para que ninguém fique de fora.`,
    targetKeywords: ['doramas dublados', 'dorama dublado', 'doramas dublados em portugues', 'assistir doramas dublados'],
    faqs: [
      {
        question: 'Todas as séries do catálogo são dubladas?',
        answer: 'Sim! Nosso compromisso é oferecer um catálogo 100% dublado em português do Brasil.'
      }
    ]
  },

  'doramas-dublados-gratis': {
    slug: 'doramas-dublados-gratis',
    searchTerm: 'bilionario',
    navLabel: 'Doramas Dublados Grátis',
    h1: 'Doramas Dublados Grátis — Streaming Aberto Sem Assinatura',
    metaTitle: 'Doramas Dublados Grátis — Assista Sem Cartão de Crédito',
    metaDescription: 'Novelas e doramas dublados grátis para toda a família! Assista aos episódios no celular, tablet ou Smart TV com qualidade HD e áudio impecável.',
    badge: '100% GRATUITO • LIVRE',
    lead: 'O streaming que você sempre quis: centenas de episódios dublados sem custo algum.',
    editorialTitle: 'Como Assistir a Doramas Dublados Grátis Todos os Dias?',
    editorialText: `Basta adicionar nosso site aos seus favoritos ou tela de início. Não há truques, nem necessidade de downloads suspeitos. Nossa plataforma opera legalmente com monetização de anúncios para garantir que você tenha entretenimento de qualidade sem pagar nada.`,
    targetKeywords: ['doramas dublados gratis', 'doramas dublados grátis', 'assistir doramas dublados gratis', 'ver doramas dublados gratis'],
    faqs: [
      {
        question: 'Quantas temporadas estão liberadas de graça?',
        answer: 'Todas as temporadas e episódios disponíveis no site estão 100% liberados sem restrições.'
      }
    ]
  },

  'melhores-doramas': {
    slug: 'melhores-doramas',
    searchTerm: 'drama',
    navLabel: 'Melhores Doramas',
    h1: 'Melhores Doramas — Ranking Atualizado de Audiência e Crítica',
    metaTitle: 'Melhores Doramas — Conheça as Produções de Maior Sucesso',
    metaDescription: 'Conheça os melhores doramas de todos os tempos dublados em português! Ranking das séries asiáticas mais assistidas e elogiadas pelos fãs no Brasil.',
    badge: 'RANKING CRÍTICA • NOTA 10',
    lead: 'Confira a lista dos melhores doramas avaliados pela nossa comunidade de fãs apaixonados.',
    editorialTitle: 'O Que Torna Esses os Melhores Doramas?',
    editorialText: `Roteiros brilhantes, atuações comoventes e reviravoltas de perder o fôlego. Conheça as produções que redefiniram o gênero no Brasil e descubra histórias inesquecíveis que você vai recomendar para todos os seus amigos.`,
    targetKeywords: ['melhores doramas', 'os melhores doramas', 'top doramas', 'doramas mais bem avaliados'],
    faqs: [
      {
        question: 'O ranking dos melhores doramas é atualizado?',
        answer: 'Sim, atualizamos frequentemente com base no engajamento dos usuários e lançamentos.'
      }
    ]
  },

  'onde-assistir-doramas-gratis': {
    slug: 'onde-assistir-doramas-gratis',
    searchTerm: 'amor',
    navLabel: 'Onde Assistir Grátis',
    h1: 'Onde Assistir Doramas Grátis na Internet Sem Pagar Mensalidade',
    metaTitle: 'Onde Assistir Doramas Grátis? — Guia Completo e Streaming',
    metaDescription: 'Não sabe onde assistir doramas grátis dublados em português? Acesse nossa plataforma gratuita e assista a capítulos diários sem burocracia.',
    badge: 'RESPOSTA DEFINITIVA • GUIA',
    lead: 'A resposta para sua dúvida: aqui você encontra centenas de produções asiáticas dubladas e gratuitas.',
    editorialTitle: 'Onde Assistir Doramas Grátis com Qualidade e Segurança?',
    editorialText: `Milhões de buscas no Google perguntam: "onde assistir doramas grátis?". A resposta é o Doramas Dublados! Em vez de sites lentos ou plataformas pagas com assinaturas caras, você assiste a tudo diretamente no navegador com player veloz e imagem cristalina.`,
    targetKeywords: ['onde assistir doramas gratis', 'onde assistir doramas', 'onde ver dorama de graça', 'plataforma de doramas gratis'],
    faqs: [
      {
        question: 'Onde posso assistir no computador?',
        answer: 'Em qualquer navegador web moderno: acesse o site, clique no título e comece a maratona.'
      }
    ]
  },

  'sites-para-assistir-doramas': {
    slug: 'sites-para-assistir-doramas',
    searchTerm: 'rico',
    navLabel: 'Sites para Assistir',
    h1: 'Sites para Assistir Doramas — Comparativo e Melhor Escolha Grátis',
    metaTitle: 'Sites para Assistir Doramas — A Melhor Plataforma Gratuita',
    metaDescription: 'Buscando sites para assistir doramas de forma segura e rápida? Conheça nossa plataforma com centenas de séries completas, dubladas e gratuitas.',
    badge: 'COMPARAÇÃO • STREAMING TOP',
    lead: 'Conheça o site que está substituindo as plataformas pagas para os amantes de dramas asiáticos.',
    editorialTitle: 'Qual a Diferença Entre os Sites Para Assistir Doramas?',
    editorialText: `Muitos sites piratas inundam seu computador com vírus e anúncios enganosos. Nosso portal é construído com tecnologia limpa, respeita sua experiência de navegação e oferece streaming seguro e direto para você relaxar e aproveitar cada história.`,
    targetKeywords: ['sites para assistir doramas', 'sites de doramas', 'melhores sites para assistir dorama', 'site bom de dorama'],
    faqs: [
      {
        question: 'Preciso me preocupar com vírus?',
        answer: 'Não! Nosso site utiliza HTTPS, anúncios oficiais do Google AdSense e não exige download de arquivos executáveis.'
      }
    ]
  },

  'doramas-de-romance': {
    slug: 'doramas-de-romance',
    searchTerm: 'casamento',
    navLabel: 'Doramas de Romance',
    h1: 'Doramas de Romance Dublados — As Histórias de Amor Mais Viciantes',
    metaTitle: 'Doramas de Romance Dublados — Assista a Novelas de Amor Grátis',
    metaDescription: 'Apaixone-se com os melhores doramas de romance dublados! Casais inesquecíveis, reconciliações apaixonantes e histórias de casamento por conveniência.',
    badge: 'ROMANCE & PAIXÃO • CASAMENTO',
    lead: 'Corações acelerados, casamentos arranjados e amores que superam qualquer desafio.',
    editorialTitle: 'A Magia dos Doramas de Romance Dublados',
    editorialText: `Os doramas de romance são o ponto mais forte das produções asiáticas. A tensão romântica que se desenvolve devagar, o carinho nos detalhes e os finais recompensadores fazem o público suspirar. Nossos títulos contam histórias de casamentos de fachada que viram amor verdadeiro e encontros predestinados.`,
    targetKeywords: ['doramas de romance', 'dorama de romance dublado', 'doramas romanticos', 'assistir dorama de romance'],
    faqs: [
      {
        question: 'Quais séries de romance você recomenda primeiro?',
        answer: '"Ligada Pelo Amor" e "De Repente, Casados" são os maiores sucessos românticos da plataforma.'
      }
    ]
  },

  'doramas-de-amor': {
    slug: 'doramas-de-amor',
    searchTerm: 'amor',
    navLabel: 'Doramas de Amor',
    h1: 'Doramas de Amor — Séries Apaixonantes Dubladas em Português',
    metaTitle: 'Doramas de Amor — Histórias Emocionantes e Romances em HD',
    metaDescription: 'Assista aos mais belos doramas de amor! Produções asiáticas que tocam o coração com trilhas sonoras emocionantes e capítulos completos liberados.',
    badge: 'HISTÓRIAS DE AMOR • EMOÇÃO',
    lead: 'Se emocione com histórias sinceras de amor verdadeiro, reencontros e perdão.',
    editorialTitle: 'O Encanto das Séries e Doramas de Amor',
    editorialText: `Mais do que simples novelas, os doramas de amor retratam sentimentos profundos sobre sacrifício, superação e a força da união familiar. Se você quer se emocionar e rir com as trapalhadas dos casais mais fofos da Ásia, explore nossa curadoria.`,
    targetKeywords: ['doramas de amor', 'dorama de amor', 'series de amor dubladas', 'doramas apaixonantes'],
    faqs: [
      {
        question: 'Tem finais felizes?',
        answer: 'A grande maioria dos nossos doramas de amor possui finais satisfatórios e muito felizes para os protagonistas!'
      }
    ]
  },

  'doramas-chineses-dublados': {
    slug: 'doramas-chineses-dublados',
    searchTerm: 'drama',
    navLabel: 'Doramas Chineses',
    h1: 'Doramas Chineses Dublados (C-Dramas) — Produções em Português',
    metaTitle: 'Doramas Chineses Dublados — Assista a C-Dramas Grátis em HD',
    metaDescription: 'Descubra o sucesso dos doramas chineses dublados! Mini-dramas épicos, histórias modernas de magnatas e romances emocionantes dublados em PT-BR.',
    badge: 'C-DRAMAS • PRODUÇÕES CHINESAS',
    lead: 'Os mini-dramas chineses que viraram fenômeno mundial agora dublados em português para você maratonar.',
    editorialTitle: 'A Revolução dos C-Dramas e Mini-Dramas Chineses',
    editorialText: `A China domina a produção mundial dos mini-dramas verticais rápidos de alta intensidade. Com produção cinematográfica impressionante, figurinos luxuosos e ritmo alucinante onde sempre acontece algo crucial a cada 60 segundos, os C-Dramas dublados conquistaram uma legião de fãs fiéis no Brasil.`,
    targetKeywords: ['doramas chineses dublados', 'c-dramas dublados', 'doramas da china dublados', 'assistir doramas chineses'],
    faqs: [
      {
        question: 'O que é um C-Drama?',
        answer: 'É o termo utilizado para dramas e novelas produzidas na China (Chinese Drama).'
      }
    ]
  },

  'doramas-japoneses-dublados': {
    slug: 'doramas-japoneses-dublados',
    searchTerm: 'drama',
    navLabel: 'Doramas Japoneses',
    h1: 'Doramas Japoneses Dublados (J-Dramas) — Histórias Únicas e Originais',
    metaTitle: 'Doramas Japoneses Dublados — Séries e Dramas do Japão Grátis',
    metaDescription: 'Explore os melhores doramas japoneses dublados em português. Enredos inteligentes, comédias inusitadas e dramas intensos liberados online sem custos.',
    badge: 'J-DRAMAS • PRODUÇÕES DO JAPÃO',
    lead: 'Onde o termo dorama nasceu: histórias envolventes e autênticas com dublagem em português.',
    editorialTitle: 'A Tradição dos J-Dramas Japoneses',
    editorialText: `Os doramas japoneses se destacam pela originalidade das tramas, que misturam vida cotidiana, superação no trabalho, romances doces e reflexões profundas sobre amizade e família. Assista às melhores séries japonesas dubladas com resolução impecável.`,
    targetKeywords: ['doramas japoneses dublados', 'j-dramas dublados', 'dramas japoneses', 'assistir dorama japones'],
    faqs: [
      {
        question: 'O que diferencia os doramas japoneses?',
        answer: 'Eles costumam ter narrativas mais concisas e abordagens psicológicas e relacionais únicas.'
      }
    ]
  },

  'doramas-de-vinganca': {
    slug: 'doramas-de-vinganca',
    searchTerm: 'vingança',
    navLabel: 'Doramas de Vingança',
    h1: 'Doramas de Vingança Dublados — Tramas Eletrizantes de Superação',
    metaTitle: 'Doramas de Vingança — Séries de Traição e Justiça Dubladas',
    metaDescription: 'Adora histórias de reviravolta? Assista a doramas de vingança dublados em português! Personagens humilhados que retornam poderosos para acertar as contas.',
    badge: 'VINGANÇA & JUSTIÇA • REVIRAVOLTAS',
    lead: 'Traições familiares, humilhações do passado e o retorno triunfal da justiça.',
    editorialTitle: 'O Fascínio das Histórias de Vingança e Reviravolta',
    editorialText: `Nada é mais satisfatório do que ver um personagem humilhado e traído retornar com riqueza, poder e inteligência para desmascarar seus algozes diante de toda a alta sociedade. Nossos doramas de vingança proporcionam reviravoltas inesquecíveis que deixam qualquer espectador de queixo caído.`,
    targetKeywords: ['doramas de vinganca', 'dorama de vingança dublado', 'series de vingança', 'doramas de superação'],
    faqs: [
      {
        question: 'Qual dorama de vingança é o mais recomendado?',
        answer: 'Confira as tramas com herdeiras secretas e ex-esposas que retornam como magnatas para recuperar suas vidas.'
      }
    ]
  },

  'doramas-ceo-e-bilionario': {
    slug: 'doramas-ceo-e-bilionario',
    searchTerm: 'ceo',
    navLabel: 'Doramas CEO e Bilionário',
    h1: 'Doramas de CEO e Bilionário — Romances com Magnatas Dublados',
    metaTitle: 'Doramas de CEO e Bilionário — Assista a Séries de Magnatas Grátis',
    metaDescription: 'Os doramas de CEO e bilionário mais assistidos da internet! Romances entre chefes poderosos e funcionárias decididas dublados em HD sem mensalidade.',
    badge: 'CEO & BILIONÁRIO • PODER E PAIXÃO',
    lead: 'Mansões luxuosas, contratos milionários e homens poderosos que perdem o controle por amor.',
    editorialTitle: 'O Maior Sucesso da Internet: Séries de CEO e Bilionários',
    editorialText: `O gênero de romance entre magnatas implacáveis e mulheres independentes domina o ranking de audiência em todo o mundo. O contraste entre o mundo corporativo frio e a paixão ardente gera cenas inesquecíveis de ciúmes, proteção e carinho. Assista a todas essas séries completas e dubladas.`,
    targetKeywords: ['doramas de ceo e bilionario', 'dorama de ceo', 'dorama de bilionario dublado', 'doramas de magnatas'],
    faqs: [
      {
        question: 'Por que os doramas de CEO fazem tanto sucesso?',
        answer: 'Pela combinação mágica de luxo, superação pessoal e o famoso clichê do homem poderoso que se derrete pela protagonista.'
      }
    ]
  },

  'doramas-casamento-por-contrato': {
    slug: 'doramas-casamento-por-contrato',
    searchTerm: 'casamento',
    navLabel: 'Casamento por Contrato',
    h1: 'Doramas de Casamento por Contrato — Da Convivência à Grande Paixão',
    metaTitle: 'Doramas de Casamento por Contrato — Séries Dubladas em HD',
    metaDescription: 'O clássico clichê irresistível: assista a doramas de casamento por contrato dublados em português! Dois estranhos fingem uma união e se apaixonam de verdade.',
    badge: 'CASAMENTO FALSO • PAIXÃO REAL',
    lead: 'Eles assinaram um papel para fingir um casamento, mas não contavam que o amor falaria mais alto.',
    editorialTitle: 'O Clichê Mais Amado: Casamento por Contrato',
    editorialText: `A trama começa sempre com uma necessidade urgente: agradar ao avô exigente, fugir de um escândalo ou salvar uma empresa da falência. Dois estranhos aceitam dividir o mesmo teto sob regras rígidas... que logo começam a ser quebradas quando a convivência diária dá lugar a um romance avassalador.`,
    targetKeywords: ['doramas casamento por contrato', 'dorama casamento arranjado', 'casamento falso dorama', 'doramas de casamento'],
    faqs: [
      {
        question: 'Quais títulos têm casamento por contrato no catálogo?',
        answer: '"Conquistei um Bilionário Para Ser Meu Marido" e "De Repente, Casados" são excelentes exemplos disponíveis no site.'
      }
    ]
  },

  'doramas-lancamentos-2026': {
    slug: 'doramas-lancamentos-2026',
    searchTerm: 'herdeiro',
    navLabel: 'Lançamentos 2026',
    h1: 'Doramas Lançamentos 2026 — As Séries Asiáticas Mais Recentes',
    metaTitle: 'Doramas Lançamentos 2026 — Novidades e Estreias Dubladas',
    metaDescription: 'Fique atualizado com os doramas lançamentos de 2026! Novas séries, capítulos diários e estreias dubladas com áudio de estúdio liberadas grátis.',
    badge: 'ESTREIAS 2026 • ATUALIZADO',
    lead: 'Todas as estreias do ano em um só lugar. Seja o primeiro a assistir às novas temporadas.',
    editorialTitle: 'As Maiores Estreias e Novidades do Ano em Doramas',
    editorialText: `O ano de 2026 trouxe produções ainda mais sofisticadas para o universo dos mini-dramas asiáticos. Efeitos visuais modernos, roteiros afiados e elenco de dublagem estelar marcam os novos lançamentos que você assiste em primeira mão aqui.`,
    targetKeywords: ['doramas lancamentos 2026', 'doramas 2026 dublados', 'novos doramas 2026', 'estreias de doramas'],
    faqs: [
      {
        question: 'Novas séries são lançadas toda semana?',
        answer: 'Sim, mantemos nossa esteira de lançamentos sempre aquecida com novas estreias semanais.'
      }
    ]
  },

  'doramas-gratis-sem-cadastro': {
    slug: 'doramas-gratis-sem-cadastro',
    searchTerm: 'amor',
    navLabel: 'Grátis Sem Cadastro',
    h1: 'Doramas Grátis Sem Cadastro — Assista na Hora Sem Criar Conta',
    metaTitle: 'Doramas Grátis Sem Cadastro — Clique e Assista Agora em HD',
    metaDescription: 'Sem perder tempo preenchendo formulários! Assista a doramas grátis sem cadastro, sem login obrigatório e sem dados bancários. É só dar play.',
    badge: 'SEM LOGIN • PLAY IMEDIATO',
    lead: 'Privacidade e agilidade: clique na série que deseja e comece a maratonar no mesmo instante.',
    editorialTitle: 'Assista a Doramas Sem Burocracia Nem Cadastro Obrigatório',
    editorialText: `Sabemos o quanto é frustrante querer relaxar assistindo a uma série e ter que preencher cadastros longos, confirmar e-mail e lembrar senhas. No Doramas Dublados, você tem acesso imediato sem burocracia nenhuma. Salve seus favoritos e assista de forma 100% anônima e gratuita.`,
    targetKeywords: ['doramas gratis sem cadastro', 'assistir dorama sem login', 'dorama online sem cadastro', 'ver dorama sem conta'],
    faqs: [
      {
        question: 'Preciso criar conta para continuar assistindo?',
        answer: 'Não! O progresso do episódio fica salvo no próprio armazenamento local do seu navegador.'
      }
    ]
  },

  'assistir-doramas-no-celular': {
    slug: 'assistir-doramas-no-celular',
    searchTerm: 'chefe',
    navLabel: 'Assistir no Celular',
    h1: 'Assistir Doramas no Celular — Streaming Rápido para Android e iPhone',
    metaTitle: 'Assistir Doramas no Celular — Player Leve para Android e iOS',
    metaDescription: 'Como assistir doramas no celular sem travar e sem gastar muita internet? Nosso player vertical inteligente se adapta à sua tela com capítulos rápidos em HD.',
    badge: 'MOBILE FIRST • ANDROID & IPHONE',
    lead: 'O player vertical perfeito para maratonar no smartphone em qualquer lugar.',
    editorialTitle: 'A Melhor Experiência Mobile Para Assistir Doramas no Celular',
    editorialText: `Nossos doramas e episódios foram gravados nativamente em proporção vertical (9:16), o mesmo formato consagrado pelo TikTok e Reels. Isso significa que você não precisa virar o celular de lado ou segurar o aparelho de forma desconfortável. Você assiste com tela cheia natural, alta nitidez e baixo consumo de dados móveis.`,
    targetKeywords: ['assistir doramas no celular', 'dorama no celular', 'app dorama celular', 'ver dorama no smartphone'],
    faqs: [
      {
        question: 'Gasta muitos dados de internet 4G/5G?',
        answer: 'Nosso player utiliza compressão de vídeo moderna que economiza até 40% de dados sem perder nitidez.'
      }
    ]
  },

  'kdramas-dublados-em-portugues': {
    slug: 'kdramas-dublados-em-portugues',
    searchTerm: 'coreano',
    navLabel: 'K-Dramas PT-BR',
    h1: 'K-Dramas Dublados em Português — Sucessos Coreanos com Áudio PT-BR',
    metaTitle: 'K-Dramas Dublados em Português — Streaming Completo em HD',
    metaDescription: 'O melhor dos K-Dramas dublados em português para maratonar! Sem precisar ler legendas rápidas, aproveite atuações consagradas com dublagem de alto nível.',
    badge: 'K-DRAMAS PT-BR • DUBLADOS',
    lead: 'A cultura coreana ganha vida em português com as melhores vozes do país.',
    editorialTitle: 'O Crescimento dos K-Dramas Dublados em Português',
    editorialText: `Quem é fã de cultura coreana sabe que as produções da Coreia se destacam pelo cuidado estético e narrativo. Nossa curadoria de K-Dramas dublados em português reúne os maiores enredos de romances, intrigas de família nobre e comédias leves para você assistir sem cansaço visual.`,
    targetKeywords: ['kdramas dublados em portugues', 'kdrama dublado brasil', 'series coreanas dubladas em portugues'],
    faqs: [
      {
        question: 'Os nomes dos personagens são mantidos?',
        answer: 'Sim, os nomes originais são preservados com a correta pronúncia adaptada pelos dubladores profissionais.'
      }
    ]
  },

  'novelas-asiaticas-dubladas-gratis': {
    slug: 'novelas-asiaticas-dubladas-gratis',
    searchTerm: 'esposa',
    navLabel: 'Novelas Asiáticas Grátis',
    h1: 'Novelas Asiáticas Dubladas Grátis — Capítulos Completos Online',
    metaTitle: 'Novelas Asiáticas Dubladas Grátis — Mini-Dramas e Séries em HD',
    metaDescription: 'Assista a novelas asiáticas dubladas grátis! Conflitos familiares, disputas por heranças, casamentos tumultuados e amores inesquecíveis online.',
    badge: 'NOVELAS ASIÁTICAS • CAPÍTULOS COMPLETOS',
    lead: 'O drama que o brasileiro ama com a intensidade única das produções do Oriente.',
    editorialTitle: 'Por Que o Público de Novelas Migrou Para as Novelas Asiáticas?',
    editorialText: `O público brasileiro acostumado com novelas tradicionais se apaixonou pelo formato asiático porque as histórias não demoram meses para desenrolar o mistério. Em poucas horas de maratona, você acompanha todo o desenrolar de um casamento por conveniência, a queda do vilão e a consagração do amor do casal principal.`,
    targetKeywords: ['novelas asiaticas dubladas gratis', 'novelas asiaticas gratis', 'novelas coreanas dubladas', 'novelas chinesas gratis'],
    faqs: [
      {
        question: 'Quantos capítulos costuma ter uma novela asiática curta?',
        answer: 'Em média de 80 a 110 capítulos ágeis, totalizando de 2 a 3 horas de maratona contínua.'
      }
    ]
  },

  'mini-doramas-dublados': {
    slug: 'mini-doramas-dublados',
    searchTerm: 'rico',
    navLabel: 'Mini Doramas Dublados',
    h1: 'Mini Doramas Dublados — Episódios Rápidos de 1 a 2 Minutos',
    metaTitle: 'Mini Doramas Dublados — Histórias Intensas no Estilo Short Drama',
    metaDescription: 'Assista a mini doramas dublados em português! O formato febre do momento com capítulos curtos e viciantes para assistir no almoço, transporte ou cama.',
    badge: 'MINI DRAMAS • SHORT DRAMA FEBRE',
    lead: 'O formato febre no TikTok e YouTube agora reunido em uma plataforma completa e dublada.',
    editorialTitle: 'A Sensação Global dos Mini Doramas (Short Dramas)',
    editorialText: `Os mini-doramas revolucionaram a forma de consumir entretenimento no celular. Cada episódio de 1 a 2 minutos termina com um gancho eletrizante que torna quase impossível não avançar para o próximo. No Doramas Dublados você encontra os maiores sucessos do formato ReelShort com dublagens exclusivas e sem cobrança por moeda ou episódio.`,
    targetKeywords: ['mini doramas dublados', 'mini doramas gratis', 'short drama dublado', 'doramas curtos dublados'],
    faqs: [
      {
        question: 'Preciso comprar moedas para desbloquear episódios?',
        answer: 'Não! Diferente de outros apps que cobram moedas a cada capítulo, aqui todos os episódios são 100% gratuitos.'
      }
    ]
  },

  'doramas-legendados-e-dublados': {
    slug: 'doramas-legendados-e-dublados',
    searchTerm: 'amor',
    navLabel: 'Legendados e Dublados',
    h1: 'Doramas Legendados e Dublados — Assista com Sua Preferência de Áudio',
    metaTitle: 'Doramas Legendados e Dublados — Séries Asiáticas Completas',
    metaDescription: 'Prefere voz original ou dublagem fluida? Aqui você encontra doramas legendados e dublados em português com excelente sincronia e imagem Full HD.',
    badge: 'ÁUDIO & LEGENDAS • FULL HD',
    lead: 'O melhor dos dois mundos para quem ama tanto o áudio dublado quanto o original asiático.',
    editorialTitle: 'Doramas Legendados ou Dublados: Qual Escolher?',
    editorialText: `A discussão entre fãs é antiga: assistir com o áudio original e legendas para sentir as entonações asiáticas ou maratonar com a comodidade da dublagem brasileira? Em nossa plataforma, priorizamos a acessibilidade das dublagens profissionais sem abrir mão do respeito à atuação e à cultura de origem.`,
    targetKeywords: ['doramas legendados e dublados', 'doramas legendados', 'doramas dublados ou legendados', 'assistir doramas com legenda'],
    faqs: [
      {
        question: 'Posso ativar legendas no player?',
        answer: 'O player suporta legendas em títulos compatíveis e áudio dublado estéreo.'
      }
    ]
  },

  'portal-dorama-gratis': {
    slug: 'portal-dorama-gratis',
    searchTerm: 'bilionario',
    navLabel: 'Portal Dorama Grátis',
    h1: 'Portal Dorama Grátis — Sua Comunidade de Streaming Asiático',
    metaTitle: 'Portal Dorama Grátis — Séries, Capítulos e Novidades Diárias',
    metaDescription: 'Bem-vindo ao maior portal dorama grátis do Brasil! Salve séries na sua lista, descubra lançamentos diários e maratone sem mensalidade.',
    badge: 'COMUNIDADE OFICIAL • LIVRE',
    lead: 'O portal feito por fãs e para fãs de séries e novelas asiáticas dubladas.',
    editorialTitle: 'O Seu Portal Definitivo de Novelas Asiáticas',
    editorialText: `Construímos este portal com foco na melhor experiência do usuário: carregamento veloz, interface limpa sem pop-ups abusivos e navegação organizada por categorias temáticas. Faça parte da nossa comunidade e maratone à vontade.`,
    targetKeywords: ['portal dorama gratis', 'portal doramas', 'site de doramas gratis brasil'],
    faqs: [
      {
        question: 'Como apoiar o portal para continuar gratuito?',
        answer: 'Basta desativar o bloqueador de anúncios (AdBlock) e compartilhar o link do site com seus amigos e familiares!'
      }
    ]
  },

  'doramas-streaming-gratis': {
    slug: 'doramas-streaming-gratis',
    searchTerm: 'marido',
    navLabel: 'Streaming Grátis',
    h1: 'Doramas Streaming Grátis — A Alternativa Livre Aos Serviços Pagos',
    metaTitle: 'Doramas Streaming Grátis — Sem Mensalidade, Apenas Diversão',
    metaDescription: 'Plataforma de doramas streaming grátis no Brasil! Sem planos caros ou assinaturas que pesam no bolso: acesse todas as séries livremente com anúncios.',
    badge: 'STREAMING 100% GRÁTIS',
    lead: 'Diga adeus às assinaturas caras de streaming e aproveite um catálogo repleto de sucessos de graça.',
    editorialTitle: 'A Nova Era do Streaming Gratuito de Doramas',
    editorialText: `Com o modelo FAST (Free Ad-Supported TV) e streaming financiado por publicidade, você não precisa mais desembolsar dezenas de reais todo mês para ter acesso a entretenimento de primeiro mundo. Aproveite doramas completos sem assinar nada.`,
    targetKeywords: ['doramas streaming gratis', 'streaming de doramas gratuito', 'assistir doramas streaming brasil'],
    faqs: [
      {
        question: 'Posso espelhar o vídeo na televisão?',
        answer: 'Sim! Utilize a função de transmitir / Chromecast do seu navegador para assistir na sua Smart TV.'
      }
    ]
  }
};

export const ALL_SEO_SLUGS = Object.keys(SEO_HUBS);

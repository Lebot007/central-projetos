/* Lista de projetos com GitHub Pages ativo.
 * Para adicionar um projeto: inclua um objeto aqui e coloque a capa em covers/<repo>.webp
 * (e a miniatura em covers/thumb/<repo>.webp). Gere as duas com tools/capturar.py. */
window.PROJECTS = [
  {
    repo: "hmdcc-site-premium",
    title: "HMDCC — Site Premium",
    category: "Web",
    featured: true,
    description: "Redesign do portal institucional do Hospital Metropolitano Dr. Célio de Castro, hospital 100% SUS de Belo Horizonte.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    updated: "2026-11-08"
  },
  {
    repo: "nevoa-chat",
    title: "Névoa",
    category: "Web",
    featured: true,
    description: "Chat anônimo e efêmero para até 10 pessoas, cifrado ponta a ponta no navegador. Sem conta, sem banco, sem histórico.",
    stack: ["JavaScript", "WebRTC", "AES-GCM"],
    updated: "2026-11-16"
  },
  {
    repo: "ControleFinanceiro2.0",
    title: "Fluxo — Finanças Pessoais",
    category: "Dados",
    featured: true,
    description: "Organizador financeiro completo que roda 100% no navegador: contas, cartões, parcelas, metas, relatórios e assistente com IA.",
    stack: ["JavaScript", "PWA", "IA"],
    updated: "2026-11-08"
  },
  {
    repo: "debateia",
    title: "DebateIA",
    category: "IA",
    featured: true,
    cover: false,
    description: "Coloque várias IAs para debater a mesma pergunta e receba a resposta final sintetizada pela IA Chefe.",
    stack: ["Next.js", "TypeScript", "Gemini"],
    updated: "2026-11-06"
  },
  {
    repo: "shingeki",
    title: "Portfólio Shingeki",
    category: "Design",
    featured: true,
    description: "Portfólio pessoal com temática Attack on Titan em um único HTML: partículas, cinemática de entrada e timeline.",
    stack: ["HTML", "CSS", "Canvas"],
    updated: "2026-11-05"
  },
  {
    repo: "site-tematico-Kaneki",
    title: "Portfólio Kaneki",
    category: "Design",
    featured: true,
    description: "Portfólio com estética Tokyo Ghoul: cinemática de entrada, centopeia procedural em Canvas e player de música.",
    stack: ["HTML", "Canvas2D", "Web Audio"],
    updated: "2026-11-06"
  },
  {
    repo: "a3controlecarros",
    title: "ParkSim",
    category: "Dados",
    description: "Simulador de estacionamento com entrada e saída de veículos, painel administrativo e banco relacional real.",
    stack: ["PostgreSQL", "Supabase", "JavaScript"],
    updated: "2026-11-12"
  },
  {
    repo: "site-joao",
    title: "João Vitor — Site Profissional",
    category: "Web",
    description: "Currículo e portfólio profissional: desenvolvimento, Tasy e Oracle SQL, com CV em PDF para download.",
    stack: ["HTML", "CSS", "PWA"],
    updated: "2026-11-07"
  },
  {
    repo: "controlecrunch",
    title: "TSUKI · Controle de Pagamentos",
    category: "Dados",
    description: "Painel de mensalidades: visitantes só visualizam, o admin marca quem pagou. Supabase com RLS e fallback local.",
    stack: ["Supabase", "PostgreSQL", "JavaScript"],
    updated: "2026-11-01"
  },
  {
    repo: "IA-auditoria-presidentes",
    title: "Contra-Argumento #1",
    category: "IA",
    description: "Episódio de debate em áudio: quem deveria ser o presidente do Brasil? Vozes neurais, roteiro e placar da banca.",
    stack: ["IA", "Áudio", "HTML"],
    updated: "2026-09-15"
  },
  {
    repo: "ativa-tech",
    title: "AtivaTech",
    category: "Web",
    description: "Landing page de serviço remoto de ativação do Windows e formatação de computador, com contato via WhatsApp.",
    stack: ["HTML", "CSS", "JavaScript"],
    updated: "2026-09-11"
  },
  {
    repo: "site-carro",
    title: "AutoConnect",
    category: "Web",
    description: "Rede social automotiva com feed, stories e mapa de oficinas próximas via GPS.",
    stack: ["JavaScript", "Leaflet", "GPS"],
    updated: "2026-06-11"
  },
  {
    repo: "SiteSupplies",
    title: "Supplies — Locação de Impressoras",
    category: "Web",
    description: "Site institucional de locação de impressoras Samsung com catálogo, serviços e orçamento pelo WhatsApp.",
    stack: ["HTML", "CSS", "Canvas"],
    updated: "2026-05-21"
  },
  {
    repo: "site-tattoo-alisson",
    title: "Alisson Alves Tattoo",
    category: "Design",
    description: "Site de estúdio de tatuagem com visual dark e dourado, galeria de trabalhos, estilos e agendamento.",
    stack: ["HTML", "CSS", "JavaScript"],
    updated: "2026-05-21"
  },
  {
    repo: "hacker_game_site",
    title: "CyberSec Academy",
    category: "Jogos",
    description: "Simulador de ethical hacking em estilo terminal, com missões de reconhecimento e progresso por fases.",
    stack: ["HTML", "JavaScript"],
    updated: "2025-08-21"
  },
  {
    repo: "A3_Terc_S1",
    title: "Bombines — Jogo de Minas",
    category: "Jogos",
    description: "Jogo de minas com apostas fictícias, login e saldo, feito no projeto A3 do terceiro semestre.",
    stack: ["HTML", "CSS", "JavaScript"],
    updated: "2025-07-20"
  },
  {
    repo: "central-projetos",
    title: "Central de Projetos",
    category: "Web",
    description: "Este site: a vitrine de todos os projetos publicados, com capas reais, busca e filtros.",
    stack: ["HTML", "CSS", "JavaScript"],
    updated: "2026-11-17"
  }
];

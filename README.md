# Central de Projetos · Lebot007

Vitrine de todos os meus projetos publicados no GitHub Pages, com a **tela inicial real** de cada site como capa.

**No ar:** <https://lebot007.github.io/central-projetos/>

## O que tem

- Capa de cada projeto com o print da página inicial (clique para ampliar)
- Busca por nome, descrição ou tecnologia (atalho `/`)
- Filtros por categoria (Web, Dados, IA, Design, Jogos) e ordenação
- Filtros salvos na URL, então dá para compartilhar o link já filtrado (ex.: `?cat=IA`)
- Layout responsivo do celular a telas ultrawide, sem rolagem lateral
- Acessível: navegação por teclado, foco visível, `prefers-reduced-motion`

## Estrutura

```
index.html          página
assets/styles.css   visual
assets/app.js       busca, filtros, cards e visualizador
assets/projects.js  lista de projetos (é aqui que se adiciona um novo)
covers/             capas 1440x900 (.webp) e covers/thumb/ (800x500)
tools/capturar.py   gera as capas automaticamente
```

## Adicionar um projeto

1. Inclua um objeto em `assets/projects.js` (`repo`, `title`, `category`, `description`, `stack`, `updated`).
2. Gere a capa: `python3 tools/capturar.py nome-do-repo` (instruções no topo do script).
3. Sem capa ainda? Use `cover: false` e o card mostra uma prévia provisória.

Não precisa de build: é HTML, CSS e JavaScript puros.

## Projetos

| Projeto | Categoria | Site |
|---|---|---|
| HMDCC — Site Premium | Web | [abrir](https://lebot007.github.io/hmdcc-site-premium/) |
| Névoa | Web | [abrir](https://lebot007.github.io/nevoa-chat/) |
| Fluxo — Finanças Pessoais | Dados | [abrir](https://lebot007.github.io/ControleFinanceiro2.0/) |
| DebateIA | IA | [abrir](https://lebot007.github.io/debateia/) |
| Portfólio Shingeki | Design | [abrir](https://lebot007.github.io/shingeki/) |
| Portfólio Kaneki | Design | [abrir](https://lebot007.github.io/site-tematico-Kaneki/) |
| ParkSim | Dados | [abrir](https://lebot007.github.io/a3controlecarros/) |
| João Vitor — Site Profissional | Web | [abrir](https://lebot007.github.io/site-joao/) |
| TSUKI · Controle de Pagamentos | Dados | [abrir](https://lebot007.github.io/controlecrunch/) |
| Contra-Argumento #1 | IA | [abrir](https://lebot007.github.io/IA-auditoria-presidentes/) |
| AtivaTech | Web | [abrir](https://lebot007.github.io/ativa-tech/) |
| AutoConnect | Web | [abrir](https://lebot007.github.io/site-carro/) |
| Supplies — Locação de Impressoras | Web | [abrir](https://lebot007.github.io/SiteSupplies/) |
| Alisson Alves Tattoo | Design | [abrir](https://lebot007.github.io/site-tattoo-alisson/) |
| CyberSec Academy | Jogos | [abrir](https://lebot007.github.io/hacker_game_site/) |
| Bombines — Jogo de Minas | Jogos | [abrir](https://lebot007.github.io/A3_Terc_S1/) |

---

© 2026 João Vitor Alves Rodrigues · Lebot007

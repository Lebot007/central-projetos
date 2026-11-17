(() => {
  "use strict";

  const USER = "Lebot007";
  const CATS = {
    Web: "var(--c-web)",
    Dados: "var(--c-dados)",
    IA: "var(--c-ia)",
    Design: "var(--c-design)",
    Jogos: "var(--c-jogos)"
  };
  const projects = (window.PROJECTS || []).map((p) => ({
    ...p,
    site: p.site || `https://${USER.toLowerCase()}.github.io/${p.repo}/`,
    code: `https://github.com/${USER}/${p.repo}`,
    cover: p.cover === false ? null : `covers/${p.repo}.webp`,
    thumb: p.cover === false ? null : `covers/thumb/${p.repo}.webp`,
    haystack: norm([p.title, p.repo, p.description, p.category, ...(p.stack || [])].join(" "))
  }));

  const $ = (s) => document.querySelector(s);
  const grid = $("#grid"), chips = $("#chips"), q = $("#q"), sort = $("#sort");
  const result = $("#result"), empty = $("#empty");
  const state = { q: "", cat: "Todos", sort: "destaque" };

  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function fmtDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");
  }
  const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  /* ---------- estado na URL (links compartilháveis) ---------- */
  function readUrl() {
    const sp = new URLSearchParams(location.search);
    state.q = sp.get("q") || "";
    const cat = sp.get("cat");
    state.cat = cat && (cat in CATS) ? cat : "Todos";
    const s = sp.get("ordem");
    state.sort = ["destaque", "recentes", "az"].includes(s) ? s : "destaque";
    q.value = state.q;
    sort.value = state.sort;
  }
  function writeUrl() {
    const sp = new URLSearchParams();
    if (state.q) sp.set("q", state.q);
    if (state.cat !== "Todos") sp.set("cat", state.cat);
    if (state.sort !== "destaque") sp.set("ordem", state.sort);
    const qs = sp.toString();
    history.replaceState(null, "", qs ? `?${qs}${location.hash}` : location.pathname + location.hash);
  }

  /* ---------- hero ---------- */
  function renderHero() {
    $("#liveCount").textContent = projects.length;
    const cats = new Set(projects.map((p) => p.category));
    const last = projects.map((p) => p.updated).sort().pop();
    $("#stats").innerHTML = [
      ["Projetos", projects.length],
      ["Categorias", cats.size],
      ["Último deploy", last ? fmtDate(last) : "—"]
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");

    const picks = projects.filter((p) => p.featured && p.thumb).slice(0, 3);
    $("#heroStack").innerHTML = picks
      .map((p, i) => `<div class="stack-card"><img src="${p.thumb}" alt="" width="800" height="500" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"></div>`)
      .join("");
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- chips ---------- */
  function renderChips() {
    const count = { Todos: projects.length };
    projects.forEach((p) => { count[p.category] = (count[p.category] || 0) + 1; });
    const list = ["Todos", ...Object.keys(CATS).filter((c) => count[c])];
    chips.innerHTML = list.map((c) => `
      <button class="chip" type="button" data-cat="${c}" aria-pressed="${c === state.cat}" style="--c:${CATS[c] || "var(--muted)"}">
        ${c === "Todos" ? "" : '<span class="dot" aria-hidden="true"></span>'}${c}<span class="n">${count[c]}</span>
      </button>`).join("");
  }

  /* ---------- cards ---------- */
  function placeholder(p) {
    return `<div class="placeholder" style="--c:${CATS[p.category]}"><b>${esc(p.title)}</b><span>prévia em breve</span></div>`;
  }
  function card(p, i) {
    const media = p.thumb
      ? `<img src="${p.thumb}" alt="Tela inicial do site ${esc(p.title)}" width="800" height="500" loading="${i < 6 ? "eager" : "lazy"}" decoding="async" data-fallback>`
      : placeholder(p);
    return `
    <article class="card" style="--i:${Math.min(i, 12)};--c:${CATS[p.category]}">
      <button class="shot" type="button" data-open="${esc(p.repo)}" aria-label="Ampliar a tela de ${esc(p.title)}">
        <div class="frame">
          <div class="frame-bar" aria-hidden="true"><span class="dots"><i></i><i></i><i></i></span><span class="url">${esc(host(p.site))}</span></div>
          <div class="thumb">${media}</div>
        </div>
      </button>
      <div class="body">
        <div class="meta">
          <span class="cat">${esc(p.category)}${p.featured ? ' <span class="star" title="Destaque">★</span>' : ""}</span>
          <time datetime="${p.updated}">${fmtDate(p.updated)}</time>
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <ul class="tags" aria-label="Tecnologias">${(p.stack || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="actions">
          <a class="btn btn-primary btn-sm" href="${p.site}" target="_blank" rel="noopener noreferrer" aria-label="Abrir o site ${esc(p.title)} (nova aba)">
            Abrir site
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a class="btn btn-ghost btn-sm" href="${p.code}" target="_blank" rel="noopener noreferrer" aria-label="Ver o código de ${esc(p.title)} no GitHub (nova aba)">Código</a>
        </div>
      </div>
    </article>`;
  }

  function filtered() {
    const terms = norm(state.q).split(/\s+/).filter(Boolean);
    const list = projects.filter((p) =>
      (state.cat === "Todos" || p.category === state.cat) && terms.every((t) => p.haystack.includes(t)));
    const byDate = (a, b) => b.updated.localeCompare(a.updated);
    if (state.sort === "az") list.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    else if (state.sort === "recentes") list.sort(byDate);
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || byDate(a, b));
    // esta própria central fica sempre por último
    const self = list.findIndex((p) => p.repo === "central-projetos");
    if (self > -1 && state.sort !== "az") list.push(list.splice(self, 1)[0]);
    return list;
  }

  function render() {
    const list = filtered();
    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    result.textContent = list.length === projects.length
      ? `${list.length} projetos`
      : `${list.length} de ${projects.length} projetos`;
    chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
    grid.querySelectorAll("img[data-fallback]").forEach((img) => {
      img.addEventListener("error", () => {
        const p = projects.find((x) => img.closest(".card").querySelector("[data-open]").dataset.open === x.repo);
        if (p) { p.thumb = p.cover = null; img.replaceWith(document.createRange().createContextualFragment(placeholder(p))); }
      }, { once: true });
    });
  }

  /* ---------- visualizador ---------- */
  const viewer = $("#viewer");
  let lastFocus = null;
  function openViewer(repo) {
    const p = projects.find((x) => x.repo === repo);
    if (!p) return;
    if (!p.cover) { window.open(p.site, "_blank", "noopener"); return; }
    lastFocus = document.activeElement;
    $("#viewerUrl").textContent = host(p.site);
    const img = $("#viewerImg");
    img.src = p.cover;
    img.alt = `Tela inicial do site ${p.title}`;
    $("#viewerTitle").textContent = p.title;
    $("#viewerDesc").textContent = p.description;
    $("#viewerOpen").href = p.site;
    $("#viewerCode").href = p.code;
    if (typeof viewer.showModal === "function") viewer.showModal();
    else window.open(p.site, "_blank", "noopener");
    document.documentElement.style.overflow = "hidden";
    $("#viewerClose").focus();
  }
  function closeViewer() { if (viewer.open) viewer.close(); }
  viewer.addEventListener("close", () => {
    document.documentElement.style.overflow = "";
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  });
  viewer.addEventListener("click", (e) => { if (e.target === viewer) closeViewer(); });
  $("#viewerClose").addEventListener("click", closeViewer);

  /* ---------- eventos ---------- */
  let t;
  q.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { state.q = q.value.trim(); writeUrl(); render(); }, 120);
  });
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    state.cat = b.dataset.cat;
    writeUrl(); render();
  });
  sort.addEventListener("change", () => { state.sort = sort.value; writeUrl(); render(); });
  $("#clear").addEventListener("click", () => {
    state.q = ""; state.cat = "Todos"; q.value = "";
    writeUrl(); render(); q.focus();
  });
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) openViewer(b.dataset.open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !viewer.open) {
      e.preventDefault(); q.focus();
    }
  });

  readUrl();
  renderHero();
  renderChips();
  render();
})();

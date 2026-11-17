"""Gera as capas da Central (tela inicial de cada site).

Uso:
  1. Clone os repositórios lado a lado numa pasta e sirva essa pasta:
       python3 -m http.server 8000 --bind 127.0.0.1
  2. Rode (precisa de `pip install playwright pillow` e Chrome/Chromium):
       python3 tools/capturar.py nevoa-chat,shingeki,...
     Cada site é aberto em 1440x900 em http://127.0.0.1:8000/<repo>/ e salvo em
     covers/<repo>.webp (1440x900) e covers/thumb/<repo>.webp (800x500).

Para capturar direto do GitHub Pages, troque BASE por https://lebot007.github.io
"""
import asyncio
import sys
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:8000"
OUT = Path(__file__).resolve().parent.parent / "covers"
# Sites cuja tela inicial é uma "porta de entrada": clica para mostrar o conteúdo real.
CLICK = {"site-tematico-Kaneki": "text=/click to enter/i", "site-carro": "text=Social"}


async def main(repos):
    (OUT / "thumb").mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for repo in repos:
            page = await browser.new_page(viewport={"width": 1440, "height": 900})
            try:
                await page.goto(f"{BASE}/{repo}/", wait_until="load", timeout=30000)
            except Exception as e:  # sites com recursos lentos ainda renderizam
                print(repo, "aviso:", e)
            await page.wait_for_timeout(5000)  # espera loaders e animações de entrada
            if repo in CLICK:
                try:
                    await page.click(CLICK[repo], timeout=3000)
                    await page.wait_for_timeout(4000)
                except Exception as e:
                    print(repo, "clique falhou:", e)
            png = OUT / f"{repo}.png"
            await page.screenshot(path=str(png))
            await page.close()
            im = Image.open(png).convert("RGB")
            im.save(OUT / f"{repo}.webp", "WEBP", quality=80, method=6)
            im.resize((800, 500), Image.LANCZOS).save(OUT / "thumb" / f"{repo}.webp", "WEBP", quality=78, method=6)
            png.unlink()
            print("ok", repo)
        await browser.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    asyncio.run(main(sys.argv[1].split(",")))

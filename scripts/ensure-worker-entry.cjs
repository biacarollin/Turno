// @cloudflare/vite-plugin valida se o arquivo apontado por "main" no
// wrangler.jsonc já existe durante a resolução de config do Vite — ou
// seja, ANTES do próprio `vite build` gerar esse arquivo. Em um checkout
// limpo (CI, ambiente de build do Cloudflare) isso falha sempre, porque
// o arquivo genuinamente ainda não existe.
//
// Este script cria um placeholder vazio antes do build rodar, só para
// satisfazer essa validação prematura. O `vite build` sobrescreve o
// arquivo de verdade logo em seguida.
const fs = require("node:fs");
const path = require("node:path");

const dir = path.join(__dirname, "..", "dist", "server");
const file = path.join(dir, "index.js");

fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(file)) {
  fs.writeFileSync(
    file,
    "// placeholder — sobrescrito pelo vite build\nexport default { fetch() { return new Response(null, { status: 503 }); } };\n"
  );
}

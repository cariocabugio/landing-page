# Landing Page Voo Singular - Checkpoint tecnico e funcional

## 1. Visao geral

Nome: Voo Singular Leads.

Rota: `/lp/voo-singular`.

Objetivo: apresentar experiencias de viagem, gerar desejo e converter visitantes em conversas no WhatsApp.

Fluxo atual:

```txt
Landing Page
↓
WhatsApp
↓
Analytics
↓
CRM Externo
```

## 2. Stack

- Next.js, atualmente declarado como `^16.0.7`.
- TypeScript.
- Tailwind CSS.
- Firebase.
- Vercel.
- Cloudinary para imagens remotas.

## 3. Arquivo principal

```txt
src/app/lp/voo-singular/page.tsx
```

## 4. Estrutura atual da landing

Ordem real confirmada no arquivo principal:

1. Header
2. Hero
3. Destinos e Experiencias em Destaque
4. Video Inspiracional
5. Como Funciona
6. Por que falar com um agente
7. Proximo passo
8. Confianca institucional
9. FAQ
10. CTA Final
11. Rodape

## 5. Decisoes de CRO

- Destinos e ofertas foram movidos para logo depois do Hero.
- A pagina passou a vender primeiro desejo e inspiracao, deixando a explicacao do atendimento para depois.
- A secao Beneficios foi removida por redundancia.
- Destinos e Vitrine selecionada foram unificados em uma unica secao visual.
- A mudanca reduziu comprimento, repeticao e blocos consecutivos no celular.
- A secao `Por que falar com um agente` foi preservada.

## 6. Destinos e experiencias

Cards encontrados em `destinations`:

- Viagens nacionais.
- Viagens internacionais.
- Lua de mel.
- Viagens em familia.
- Cruzeiros.
- Experiencias personalizadas.

Os seis cards usam imagens remotas do Cloudinary via `Image` de `next/image`. Cada item possui `imageUrl` e `imageAlt`.

## 7. Experiencias e ofertas em destaque

Cards encontrados em `featuredOffers`:

- Cruzeiros Tematicos.
- Jalapao.
- Essencias da Europa.
- Resorts e Hoteis.

Os quatro cards usam imagens remotas do Cloudinary via `Image` de `next/image`. Cada item possui `imageUrl` e `imageAlt`. Os IDs comerciais ficam em `ctaId`.

## 8. Integracao Cloudinary

O dominio remoto esta autorizado em `next.config.mjs`:

```txt
res.cloudinary.com
```

O Cloud Name publicamente visivel nas URLs do codigo e:

```txt
deklwmysq
```

Estado da integracao:

- Nao utiliza `next-cloudinary`.
- Nao instala SDK Cloudinary.
- Usa URLs publicas do Cloudinary diretamente no codigo.
- Usa `Image` de `next/image`.
- As imagens usam `fill`.
- As imagens usam `sizes`.
- As imagens usam `object-cover`.
- Os containers de imagem sao `relative`.
- Os destinos usam altura estavel `h-40`.
- As ofertas usam altura estavel `min-h-64`.
- Os blocos usam overlays para contraste.
- Nenhuma imagem usa `priority`.

Nao registrar API Key, API Secret, `.env` ou credenciais neste documento.

## 9. Tracking

Identificadores que devem ser preservados:

```txt
header-whatsapp
hero-whatsapp
card-interest
offer-cruzeiros
offer-jalapao
offer-europa
offer-resorts
video-cruzeiro
mid-page-whatsapp
final-whatsapp
footer-institutional-whatsapp
```

Tambem devem ser preservados:

```txt
pageId: 'voo-singular'
pagePath: '/lp/voo-singular'
WhatsappTrackingLink
```

Alteracoes visuais nao devem substituir `WhatsappTrackingLink` por links comuns. O tracking dos CTAs depende desse componente e dos `ctaId` atuais.

## 10. Validacao oficial

Comandos oficiais para validar a landing:

```bash
npm run lint
npm run build:webpack
```

O build final oficial deve usar Webpack. Nao usar o build Turbopack como validacao final desta landing.

Verificacoes auxiliares:

```bash
git diff --check
git status --short
```

## 11. Commits principais

Commits confirmados no `git log -10 --oneline`:

```txt
ea3aae2 refactor: priorizar destinos e ofertas na landing
d4e289d refactor: remover secao de beneficios da landing
2fc7209 refactor: unificar destinos e ofertas na landing
7d7589e feat: adicionar imagens Cloudinary aos destinos e ofertas
```

## 12. Estado tecnico atual

Estado do repositorio no momento deste checkpoint:

- Branch atual: `main`.
- Relacao com remoto: branch atualizada com `origin/main`.
- Working tree antes da criacao deste documento: limpo.
- `git status` consultado: `nothing to commit, working tree clean`.
- Resultado conhecido de lint: `npm run lint` passou com codigo 0 nas validacoes recentes; havia warnings preexistentes.
- Resultado conhecido de build: `npm run build:webpack` passou com codigo 0 nas validacoes recentes.
- A rota `/lp/voo-singular` foi gerada como estatica no build Webpack recente.

Nao ha confirmacao neste checkpoint de novo push ou deploy alem do estado observado pelo Git local.

## 13. Restricoes futuras

- Nao alterar `.env`, chaves ou credenciais.
- Nao instalar dependencias sem necessidade real.
- Preservar tracking e `WhatsappTrackingLink`.
- Manter mudancas pequenas, revisaveis e limitadas ao escopo pedido.
- Validar mobile e desktop.
- Revisar recorte das imagens por causa de `object-cover`.
- Manter acessibilidade com `imageAlt`.
- Nao misturar refatoracoes paralelas.
- Se o build tocar `next-env.d.ts`, revisar o diff e restaurar quando for apenas artefato gerado fora do escopo.

## 14. Proximos passos sugeridos

- Fazer inspecao visual final em mobile e desktop.
- Verificar recortes e contraste das imagens.
- Avaliar performance e LCP.
- Considerar extrair dados ou componentes apenas quando houver necessidade real.
- Futuramente, integrar gestao de conteudo por painel administrativo.

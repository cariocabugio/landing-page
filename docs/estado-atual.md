# Estado atual do projeto

## 1. Nome atual do projeto

Voo Singular Leads. O projeto iniciou um rebranding mínimo a partir da base original.

## 2. Objetivo atual do projeto

O projeto atual é uma plataforma de página pública de links/cartão digital em transição textual para Voo Singular Leads. A direção do produto é servir como porta de entrada comercial para turismo: criar landing pages, direcionar visitantes ao WhatsApp e medir cliques, visualizações e conversões. Cotação, histórico comercial, propostas e gestão de clientes seguem em um CRM externo já existente.

## 3. Objetivo futuro com Voo Singular

Adaptar a base para uma plataforma de landing pages e análise de conversão da Voo Singular, inicialmente focada em agentes de viagem e preparada para evoluir para uma operação multiagência. A evolução esperada inclui perfil profissional do agente, landing pages de campanha, captura de interessados, CTA para WhatsApp, métricas de conversão e rastreamento de eventos.

## 4. Stack detectada

- Next.js 16
- React 19
- TypeScript 5
- Firebase 12 com Auth e Firestore
- Tailwind CSS 4
- PWA com `@ducanh2912/next-pwa`
- Drag and drop com `@dnd-kit`
- Gráficos com `recharts`
- Animações com `framer-motion`
- Ícones com `react-icons`
- QR Code com `qrcode.react`
- Testes com Jest e Testing Library

## 5. Rotas principais

- `/`: landing page atual com rebranding mínimo para Voo Singular.
- `/[slug]`: página pública/campanha por slug.
- `/admin/login`: tela de login com Google.
- `/admin/dashboard`: dashboard administrativo e painel pessoal.
- `/api/chat`: rota de API para assistente com Gemini.

## 6. Serviços principais

- `src/lib/firebaseClient.ts`: inicialização do Firebase App, Auth e Firestore.
- `src/lib/authService.ts`: login com Google, criação inicial de documentos em `users` e `pages`, logout.
- `src/lib/pageService.ts`: leitura e atualização de páginas, canais de contato, temas, imagens, cliques e ações administrativas.
- `src/context/AuthContext.tsx`: contexto de autenticação e dados adicionais do usuário vindos do Firestore.

## 7. Coleções Firestore usadas atualmente

- `users`: guarda dados do usuário autenticado, como `uid`, `email`, `displayName`, `pageSlug`, `plan` e `role` opcional.
- `pages`: guarda a página pública por slug, com `userId`, `slug`, `title`, `bio`, `profileImageUrl`, `theme`, `backgroundImage` opcional e array `links`.
- `pages.links[]`: canais/CTAs embutidos no documento da página, com `title`, `url`, `type`, `order`, `icon` opcional e `clicks` opcional.

## 8. Pontos fortes reaproveitáveis

- Página pública por slug já funcional.
- Login com Google já integrado.
- Base de dashboard para edição de presença digital e canais de contato.
- QR Code, vCard e CTA para WhatsApp/canais externos já disponíveis.
- Temas visuais e imagem de fundo.
- Métrica simples de cliques por link.
- Estrutura inicial de admin com listagem e busca de usuários.

## 9. Riscos técnicos atuais

- Segurança efetiva depende das regras do Firestore, que não estão versionadas no projeto.
- Proteção de rota e papel de admin são controlados no frontend.
- `role` é opcional e não há modelo formal para agente, agência ou permissões multiagência.
- Links ficam em array dentro de `pages`, o que dificulta concorrência, analytics e escala.
- Dashboard concentra muitas responsabilidades em um único arquivo.
- Upload de imagens usa configuração Cloudinary hardcoded no frontend.
- Ainda não existem coleções específicas para conversões, eventos, campanhas ou agências.
- A página pública é client component e poderia se beneficiar de renderização server-side no futuro.

## 10. Próximas fases recomendadas

1. Consolidar o rebranding mínimo para Voo Singular sem alterar regra de negócio.
2. Adaptar a página pública para perfil profissional de agente de viagens.
3. Adicionar captura simples de interessados com direcionamento para WhatsApp.
4. Criar estrutura mínima de conversões/eventos sem substituir o CRM externo.
5. Criar estrutura futura para landing pages de campanha.
6. Separar rastreamento de cliques, visitas e conversões em eventos.
7. Preparar modelo multiagência com `agencies`, `agents`, permissões e regras Firestore adequadas.

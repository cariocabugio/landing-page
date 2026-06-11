# Modelo mínimo de analytics - Voo Singular Leads

## 1. Objetivo

O analytics da Voo Singular Leads servirá para medir a captação e a conversão das páginas de campanha, sem substituir o CRM externo da agência.

O modelo deve permitir acompanhar:

- visitas na landing page;
- cliques nos CTAs de WhatsApp;
- origem e campanha futuramente;
- taxa de conversão;
- desempenho por página.

## 2. Escopo inicial

Nesta primeira fase, o analytics deve medir apenas dois eventos:

- `page_view`
- `whatsapp_click`

A implementação deve começar simples, com baixo acoplamento e sem exigir mudança no modelo comercial existente.

## 3. O que não será medido ainda

Nesta fase, o analytics não deve medir nem armazenar:

- formulário;
- lead completo;
- funil comercial;
- cotação;
- histórico de cliente;
- vendas;
- CRM.

## 4. Collection sugerida

Collection sugerida no Firestore:

```txt
analyticsEvents
```

Essa collection deve armazenar eventos individuais de navegação e clique, mantendo analytics separado dos dados comerciais da agência.

## 5. Campos sugeridos

Modelo sugerido para cada evento:

```ts
type AnalyticsEvent = {
  id?: string;
  type: 'page_view' | 'whatsapp_click';
  pageId: string;
  pagePath: string;
  campaignId?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  userAgent?: string;
  ctaId?: string;
  ctaLabel?: string;
  createdAt: Timestamp;
};
```

Campos mínimos obrigatórios na primeira fase:

- `type`
- `pageId`
- `pagePath`
- `createdAt`

Campos opcionais podem ser preenchidos conforme a evolução do tracking.

## 6. Eventos iniciais

### `page_view`

Quando dispara:

- ao carregar `/lp/voo-singular`.

Dados mínimos:

- `type`
- `pageId`
- `pagePath`
- `referrer`
- `createdAt`

Objetivo:

- medir quantas visitas a landing recebeu.

### `whatsapp_click`

Quando dispara:

- ao clicar no CTA principal de WhatsApp;
- ao clicar no CTA final de WhatsApp;
- futuramente, ao clicar em CTAs de interesse em destinos ou campanhas.

Dados mínimos:

- `type`
- `pageId`
- `pagePath`
- `ctaId`, se possível;
- `ctaLabel`, se possível;
- `createdAt`

Objetivo:

- medir quantos visitantes avançaram para atendimento via WhatsApp.

## 7. Privacidade e segurança

Nesta fase, o analytics deve evitar dados pessoais e sensíveis.

Não salvar:

- CPF;
- dados sensíveis;
- conversa do WhatsApp;
- número do visitante;
- lead completo;
- conteúdo de cotação;
- histórico comercial.

O evento deve representar comportamento agregado de captação, não cadastro comercial.

## 8. Dashboard futuro

Com os eventos mínimos, o dashboard poderá calcular:

- total de visitas;
- total de cliques no WhatsApp;
- taxa de conversão = `whatsapp_click / page_view`;
- performance por campanha;
- performance por período;
- desempenho de CTAs.

Exemplo de leitura futura:

- visitas em `/lp/voo-singular` no período;
- cliques no CTA principal;
- cliques no CTA final;
- conversão geral da landing;
- comparação entre campanhas quando `campaignId` ou UTM existir.

## 9. Fases de implementação

### Fase 1

- criar documento do modelo.

### Fase 2

- criar função ou serviço para registrar eventos.

### Fase 3

- conectar a landing `/lp/voo-singular` ao tracking.

### Fase 4

- exibir métricas reais no dashboard.

## 10. Decisões importantes

- Não usar esse modelo como CRM.
- Não misturar analytics com cotação.
- Não misturar analytics com histórico comercial.
- Não salvar dados de negociação.
- Manter analytics separado do CRM externo.
- Manter a aplicação focada em captação, WhatsApp e leitura de conversão.

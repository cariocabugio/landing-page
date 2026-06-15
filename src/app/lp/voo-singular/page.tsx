import type { Metadata } from 'next';
import Link from 'next/link';
import WhatsappTrackingLink from '@/components/WhatsappTrackingLink';

const whatsappUrl =
  'https://wa.me/message/WVU5HETZM6QHN1';

const institutionalWhatsappUrl =
  'https://wa.me/5579988255599?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';

const instagramUrl = 'https://www.instagram.com/voosingularviagens/';

const analyticsPage = {
  pageId: 'voo-singular',
  pagePath: '/lp/voo-singular',
};

const brand = {
  name: 'Voo Singular',
  slogan: 'Descubra o mundo, descubra você.',
  logo: '/brand/voo-singular-logo.png',
  email: 'contato@voosingular.com',
  cnpj: '31.421.136/0001-07',
  seal: 'Cadastur',
};

const benefits = [
  {
    title: 'Atendimento humano e personalizado',
    text: 'Rodrigo entende seu momento, seu orçamento e o tipo de viagem que combina com você.',
  },
  {
    title: 'Economia de tempo na escolha',
    text: 'Você evita pesquisar dezenas de opções sozinho e recebe caminhos mais adequados ao seu perfil.',
  },
  {
    title: 'Ajuda para comparar opções',
    text: 'A Voo Singular orienta diferenças entre destinos, pacotes, hospedagens e experiências.',
  },
  {
    title: 'Planejamento com mais segurança',
    text: 'Você decide com mais clareza antes de reservar passagens, hospedagens e passeios.',
  },
  {
    title: 'Experiências alinhadas ao viajante',
    text: 'Viagens para casais, famílias, grupos, lua de mel, eventos e momentos especiais.',
  },
  {
    title: 'Suporte antes do embarque',
    text: 'O atendimento ajuda você a chegar mais preparado para a viagem, do plano ao próximo passo.',
  },
];

const destinations = [
  {
    category: 'Viagens nacionais',
    title: 'Brasil com curadoria',
    description:
      'Praias, natureza, cultura e roteiros especiais para descobrir o país com mais tranquilidade.',
  },
  {
    category: 'Viagens internacionais',
    title: 'Exterior com orientação',
    description:
      'Planejamento para quem quer viajar para fora com escolhas mais claras desde o início.',
  },
  {
    category: 'Lua de mel',
    title: 'Momentos a dois',
    description:
      'Destinos e hospedagens pensados para uma experiência romântica, confortável e memorável.',
  },
  {
    category: 'Viagens em família',
    title: 'Planos para todos',
    description:
      'Opções que equilibram descanso, diversão, logística e segurança para diferentes idades.',
  },
  {
    category: 'Cruzeiros',
    title: 'Experiências no mar',
    description:
      'Orientação para escolher roteiro, cabine, datas e estilo de cruzeiro com mais confiança.',
  },
  {
    category: 'Experiências personalizadas',
    title: 'Viagens sob medida',
    description:
      'Eventos, grupos, celebrações e roteiros especiais montados a partir do seu perfil.',
  },
];

const featuredOffers = [
  {
    title: 'Cruzeiros Temáticos',
    description:
      'Experiências únicas em alto-mar com música, entretenimento e momentos inesquecíveis.',
    ctaId: 'offer-cruzeiros',
    imageLabel: 'Cruzeiros em alto-mar',
    imageClass:
      'bg-[linear-gradient(135deg,#082f49_0%,#0e7490_48%,#facc15_100%)]',
    highlight: 'Alto-mar',
  },
  {
    title: 'Jalapão',
    description:
      'Natureza, aventura e paisagens impressionantes no coração do Brasil.',
    ctaId: 'offer-jalapao',
    imageLabel: 'Paisagens naturais do Jalapão',
    imageClass:
      'bg-[linear-gradient(135deg,#14532d_0%,#84cc16_52%,#f97316_100%)]',
    highlight: 'Natureza',
  },
  {
    title: 'Essências da Europa',
    description:
      'Conheça alguns dos destinos mais desejados do continente europeu.',
    ctaId: 'offer-europa',
    imageLabel: 'Roteiros pela Europa',
    imageClass:
      'bg-[linear-gradient(135deg,#1e1b4b_0%,#2563eb_50%,#f8fafc_100%)]',
    highlight: 'Internacional',
  },
  {
    title: 'Resorts e Hotéis',
    description:
      'Descanso, conforto e experiências incríveis nos melhores destinos do Nordeste.',
    ctaId: 'offer-resorts',
    imageLabel: 'Resorts e hotéis no Nordeste',
    imageClass:
      'bg-[linear-gradient(135deg,#0f766e_0%,#38bdf8_50%,#fef3c7_100%)]',
    highlight: 'Conforto',
  },
];

const trustIndicators = [
  {
    value: '+ de 2 anos',
    label: 'no mercado',
  },
  {
    value: '+ de 1.000',
    label: 'pessoas atendidas',
  },
  {
    value: '+ de 2.000',
    label: 'viagens realizadas',
  },
];

const credibilityItems = [
  'Agência com atendimento próximo e personalizado',
  'Viagens nacionais e internacionais',
  'Atendimento via WhatsApp',
  'Empresa com identificação institucional',
];

const steps = [
  {
    title: 'Você chama no WhatsApp',
    text: 'Conte destino, data, quantidade de pessoas e o tipo de experiência que está buscando.',
  },
  {
    title: 'Rodrigo entende seu perfil',
    text: 'O atendimento identifica preferências, prioridades, orçamento e dúvidas antes de indicar caminhos.',
  },
  {
    title: 'A Voo Singular busca opções adequadas',
    text: 'A curadoria considera destino, hospedagem, pacote, logística e estilo de viagem.',
  },
  {
    title: 'Você decide com mais segurança',
    text: 'Você recebe orientação para comparar possibilidades e avançar sem depender só de pesquisa solta.',
  },
];

const agentReasons = [
  'Ajuda a transformar uma ideia vaga em um plano viável.',
  'Reduz o risco de escolher hospedagem, data ou pacote incompatível.',
  'Compara alternativas considerando o perfil real de quem vai viajar.',
  'Mantém a conversa humana quando surgem dúvidas antes do embarque.',
];

const faqs = [
  {
    question: 'O atendimento é feito pelo WhatsApp?',
    answer:
      'Sim. O primeiro contato acontece pelo WhatsApp, com atendimento humano da Voo Singular.',
  },
  {
    question: 'Posso pedir apenas uma cotação?',
    answer:
      'Pode. Você informa destino, data e perfil da viagem para receber orientação inicial.',
  },
  {
    question: 'A Voo Singular monta viagens personalizadas?',
    answer:
      'Sim. O atendimento considera seu objetivo, estilo de viagem, pessoas e preferências.',
  },
  {
    question: 'Vocês ajudam com hospedagem, passagens e pacotes?',
    answer:
      'Sim. A Voo Singular orienta escolhas de destinos, hospedagens, pacotes e experiências.',
  },
  {
    question: 'O atendimento é com uma pessoa real?',
    answer:
      'Sim. Você fala com Rodrigo Borges, consultor da Voo Singular, pelo WhatsApp.',
  },
  {
    question: 'A Voo Singular atende viagens nacionais e internacionais?',
    answer:
      'Sim. A agência orienta viagens pelo Brasil, exterior, lua de mel, família, grupos e eventos.',
  },
];

export const metadata: Metadata = {
  title: 'Voo Singular - Planeje sua próxima viagem',
  description:
    'Landing page da Voo Singular para atendimento personalizado em viagens nacionais, internacionais, grupos, eventos e experiências sob medida.',
};

export default function VooSingularLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-20 border-b border-sky-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
              <img
                src={brand.logo}
                alt="Logo Voo Singular"
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-black tracking-tight text-blue-800">
                {brand.name}
              </span>
              <span className="hidden text-xs font-semibold text-slate-500 sm:block">
                {brand.slogan}
              </span>
            </span>
          </Link>
          <WhatsappTrackingLink
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-blue-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
            ctaId="header-whatsapp"
            ctaLabel="Falar no WhatsApp"
            pageId={analyticsPage.pageId}
            pagePath={analyticsPage.pagePath}
          >
            Falar no WhatsApp
          </WhatsappTrackingLink>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f7ff_0%,transparent_32%),linear-gradient(135deg,#f8fbff_0%,#ffffff_46%,#edf7f2_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="absolute right-0 top-12 hidden h-72 w-72 rounded-full bg-amber-100/60 blur-3xl lg:block" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-14">
          <div>
            <p className="inline-flex max-w-full items-center rounded-full border border-cyan-200 bg-white/85 px-4 py-2 text-[0.68rem] font-black uppercase tracking-normal text-blue-900 shadow-sm shadow-cyan-900/5 sm:text-xs">
              Atendimento personalizado por agente de viagens
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Planeje sua próxima viagem com atendimento humano, seguro e
              personalizado.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              A Voo Singular ajuda você a escolher destinos, pacotes,
              hospedagens e experiências com orientação profissional do início
              ao embarque.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsappTrackingLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-blue-800 px-7 py-4 text-center text-base font-extrabold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
                ctaId="hero-whatsapp"
                ctaLabel="Quero planejar minha viagem"
                pageId={analyticsPage.pageId}
                pagePath={analyticsPage.pagePath}
              >
                Falar com Rodrigo no WhatsApp
              </WhatsappTrackingLink>
              <a
                href="#destinos"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white/90 px-7 py-4 text-center text-base font-extrabold text-blue-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50"
              >
                Ver ideias de viagem
              </a>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              Atendimento direto com consultor da Voo Singular.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
              {[
                'Cadastur',
                'CNPJ ativo',
                'WhatsApp Business',
                'Atendimento humano',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-white bg-white/80 px-4 py-3 text-sm font-black text-slate-800 shadow-sm shadow-blue-950/5"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-white bg-white/82 p-3 shadow-2xl shadow-blue-950/12 backdrop-blur">
              <div className="overflow-hidden rounded-lg border border-blue-100 bg-slate-950 text-white">
                <div className="relative min-h-44 bg-[linear-gradient(135deg,#0b2d5f_0%,#1468a8_54%,#38c6d6_100%)] p-5 sm:min-h-56 sm:p-6">
                  <div className="absolute bottom-0 right-0 h-32 w-32 rounded-tl-full bg-white/10" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase text-cyan-100">
                        Consultoria Voo Singular
                      </p>
                      <h2 className="mt-3 max-w-sm text-2xl font-black leading-tight sm:text-3xl">
                        Rodrigo Borges acompanha seu plano de viagem.
                      </h2>
                    </div>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg shadow-blue-950/20">
                      <img
                        src={brand.logo}
                        alt="Logo Voo Singular"
                        className="h-12 w-12 object-contain"
                      />
                    </span>
                  </div>
                </div>
                <div className="grid gap-3 bg-white p-4 text-slate-950 sm:grid-cols-2 sm:p-5">
                  {[
                    ['Destino', 'Escolha orientada'],
                    ['Pacotes', 'Curadoria segura'],
                    ['Hospedagem', 'Perfil da viagem'],
                    ['Próximo passo', 'WhatsApp'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs font-black uppercase text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-base font-black text-slate-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200 bg-white px-4 pb-4 text-slate-950 sm:px-5 sm:pb-5">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-black text-amber-950">
                      Planejamento com clareza antes da compra.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Você conversa com uma pessoa, explica sua ideia e recebe
                      direcionamento para avançar com segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="destinos"
        className="bg-slate-50 px-5 py-14 text-slate-950 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Destinos e experiências em destaque
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Escolha o tipo de experiência. Rodrigo ajuda a encontrar o melhor
              caminho.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Os cards abaixo não são um catálogo fechado. Eles ajudam você a
              iniciar a conversa com uma direção clara.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <article
                key={destination.title}
                className="flex min-h-64 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase text-cyan-700">
                    {destination.category}
                  </p>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                </div>
                <h3 className="mt-3 text-xl font-black text-slate-950">
                  {destination.title}
                </h3>
                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {destination.description}
                </p>
                <WhatsappTrackingLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-sm font-extrabold text-blue-800 transition hover:bg-blue-700 hover:text-white"
                  ctaId="card-interest"
                  ctaLabel={`Tenho interesse - ${destination.title}`}
                  pageId={analyticsPage.pageId}
                  pagePath={analyticsPage.pagePath}
                >
                  Tenho interesse
                </WhatsappTrackingLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Vitrine selecionada
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Experiências e Ofertas em Destaque
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Algumas das experiências que nossos clientes mais procuram para
              viver momentos inesquecíveis.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredOffers.map((offer) => (
              <article
                key={offer.ctaId}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-blue-950/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
              >
                <div
                  aria-label={offer.imageLabel}
                  className={`relative min-h-64 overflow-hidden ${offer.imageClass}`}
                  role="img"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.48),transparent_34%),linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.72)_100%)] transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-5 bottom-5">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-black uppercase text-blue-950 shadow-lg shadow-blue-950/15">
                      {offer.highlight}
                    </span>
                    <h3 className="mt-3 text-2xl font-black leading-tight text-white drop-shadow">
                      {offer.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="min-h-16 leading-7 text-slate-600">
                    {offer.description}
                  </p>
                  <WhatsappTrackingLink
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-blue-800 px-5 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-900"
                    ctaId={offer.ctaId}
                    ctaLabel="Quero informações"
                    pageId={analyticsPage.pageId}
                    pagePath={analyticsPage.pagePath}
                  >
                    Quero informações
                  </WhatsappTrackingLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase text-blue-700">
              Vídeo inspiracional
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Inspire-se para sua próxima viagem
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Veja um pouco das experiências que podem estar esperando por você
              na sua próxima aventura.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-white bg-slate-950 shadow-xl shadow-blue-950/15">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/tMCgEtyEXOo"
                title="Vídeo inspiracional de viagem Voo Singular"
                className="h-full w-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mx-auto mt-7 max-w-md">
            <WhatsappTrackingLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-blue-800 px-7 py-4 text-center text-base font-extrabold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
              ctaId="video-cruzeiro"
              ctaLabel="Quero informações sobre esta experiência"
              pageId={analyticsPage.pageId}
              pagePath={analyticsPage.pagePath}
            >
              Quero informações sobre esta experiência
            </WhatsappTrackingLink>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="bg-white px-5 py-14 text-slate-950 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Um atendimento simples, humano e direto pelo WhatsApp.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Você não precisa chegar com tudo decidido. A conversa começa pela
              sua ideia de viagem e evolui com orientação profissional.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-sm font-black text-white shadow-lg shadow-blue-900/20">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-black text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50 px-5 py-14 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-blue-700">
                Benefícios
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Mais clareza para escolher e mais segurança para viajar.
              </h2>
            </div>
            <p className="leading-8 text-slate-600">
              A Voo Singular ajuda você a sair da pesquisa infinita e conversar
              com alguém que entende o que precisa ser comparado antes da
              decisão.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <span className="block h-1.5 w-12 rounded-full bg-cyan-400" />
                <h3 className="mt-4 text-lg font-black text-blue-950">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-950 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Por que falar com um agente
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Viajar não é apenas comprar passagem ou hospedagem.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Um agente ajuda você a escolher melhor, evitar decisões ruins e
              montar uma experiência mais segura. Com Rodrigo Borges, a conversa
              acontece de forma próxima e objetiva.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5">
            <div className="rounded-lg bg-[linear-gradient(135deg,#0b2d5f_0%,#1468a8_58%,#38c6d6_100%)] p-5 text-white sm:p-6">
              <p className="text-sm font-black uppercase text-cyan-100">
                Decisão assistida
              </p>
              <h3 className="mt-3 text-2xl font-black">
                Menos tentativa e erro. Mais orientação antes de fechar.
              </h3>
            </div>
            <div className="mt-4 grid gap-3">
              {agentReasons.map((reason) => (
                <div
                  key={reason}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-950 px-5 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-cyan-100">
              Próximo passo
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Quero planejar minha viagem
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-100">
              Conte seu destino, data e perfil de viagem. Rodrigo te orienta
              pelo WhatsApp.
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-xl shadow-blue-950/30">
            <WhatsappTrackingLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-7 py-4 text-center text-base font-extrabold text-blue-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
              ctaId="mid-page-whatsapp"
              ctaLabel="Quero planejar minha viagem"
              pageId={analyticsPage.pageId}
              pagePath={analyticsPage.pagePath}
            >
              Quero planejar minha viagem
            </WhatsappTrackingLink>
            <p className="mt-3 text-center text-sm font-semibold leading-6 text-sky-100">
              Atendimento humano, sem formulário e sem cadastro nesta página.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-950 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Confiança institucional
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Atendimento próximo, curadoria e identificação clara para viajar
              com mais confiança.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              A Voo Singular une conversa humana, orientação personalizada e
              atuação institucional para ajudar você a escolher o melhor caminho
              antes de fechar a viagem.
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-sky-50 p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-700 px-4 py-2 text-sm font-black text-white">
                {brand.seal}
              </span>
              <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-black text-blue-900">
                Empresa identificada
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {credibilityItems.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-blue-100 bg-white p-4 text-sm font-bold leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {trustIndicators.map((item) => (
                <div
                  key={item.value}
                  className="rounded-lg border border-blue-100 bg-white px-4 py-3"
                >
                  <p className="text-xl font-black text-blue-950">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-semibold text-slate-500">
              CNPJ {brand.cnpj} · {brand.seal}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-blue-700">
                Perguntas frequentes
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Antes de chamar no WhatsApp.
              </h2>
            </div>
            <p className="leading-8 text-slate-600">
              Respostas rápidas para você entender o atendimento e seguir para
              uma conversa objetiva com a Voo Singular.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-black text-slate-950">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#061d3d_0%,#0f4c91_58%,#18a9c4_100%)] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-cyan-100">
              Atendimento humano pelo WhatsApp Business
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Pronto para planejar sua próxima viagem?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50">
              Fale com Rodrigo Borges, consultor da Voo Singular, e receba
              orientação para escolher sua viagem com mais segurança.
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl shadow-blue-950/30 backdrop-blur sm:p-5">
            <WhatsappTrackingLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-8 py-4 text-center text-base font-extrabold text-blue-950 shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-50"
              ctaId="final-whatsapp"
              ctaLabel="Chamar Rodrigo no WhatsApp"
              pageId={analyticsPage.pageId}
              pagePath={analyticsPage.pagePath}
            >
              Chamar Rodrigo no WhatsApp
            </WhatsappTrackingLink>
            <p className="mt-3 text-center text-sm font-semibold leading-6 text-sky-100">
              Atendimento humano pelo WhatsApp Business.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 text-slate-950 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
                <img
                  src={brand.logo}
                  alt="Logo Voo Singular"
                  className="h-12 w-12 object-contain"
                />
              </span>
              <div>
                <p className="text-xl font-black text-blue-800">
                  {brand.name}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {brand.slogan}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                  Landing page de captação para atendimento personalizado em
                  viagens. O próximo passo acontece em conversa direta pelo
                  WhatsApp.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-blue-100 bg-sky-50 px-3 py-1.5 text-xs font-black text-blue-900">
                    {brand.seal}
                  </span>
                  <span className="rounded-full border border-blue-100 bg-sky-50 px-3 py-1.5 text-xs font-black text-blue-900">
                    CNPJ {brand.cnpj}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-2 md:text-right">
              <a
                href={`mailto:${brand.email}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-200 hover:bg-sky-50 hover:text-blue-800"
              >
                {brand.email}
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-200 hover:bg-sky-50 hover:text-blue-800"
              >
                Instagram
              </a>
              <WhatsappTrackingLink
                href={institutionalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-200 hover:bg-sky-50 hover:text-blue-800"
                ctaId="footer-institutional-whatsapp"
                ctaLabel="WhatsApp institucional"
                pageId={analyticsPage.pageId}
                pagePath={analyticsPage.pagePath}
              >
                WhatsApp institucional
              </WhatsappTrackingLink>
              <span className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                Identidade institucional
              </span>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-5 text-xs font-semibold leading-6 text-slate-500">
            <p>
              {brand.name} · {brand.slogan} · {brand.seal} · CNPJ {brand.cnpj}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

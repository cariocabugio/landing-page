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
    text: 'Um agente entende seu perfil, seu momento e o tipo de experiência que faz sentido para você.',
  },
  {
    title: 'Pacotes nacionais e internacionais',
    text: 'Curadoria para viagens pelo Brasil, exterior, eventos, lua de mel, férias e roteiros especiais.',
  },
  {
    title: 'Experiências para famílias, casais e grupos',
    text: 'Planejamento orientado para quem viaja sozinho, a dois, em família ou com grupos maiores.',
  },
  {
    title: 'Direcionamento rápido pelo WhatsApp',
    text: 'Você sai da dúvida inicial e conversa no canal certo para avançar com agilidade.',
  },
];

const destinations = [
  {
    category: 'Brasil e natureza',
    title: 'São Luís + Lençóis Maranhenses',
    description:
      'Uma combinação de cultura, dunas, lagoas cristalinas e paisagens inesquecíveis.',
  },
  {
    category: 'Praia e cidade',
    title: 'Balneário Camboriú',
    description:
      'Dias de litoral, entretenimento, gastronomia e estrutura para diferentes estilos de viagem.',
  },
  {
    category: 'Experiência premium',
    title: 'Fernando de Noronha',
    description:
      'Um destino singular para quem busca natureza preservada, mar transparente e momentos especiais.',
  },
  {
    category: 'Cultura e evento',
    title: 'Recife + Paixão de Cristo',
    description:
      'Roteiro com história, tradição, espetáculo e vivências marcantes no Nordeste.',
  },
  {
    category: 'Esporte internacional',
    title: 'Copa do Mundo 2026 em Miami',
    description:
      'Planejamento para viver a energia do futebol em uma das cidades mais desejadas dos Estados Unidos.',
  },
  {
    category: 'Música e experiência',
    title: 'Lollapalooza Brasil 2026',
    description:
      'Pacotes e orientação para transformar o festival em uma viagem completa.',
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
    title: 'Você conta seu plano de viagem',
    text: 'Compartilhe destino, datas, quantidade de pessoas e o estilo de experiência que imagina.',
  },
  {
    title: 'O agente entende seu perfil',
    text: 'A Voo Singular avalia preferências, prioridades e possibilidades para orientar melhor sua escolha.',
  },
  {
    title: 'A Voo Singular orienta as melhores opções',
    text: 'Você recebe direcionamento para pacotes, destinos, hospedagens e experiências compatíveis.',
  },
  {
    title: 'Você recebe atendimento pelo WhatsApp',
    text: 'O contato segue em uma conversa humana, simples e direta para dar o próximo passo.',
  },
];

const tripTypes = [
  'Viagens nacionais',
  'Viagens internacionais',
  'Lua de mel',
  'Família',
  'Grupos',
  'Eventos e experiências',
];

const faqs = [
  {
    question: 'A cotação é feita pelo WhatsApp?',
    answer:
      'Sim. Esta página inicia seu contato e direciona você para o atendimento personalizado pelo WhatsApp.',
  },
  {
    question:
      'A Voo Singular trabalha com viagens nacionais e internacionais?',
    answer:
      'Sim. A agência orienta pacotes nacionais, internacionais, eventos, experiências e viagens sob medida.',
  },
  {
    question: 'Posso solicitar pacote para família ou grupo?',
    answer:
      'Sim. Você pode solicitar orientação para família, casal, grupo de amigos, empresa ou experiência especial.',
  },
  {
    question: 'Vocês ajudam a escolher destino e hospedagem?',
    answer:
      'Sim. O atendimento considera seu perfil, período desejado, preferências e objetivos da viagem.',
  },
  {
    question: 'Essa página é um CRM?',
    answer:
      'Não. Esta página é um canal de captação e atendimento inicial. A cotação e o acompanhamento comercial são feitos em sistemas e processos próprios da agência.',
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

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#eff8ff_0%,#ffffff_45%,#dff4ff_100%)]">
        <div className="absolute left-1/2 top-10 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black uppercase text-blue-800 shadow-sm">
              Viagens sob medida com atendimento humano
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Sua próxima viagem começa com uma escolha singular.
            </h1>
            <p className="mt-4 text-xl font-black text-blue-800">
              {brand.slogan}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Conte com atendimento personalizado para planejar viagens
              nacionais, internacionais, experiências em família, lua de mel,
              grupos e pacotes sob medida.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsappTrackingLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                ctaId="hero-whatsapp"
                ctaLabel="Quero planejar minha viagem"
                pageId={analyticsPage.pageId}
                pagePath={analyticsPage.pagePath}
              >
                Quero planejar minha viagem
              </WhatsappTrackingLink>
              <a
                href="#destinos"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-4 text-base font-extrabold text-blue-800 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-sky-50"
              >
                Ver opções de viagem
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-2 top-4 hidden rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-bold text-blue-900 shadow-xl shadow-blue-900/10 sm:block">
              Atendimento direto
            </div>
            <div className="absolute -left-2 bottom-8 hidden rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-bold text-cyan-900 shadow-xl shadow-cyan-900/10 sm:block">
              Roteiros com curadoria
            </div>
            <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-950/10">
              <div className="rounded-lg bg-blue-700 p-5 text-white">
                <p className="text-xs font-black uppercase text-sky-100">
                  Próxima experiência
                </p>
                <h2 className="mt-3 text-2xl font-black">
                  {brand.slogan}
                </h2>
                <p className="mt-3 leading-7 text-sky-50">
                  Planejamento para transformar ideias em viagens memoráveis.
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['Destino', 'Noronha'],
                  ['Perfil', 'Casal'],
                  ['Data', 'Flexivel'],
                  ['Canal', 'WhatsApp'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-black uppercase text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-950">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Planejamento visual
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Comece com uma ideia. A Voo Singular ajuda a transformar em rota.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Este bloco simula o primeiro passo da conversa. Ele não salva
              dados e não cria cadastro: o atendimento acontece pelo WhatsApp.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Origem', 'Destino', 'Data desejada', 'Pessoas'].map(
                (field) => (
                  <div
                    key={field}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <p className="text-xs font-black uppercase text-blue-700">
                      {field}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Informe pelo WhatsApp
                    </p>
                  </div>
                )
              )}
            </div>
            <WhatsappTrackingLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-base font-extrabold text-white transition hover:bg-blue-800"
              ctaId="planner-whatsapp"
              ctaLabel="Montar minha viagem pelo WhatsApp"
              pageId={analyticsPage.pageId}
              pagePath={analyticsPage.pagePath}
            >
              Montar minha viagem pelo WhatsApp
            </WhatsappTrackingLink>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Credibilidade institucional
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
            <p className="mt-5 text-xs font-semibold text-slate-500">
              CNPJ {brand.cnpj} · {brand.seal}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sky-50 px-5 py-14 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Beneficios
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Mais clareza para escolher e mais segurança para viajar.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-black text-blue-950">
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

      <section
        id="destinos"
        className="bg-white px-5 py-14 text-slate-950"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Destinos e experiências em destaque
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Ideias para inspirar sua próxima conversa com a Voo Singular.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <article
                key={destination.title}
                className="flex min-h-64 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <p className="text-xs font-black uppercase text-cyan-700">
                  {destination.category}
                </p>
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

      <section className="bg-blue-800 px-5 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-sky-100">
              Indicadores de confiança
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Experiência, atendimento próximo e curadoria para transformar
              planos em viagens memoráveis.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {trustIndicators.map((item) => (
              <div
                key={item.value}
                className="rounded-lg border border-white/20 bg-white/10 p-5 shadow-lg shadow-blue-950/10"
              >
                <p className="text-3xl font-black">{item.value}</p>
                <p className="mt-2 text-sm font-bold text-sky-100">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="bg-slate-50 px-5 py-14 text-slate-950"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Um caminho simples até o atendimento certo.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-sm font-black text-blue-800">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Tipos de viagem
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Atendimento para diferentes jeitos de descobrir o mundo.
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tripTypes.map((type) => (
              <div
                key={type}
                className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-base font-black text-blue-950"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#0f3f91_0%,#126fbf_55%,#53d2e9_100%)] px-5 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase text-sky-100">
            {brand.slogan}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Viajar não é apenas sair do lugar.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-sky-50">
            É viver experiências, criar memórias e descobrir novas versões de si
            mesmo.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 text-slate-950">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Perguntas frequentes
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-950 px-5 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Pronto para planejar uma viagem singular?
          </h2>
          <p className="mt-4 text-lg leading-8 text-sky-100">
            Fale com a Voo Singular pelo WhatsApp e receba atendimento
            personalizado para dar o próximo passo.
          </p>
          <WhatsappTrackingLink
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-base font-extrabold text-blue-900 shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-sky-50"
            ctaId="final-whatsapp"
            ctaLabel="Falar com a Voo Singular no WhatsApp"
            pageId={analyticsPage.pageId}
            pagePath={analyticsPage.pagePath}
          >
            Falar com a Voo Singular no WhatsApp
          </WhatsappTrackingLink>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
              <img
                src={brand.logo}
                alt="Logo Voo Singular"
                className="h-12 w-12 object-contain"
              />
            </span>
            <div>
              <p className="text-xl font-black text-blue-800">{brand.name}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {brand.slogan}
              </p>
              <p className="mt-4 max-w-xl text-xs leading-6 text-slate-500">
                Landing page de captação criada para atendimento personalizado
                em viagens.
              </p>
            </div>
          </div>
          <div className="grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-2 md:text-right">
            <a
              href={`mailto:${brand.email}`}
              className="rounded-lg border border-slate-200 px-4 py-3 transition hover:border-blue-200 hover:text-blue-800"
            >
              {brand.email}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 px-4 py-3 transition hover:border-blue-200 hover:text-blue-800"
            >
              Instagram
            </a>
            <WhatsappTrackingLink
              href={institutionalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 px-4 py-3 transition hover:border-blue-200 hover:text-blue-800"
              ctaId="footer-institutional-whatsapp"
              ctaLabel="WhatsApp institucional"
              pageId={analyticsPage.pageId}
              pagePath={analyticsPage.pagePath}
            >
              WhatsApp institucional
            </WhatsappTrackingLink>
            <span className="rounded-lg border border-slate-200 px-4 py-3">
              {brand.seal}
            </span>
            <span className="text-xs text-slate-500 sm:col-span-2">
              CNPJ {brand.cnpj}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

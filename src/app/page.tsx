import Link from 'next/link';

const flowSteps = [
  {
    title: 'Landing page',
    text: 'Campanhas e páginas objetivas para apresentar destinos, ofertas e experiências de viagem.',
  },
  {
    title: 'WhatsApp',
    text: 'CTAs diretos levam visitantes interessados para uma conversa humana com a equipe da agência.',
  },
  {
    title: 'Métricas',
    text: 'A evolução natural é medir visitas, cliques e conversões por campanha.',
  },
  {
    title: 'CRM externo',
    text: 'Cotação, proposta, negociação e histórico comercial seguem no sistema próprio da agência.',
  },
];

const cards = [
  {
    title: 'Landing pages de campanha',
    text: 'Páginas focadas em destinos, eventos, pacotes e ofertas sazonais da Voo Singular.',
  },
  {
    title: 'CTA para WhatsApp',
    text: 'O visitante encontra uma chamada clara para iniciar atendimento sem passar por fluxos complexos.',
  },
  {
    title: 'Métricas de conversão',
    text: 'Base preparada para evoluir com rastreamento de visitas, cliques e origem das campanhas.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-sky-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <Link href="/" className="min-w-0">
            <span className="block text-lg font-black tracking-tight text-blue-800">
              Voo Singular Leads
            </span>
            <span className="hidden text-xs font-semibold text-slate-500 sm:block">
              Landing pages, WhatsApp e métricas para campanhas de viagem.
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-2">
            <Link
              href="/lp/voo-singular"
              className="hidden rounded-full border border-blue-200 px-4 py-2 text-sm font-extrabold text-blue-800 transition hover:border-blue-300 hover:bg-sky-50 sm:inline-flex"
            >
              Ver landing
            </Link>
            <Link
              href="/admin/login"
              className="rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Acessar painel
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[linear-gradient(135deg,#eff8ff_0%,#ffffff_50%,#dff4ff_100%)] px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black uppercase text-blue-800 shadow-sm">
              Plataforma de captação da Voo Singular
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Transforme campanhas de viagem em contatos pelo WhatsApp.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A Voo Singular Leads organiza landing pages de captação,
              campanhas de viagem e, futuramente, métricas para entender quais
              visitantes avançam para atendimento.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/lp/voo-singular"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Ver landing principal
              </Link>
              <Link
                href="/admin/login"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-4 text-base font-extrabold text-blue-800 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-sky-50"
              >
                Acessar painel
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-950/10">
            <p className="text-sm font-black uppercase text-blue-700">
              Rota principal atual
            </p>
            <div className="mt-4 rounded-lg bg-blue-700 p-5 text-white">
              <p className="text-2xl font-black">/lp/voo-singular</p>
              <p className="mt-3 leading-7 text-sky-50">
                Página de campanha ativa para apresentar a Voo Singular e levar
                visitantes ao atendimento comercial pelo WhatsApp.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {['Captação', 'Campanhas', 'WhatsApp', 'Métricas futuras'].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Como a aplicação atua
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Um fluxo simples entre campanha, atendimento e leitura de
              conversão.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {flowSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white">
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

      <section className="bg-sky-50 px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">
              Foco do produto
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Menos sistema genérico, mais captação para viagens.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-black text-blue-950">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-800 px-5 py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-sky-100">
              Escopo claro
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Esta aplicação não substitui o CRM da agência.
            </h2>
            <p className="mt-4 leading-8 text-sky-50">
              Ela atua na captação e análise de conversão. Cotação,
              acompanhamento comercial, clientes, propostas e negociação ficam
              no sistema externo da Voo Singular.
            </p>
          </div>
          <Link
            href="/lp/voo-singular"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-4 text-base font-extrabold text-blue-900 shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-sky-50"
          >
            Ver landing principal
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-black text-blue-800">Voo Singular Leads</p>
          <p>Landing pages, WhatsApp e métricas para campanhas de viagem.</p>
        </div>
      </footer>
    </main>
  );
}

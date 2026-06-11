'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOutUser } from '@/lib/authService';

const metricCards = [
  {
    title: 'Landing principal',
    value: '/lp/voo-singular',
    text: 'Página principal de captação da Voo Singular.',
    action: 'Abrir landing',
    href: '/lp/voo-singular',
  },
  {
    title: 'Cliques no WhatsApp',
    value: 'Em breve',
    text: 'Será usado para medir conversão dos CTAs.',
  },
  {
    title: 'Visitas',
    value: 'Em breve',
    text: 'Será usado para acompanhar acessos por campanha.',
  },
  {
    title: 'Taxa de conversão',
    value: 'Em breve',
    text: 'Será calculada com base em visitas e cliques.',
  },
];

const nextSteps = [
  'rastrear page_view',
  'rastrear clique no WhatsApp',
  'registrar campanha/UTM',
  'criar gráfico por período',
  'ranking de campanhas',
];

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [loading, router, user]);

  const handleLogout = async () => {
    await signOutUser();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-sky-50 px-5">
        <div className="rounded-lg border border-blue-100 bg-white px-6 py-5 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Carregando painel...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const displayName =
    userData?.displayName || user.displayName || user.email || 'Usuário';

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-black tracking-tight text-blue-800">
              Voo Singular Leads
            </p>
            <p className="text-sm font-semibold text-slate-500">
              Painel de captação e métricas
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-blue-200 px-4 py-2 text-sm font-extrabold text-blue-800 transition hover:border-blue-300 hover:bg-sky-50"
            >
              Home
            </Link>
            <Link
              href="/lp/voo-singular"
              className="inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Ver landing
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-extrabold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <section className="bg-[linear-gradient(135deg,#eff8ff_0%,#ffffff_52%,#dff4ff_100%)] px-5 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black uppercase text-blue-800 shadow-sm">
            Acesso restrito
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Olá, {displayName}. Acompanhe a captação da Voo Singular sem misturar com o CRM.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Este painel será a base para visualizar campanhas, visitas e cliques
            no WhatsApp. Cotação, propostas, negociação e histórico comercial
            continuam no sistema externo da agência.
          </p>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-black uppercase text-blue-700">
                {card.title}
              </p>
              <p className="mt-4 text-2xl font-black text-slate-950">
                {card.value}
              </p>
              <p className="mt-3 min-h-14 leading-7 text-slate-600">
                {card.text}
              </p>
              {card.href && (
                <Link
                  href={card.href}
                  className="mt-5 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-800"
                >
                  {card.action}
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sky-50 px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Fluxo do produto
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Landing page → WhatsApp → Métricas → CRM externo
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Este painel mede captação e conversão. A cotação e o
              acompanhamento comercial continuam no CRM externo da agência.
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase text-blue-700">
              Próximas implementações
            </p>
            <ul className="mt-4 space-y-3">
              {nextSteps.map((step) => (
                <li
                  key={step}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto max-w-6xl rounded-lg border border-blue-100 bg-blue-800 p-6 text-white shadow-lg shadow-blue-950/10">
          <p className="text-sm font-black uppercase text-sky-100">
            Segurança e escopo
          </p>
          <p className="mt-3 text-lg font-bold leading-8">
            Acesso restrito. Este painel não substitui o CRM da agência.
          </p>
          <p className="mt-2 max-w-3xl leading-7 text-sky-50">
            Nesta etapa, os números são placeholders. O rastreamento real de
            visitas, UTM e cliques será implementado futuramente sem criar fluxo
            de cotação ou negociação dentro desta aplicação.
          </p>
        </div>
      </section>
    </main>
  );
}

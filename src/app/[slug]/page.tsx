// src/app/[slug]/page.tsx
'use client';

import { useEffect, useState, use } from 'react';
import {
  getPageDataBySlug,
  PageData,
  LinkData,
  incrementLinkClick,
  generateVCardBlob,
} from '@/lib/pageService';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
  FaLink,
  FaCheckCircle,
  FaUserPlus,
} from 'react-icons/fa';
import { motion, Variants } from 'framer-motion';

const iconMap: { [key: string]: React.ElementType } = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  globe: FaGlobe,
  website: FaGlobe,
  twitter: FaTwitter,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
  link: FaLink,
};

// Estende o tipo PageData para incluir a imagem de fundo
interface ExtendedPageData extends PageData {
  backgroundImage?: string;
}

export default function UserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [pageData, setPageData] = useState<ExtendedPageData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = (await getPageDataBySlug(
        resolvedParams.slug
      )) as ExtendedPageData | null;
      if (!isMounted) return;

      if (!data) {
        notFound();
      } else {
        setPageData(data);
        document.documentElement.className = '';

        const theme = data.theme || 'light';

        if (data.backgroundImage) {
          document.documentElement.classList.add('theme-custom-image');
        } else {
          document.documentElement.classList.add(`theme-${theme}`);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
      document.documentElement.className = '';
    };
  }, [resolvedParams.slug]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, [pageData]);

  const handleLinkClick = (link: LinkData) => {
    incrementLinkClick(resolvedParams.slug, link.url);
  };

  const handleSaveContact = () => {
    if (!pageData) return;
    const blob = generateVCardBlob(pageData);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageData.title.replace(/\s+/g, '_')}_contato.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!pageData)
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 animate-pulse font-medium">Carregando página de contato...</p>
        </div>
      </div>
    );

  const isProTheme =
    [
      'realtor',
      'restaurant',
      'mechanic',
      'influencer',
      'ocean',
      'sunset',
      'forest',
      'bubblegum',
      'developer',
    ].includes(pageData.theme || '') || !!pageData.backgroundImage;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const links = pageData.links || [];
  const whatsappLinkIndex = links.findIndex((link) => {
    const url = link.url.toLowerCase();
    return (
      url.includes('wa.me') ||
      url.includes('api.whatsapp.com') ||
      url.includes('whatsapp')
    );
  });
  const whatsappLink =
    whatsappLinkIndex >= 0 ? links[whatsappLinkIndex] : null;
  const secondaryLinks =
    whatsappLinkIndex >= 0
      ? links.filter((_, index) => index !== whatsappLinkIndex)
      : links;

  const travelBenefits = [
    'Atendimento personalizado',
    'Roteiros e pacotes',
    'Contato pelo WhatsApp',
  ];

  return (
    <div
      className="flex flex-col min-h-dvh font-sans transition-all duration-500 ease-in-out text-theme-text bg-theme-bg bg-cover bg-center bg-no-repeat bg-fixed"
      style={
        pageData.backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${pageData.backgroundImage})`,
            }
          : {}
      }
    >
      {/* Wrapper principal flex-grow para empurrar o footer para baixo quando houver poucos canais. */}
      <main className="grow flex flex-col items-center w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14 z-10">
        <div
          className={`flex flex-col items-center text-center w-full mb-6 sm:mb-8 transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-theme-text backdrop-blur-md shadow-sm">
            Página pública de contato
          </span>

          {pageData.profileImageUrl && (
            <div className="relative group mb-2">
              <Image
                src={pageData.profileImageUrl}
                alt={pageData.title}
                width={140}
                height={140}
                className="rounded-full border-[3px] sm:border-4 border-theme-image-border shadow-xl object-cover w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {isProTheme && (
                <div
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-500 text-white rounded-full p-1.5 sm:p-2 border-2 border-white shadow-md z-20"
                  title="Página verificada"
                >
                  <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 justify-center mt-3 sm:mt-4 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-theme-text drop-shadow-sm">
              {pageData.title}
            </h1>
            {isProTheme && (
              <FaCheckCircle
                className="text-blue-500 shrink-0"
                size={22}
                title="Página verificada"
              />
            )}
          </div>

          {pageData.bio && (
            <p className="mt-3 text-base sm:text-lg text-theme-text-muted max-w-md mx-auto leading-relaxed opacity-95 px-4 font-medium">
              {pageData.bio}
            </p>
          )}

          <p className="mt-5 max-w-md px-4 text-sm sm:text-base font-semibold leading-relaxed text-theme-text">
            Atendimento personalizado em viagens.
          </p>

          <button
            onClick={handleSaveContact}
            className="mt-6 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-theme-text px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold hover:bg-white/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Salvar contato de viagem na agenda"
          >
            <FaUserPlus className="text-lg" /> Salvar contato da viagem
          </button>
        </div>

        {whatsappLink && (
          <motion.div
            className="w-full max-w-md mx-auto mb-5 sm:mb-6"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <a
              href={whatsappLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(whatsappLink)}
              className="group flex w-full flex-col items-center justify-center rounded-2xl border border-white/20 bg-green-500 px-5 py-5 text-center text-white shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Conversar pelo WhatsApp"
            >
              <span className="mb-1 flex items-center gap-2 text-lg font-extrabold">
                <FaWhatsapp className="text-2xl" /> Conversar pelo WhatsApp
              </span>
              <span className="text-sm font-medium text-white/90">
                Tire dúvidas e avance com atendimento personalizado.
              </span>
            </a>
          </motion.div>
        )}

        <div className="mb-6 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
          {travelBenefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-xs font-semibold leading-snug text-theme-text shadow-sm backdrop-blur-md"
            >
              {benefit}
            </div>
          ))}
        </div>

        <motion.div
          className="w-full space-y-3 sm:space-y-4 max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {secondaryLinks.length > 0 && (
            <p className="px-2 text-center text-xs font-bold uppercase tracking-wide text-theme-text-muted">
              Canais de atendimento
            </p>
          )}

          {secondaryLinks.map((link, index) => {
            const iconKey = link.icon?.toLowerCase();
            const IconComponent = iconKey ? iconMap[iconKey] || FaLink : null;
            return (
              <motion.a
                key={`${link.url}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link)}
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center p-4 sm:p-5 rounded-2xl border border-white/10 bg-theme-button-bg text-theme-button-text hover:bg-theme-button-hover-bg shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={{ backdropFilter: 'blur(8px)' }}
                aria-label={`Acessar canal ${link.title}`}
              >
                {IconComponent && (
                  <span className="mr-4 text-xl sm:text-2xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <IconComponent />
                  </span>
                )}
                <span className="font-semibold text-[15px] sm:text-base grow text-center pr-8 sm:pr-10 tracking-wide">
                  {link.title}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </main>

      <footer className="w-full py-6 mt-auto text-center z-10 pb-8 sm:pb-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-black/15 backdrop-blur-md border border-white/5 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-black/30 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Criado com{' '}
          <strong className="ml-1 font-bold">Voo Singular Leads</strong>
        </Link>
      </footer>
    </div>
  );
}

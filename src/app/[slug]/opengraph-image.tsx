// src/app/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getPageDataBySlug, PageData } from '@/lib/pageService';

export const runtime = 'edge';

export const alt = 'Meus Links Pro - Perfil';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const pageData = (await getPageDataBySlug(slug)) as (PageData & { backgroundImage?: string }) | null;

  const title = pageData?.title || 'Meus Links Pro';
  const bio = pageData?.bio || 'Confira meus links e redes sociais!';
  const profileImage = pageData?.profileImageUrl;
  const isPro = [
    'realtor', 'restaurant', 'mechanic', 'influencer', 
    'ocean', 'sunset', 'forest', 'bubblegum', 'developer'
  ].includes(pageData?.theme || '') || !!pageData?.backgroundImage;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#0f172a', // Slate 900 para um fundo Deep Tech
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1e40af 0%, #0f172a 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '60px',
        }}
      >
        {/* Container da Imagem de Perfil com Badge de Verificado */}
        <div style={{ display: 'flex', position: 'relative', marginBottom: '40px' }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt={title}
              width="180"
              height="180"
              style={{
                borderRadius: '50%',
                border: '8px solid rgba(255, 255, 255, 0.1)',
                objectFit: 'cover',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            />
          ) : (
            <div
              style={{
                width: '180',
                height: '180',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                fontWeight: 'bold',
                border: '8px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {title.charAt(0)}
            </div>
          )}
          
          {isPro && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid #0f172a',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
        </div>

        {/* Título com Kerning ajustado */}
        <div style={{ 
          fontSize: 80, 
          fontWeight: 900, 
          marginBottom: '15px', 
          letterSpacing: '-0.02em',
          textShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}>
          {title}
        </div>

        {/* Bio com limite de caracteres e Line Height equilibrado */}
        <div
          style={{
            fontSize: 32,
            opacity: 0.85,
            maxWidth: '900px',
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          {bio.length > 120 ? bio.substring(0, 120) + '...' : bio}
        </div>

        {/* Footer/CTA Estilizado */}
        <div
          style={{
            marginTop: '60px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '12px 40px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#60a5fa'
          }}
        >
          <span style={{ color: 'white', opacity: 0.6 }}>meuslinkspro.com/</span>
          {slug}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
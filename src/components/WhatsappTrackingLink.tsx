'use client';

import type { ReactNode } from 'react';
import { trackWhatsappClick } from '@/lib/analyticsService';

type WhatsappTrackingLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ctaId: string;
  ctaLabel: string;
  pageId: string;
  pagePath: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};

export default function WhatsappTrackingLink({
  href,
  children,
  className,
  ctaId,
  ctaLabel,
  pageId,
  pagePath,
  target,
  rel,
  'aria-label': ariaLabel,
}: WhatsappTrackingLinkProps) {
  function handleClick() {
    void trackWhatsappClick({
      pageId,
      pagePath,
      ctaId,
      ctaLabel,
    }).catch((error) => {
      console.warn('Failed to track WhatsApp click.', error);
    });
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

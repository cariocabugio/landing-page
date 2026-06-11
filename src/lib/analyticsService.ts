import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseClient';

export type AnalyticsEventType = 'page_view' | 'whatsapp_click';

export type TrackAnalyticsEventInput = {
  type: AnalyticsEventType;
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
};

const ANALYTICS_EVENTS_COLLECTION = 'analyticsEvents';

function assertRequiredFields(input: TrackAnalyticsEventInput) {
  if (!input.type) {
    throw new Error('Analytics event type is required.');
  }

  if (!input.pageId.trim()) {
    throw new Error('Analytics event pageId is required.');
  }

  if (!input.pagePath.trim()) {
    throw new Error('Analytics event pagePath is required.');
  }
}

function removeEmptyOptionalFields(input: TrackAnalyticsEventInput) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined && value !== '')
  ) as TrackAnalyticsEventInput;
}

// Analytics is not CRM: do not store sensitive personal data, IPs,
// visitor phone numbers, WhatsApp conversations, quotes, sales, or customer history.
export async function trackAnalyticsEvent(
  input: TrackAnalyticsEventInput
): Promise<void> {
  assertRequiredFields(input);

  const sanitizedInput = removeEmptyOptionalFields(input);

  await addDoc(collection(db, ANALYTICS_EVENTS_COLLECTION), {
    ...sanitizedInput,
    createdAt: serverTimestamp(),
  });
}

export function trackPageView(
  input: Omit<TrackAnalyticsEventInput, 'type'>
): Promise<void> {
  return trackAnalyticsEvent({
    ...input,
    type: 'page_view',
  });
}

export function trackWhatsappClick(
  input: Omit<TrackAnalyticsEventInput, 'type'>
): Promise<void> {
  return trackAnalyticsEvent({
    ...input,
    type: 'whatsapp_click',
  });
}

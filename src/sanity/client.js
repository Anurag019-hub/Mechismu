import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'apfco293',
  dataset: 'production',
  apiVersion: '2026-08-08',
  useCdn: true,
});
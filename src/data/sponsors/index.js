import { tierBenefits } from '@/data/sponsors/tierBenefits';
import { whyPartner } from '@/data/sponsors/whyPartner';
import { supportMethods } from '@/data/sponsors/supportMethods';
import { present } from '@/data/sponsors/present';
import { past } from '@/data/sponsors/past';

export const sponsors = [
  ...present,
  ...past
];

export const tierOrder = ['Title', 'Gold', 'Silver', 'Bronze'];

export const tierColors = {
  Title: '#FF2E2E',
  Gold: '#FFB800',
  Silver: '#A8B4C0',
  Bronze: '#CD7F32',
};

export { tierBenefits, whyPartner, supportMethods };

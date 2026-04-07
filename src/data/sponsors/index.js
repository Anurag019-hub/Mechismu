import { tierBenefits } from '@/data/sponsors/tierBenefits';
import { whyPartner } from '@/data/sponsors/whyPartner';
import { supportMethods } from '@/data/sponsors/supportMethods';
import { year2025 } from '@/data/sponsors/2025';
import { year2024 } from '@/data/sponsors/2024';
import { year2023 } from '@/data/sponsors/2023';
import { year2022 } from '@/data/sponsors/2022';

export const sponsors = [
  ...year2025,
  ...year2024,
  ...year2023,
  ...year2022
];

export const tierOrder = ['Title', 'Gold', 'Silver', 'Bronze'];

export const tierColors = {
  Title: '#FF2E2E',
  Gold: '#FFB800',
  Silver: '#A8B4C0',
  Bronze: '#CD7F32',
};

export { tierBenefits, whyPartner, supportMethods };

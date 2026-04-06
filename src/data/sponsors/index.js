import { tierBenefits } from './tierBenefits';
import { whyPartner } from './whyPartner';
import { supportMethods } from './supportMethods';
import { year2025 } from './2025';
import { year2024 } from './2024';
import { year2023 } from './2023';
import { year2022 } from './2022';

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

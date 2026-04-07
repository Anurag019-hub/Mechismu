/**
 * File: index.js (Wins Data)
 * Purpose: Aggregation and structural modeling for yearly wins
 * 
 * Data Structure Expected (e.g., 2025.js):
 * - year: Number
 * - primaryHighlights: Array of { label, value }
 * - milestones: Array of strings
 * - competitions: Array of { name, id, results: [ { label, value } ] }
 */

import { year2025 } from "@/data/wins/2025";
import { year2023 } from "@/data/wins/2023";
import { year2019 } from "@/data/wins/2019";
import { year2015 } from "@/data/wins/2015";
import { year2012 } from "@/data/wins/2012";
import { year2011 } from "@/data/wins/2011";
import { year2010 } from "@/data/wins/2010";

export const winsData = [
  year2025,
  year2023,
  year2019,
  year2015,
  year2012,
  year2011,
  year2010,
];

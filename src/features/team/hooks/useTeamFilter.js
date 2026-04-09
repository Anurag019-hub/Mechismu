import { useState, useMemo, useCallback } from 'react';
import teamDataRaw from '../data/team.json';

const SECTION_CONFIG = [
  { key: 'leadership', label: 'Leadership' },
  { key: 'former_leadership', label: 'Former Leadership' },
  { key: 'advisors', label: 'Advisors' },
  { key: 'structures', label: 'Structures' },
  { key: 'lv', label: 'LV Electronics' },
  { key: 'vd', label: 'Vehicle Dynamics' },
  { key: 'hv', label: 'HV Powertrain' },
  { key: 'ops', label: 'Operations' },
];

export const useTeamFilter = (initialYear = 2024) => {
  const [activeYear, setActiveYear] = useState(initialYear);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const teamData = useMemo(() => teamDataRaw, []);

  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return SECTION_CONFIG.map((section) => {
      // 1. Hide section if a different specific filter is active
      if (activeFilter !== 'all' && activeFilter !== section.key) {
        return { ...section, members: [] };
      }

      const members = teamData
        .filter((m) => {
          // Find history entry with type-safe year comparison
          const yearEntry = m.history?.find((h) => String(h.year) === String(activeYear));
          if (!yearEntry) return false;

          // Only include if the person is part of THIS department key this year
          return yearEntry.departments.includes(section.key);
        })
        .map((m) => {
          // Pass the specific year entry down for easy access in the card
          const yearEntry = m.history.find((h) => String(h.year) === String(activeYear));
          return { ...m, yearEntry };
        })
        .filter((m) => {
          // 2. Search Logic
          if (!query) return true;
          const nameMatch = m.name.toLowerCase().includes(query);
          const roleMatch = m.yearEntry.roles.some(r =>
            r.title.toLowerCase().includes(query)
          );
          return nameMatch || roleMatch;
        });

      return { ...section, members };
    }).filter((s) => s.members.length > 0);
  }, [teamData, activeFilter, searchQuery, activeYear]);

  const totalMembers = useMemo(() => {
    return teamData.filter(m =>
      m.history?.some(h => String(h.year) === String(activeYear))
    ).length;
  }, [teamData, activeYear]);

  // Restoring handlers for TeamPage animations
  const changeYear = useCallback((year) => {
    if (String(year) === String(activeYear)) return false;
    setIsTransitioning(true);
    return true;
  }, [activeYear]);

  const completeYearChange = useCallback((year) => {
    setActiveYear(year);
    setActiveFilter('all');
    setSearchQuery('');
    setIsTransitioning(false);
  }, []);

  return {
    activeYear,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    isLoading,
    isTransitioning,
    filteredSections,
    totalMembers,
    changeYear,
    completeYearChange,
    setActiveYear // Keeping this as fallback if needed
  };
};
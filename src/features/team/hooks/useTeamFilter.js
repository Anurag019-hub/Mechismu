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

export const useTeamFilter = (initialYear = 2026) => {
  const [activeYear, setActiveYear] = useState(initialYear);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const teamData = useMemo(() => teamDataRaw, []);

  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return SECTION_CONFIG.map((section) => {
      if (activeFilter !== 'all' && activeFilter !== section.key) {
        return { ...section, members: [] };
      }

      const members = teamData
        .filter((m) => {
          const yearEntry = m.history?.find(
            (h) => String(h.year) === String(activeYear)
          );
          if (!yearEntry) return false;

          return yearEntry.departments.includes(section.key);
        })
        .map((m) => {
          const yearEntry = m.history.find(
            (h) => String(h.year) === String(activeYear)
          );
          return { ...m, yearEntry };
        })
        .filter((m) => {
          if (!query) return true;

          const nameMatch = m.name.toLowerCase().includes(query);
          const roleMatch = m.yearEntry.roles.some((r) =>
            r.title.toLowerCase().includes(query)
          );

          return nameMatch || roleMatch;
        })
        // 🔥 SORTING LOGIC (LEADS FIRST)
        .sort((a, b) => {
          const getPriority = (member, sectionKey) => {
            const titles = member.yearEntry.roles.map(r =>
              r.title.toLowerCase()
            );

            // ===== SECTION-SPECIFIC RULES =====

            if (sectionKey === 'leadership') {
              if (titles.some(t => t.includes('captain'))) return 0;
              if (titles.some(t => t.includes('vice captain'))) return 1;
              if (titles.some(t => t.includes('head'))) return 2;
              return 3;
            }

            // For all technical departments (structures, lv, vd, hv, ops)
            if (
              ['structures', 'lv', 'vd', 'hv', 'ops'].includes(sectionKey)
            ) {
              if (titles.some(t => t.includes('lead'))) return 0;
              if (titles.some(t => t.includes('head'))) return 1;
              if (titles.some(t => t.includes('senior'))) return 2;
              return 3;
            }

            // fallback (advisors / others)
            return 0;
          };

          return (
            getPriority(a, section.key) - getPriority(b, section.key)
          );
        });

      return { ...section, members };
    }).filter((s) => s.members.length > 0);
  }, [teamData, activeFilter, searchQuery, activeYear]);

  const totalMembers = useMemo(() => {
    return teamData.filter((m) =>
      m.history?.some((h) => String(h.year) === String(activeYear))
    ).length;
  }, [teamData, activeYear]);

  const changeYear = useCallback(
    (year) => {
      if (String(year) === String(activeYear)) return false;
      setIsTransitioning(true);
      return true;
    },
    [activeYear]
  );

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
    setActiveYear,
  };
};
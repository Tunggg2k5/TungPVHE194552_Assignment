import { useState, useMemo } from 'react';

// Custom hook: quản lý logic lọc giao dịch
export default function useFilter(transactions) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return transactions.filter((t) => {
      const matchSearch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchType = typeFilter === 'all' || t.type === typeFilter;
      const matchCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchSearch && matchType && matchCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  const hasFilter = search !== '' || typeFilter !== 'all' || categoryFilter !== 'all';

  function resetFilters() {
    setSearch('');
    setTypeFilter('all');
    setCategoryFilter('all');
  }

  return {
    search, setSearch,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    filtered,
    hasFilter,
    resetFilters,
  };
}

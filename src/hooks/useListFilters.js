import { useMemo, useState } from 'react'

export function useListFilters(items, { initial, predicate, pageSize = 8 }) {
  const [filters, setFilters] = useState(initial)
  const [requestedPage, setRequestedPage] = useState(1)

  const results = useMemo(
    () => items.filter((item) => predicate(item, filters)),
    [items, filters, predicate],
  )

  const pageCount = Math.max(1, Math.ceil(results.length / pageSize))
  const page = Math.min(requestedPage, pageCount)

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
    setRequestedPage(1)
  }

  const reset = () => {
    setFilters(initial)
    setRequestedPage(1)
  }

  return {
    filters,
    setFilter,
    reset,
    results,
    page,
    pageSize,
    setPage: setRequestedPage,
    pageItems: results.slice((page - 1) * pageSize, page * pageSize),
  }
}

export default useListFilters

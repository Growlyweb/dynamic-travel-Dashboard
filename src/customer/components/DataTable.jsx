import { ChevronLeft, ChevronRight } from 'lucide-react'

function PageButton({ children, label, disabled, active, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white'
      } ${disabled ? '' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  )
}

function Pagination({ page, pageSize, total, noun, onPageChange }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-body">
        Showing {from} to {to} of {total} {noun}
      </p>

      <div className="flex items-center gap-2">
        <PageButton label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </PageButton>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <PageButton
            key={number}
            label={`Page ${number}`}
            active={number === page}
            onClick={() => onPageChange(number)}
          >
            {number}
          </PageButton>
        ))}
        <PageButton
          label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </PageButton>
      </div>
    </div>
  )
}

export default function DataTable({
  columns,
  rows,
  rowKey,
  startIndex = 0,
  minWidth = 860,
  bare = false,
  pagination,
  emptyMessage = 'Nothing matches your filters yet.',
  onReset,
}) {
  return (
    <div
      className={
        bare ? '' : 'overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card'
      }
    >
      <div className={`overflow-x-auto ${bare ? '' : 'p-2 sm:p-3'}`}>
        <table className="w-full border-collapse text-left text-sm" style={{ minWidth }}>
          <thead>
            <tr className="bg-canvas text-[13px] font-semibold text-ink">
              <th scope="col" className="w-12 rounded-l-xl px-4 py-3.5 text-left">
                #
              </th>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-3 py-3.5 text-left ${column.className ?? ''} ${
                    index === columns.length - 1 ? 'rounded-r-xl' : ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowKey(row)} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3.5 text-body">{startIndex + rowIndex + 1}</td>
                {columns.map((column) => (
                  <td key={column.key} className={`px-3 py-3.5 text-ink/90 ${column.className ?? ''}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-4 py-14 text-center">
            <p className="text-sm text-body">{emptyMessage}</p>
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="cursor-pointer text-sm font-semibold text-brand hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        )}
      </div>

      {pagination && <Pagination {...pagination} />}
    </div>
  )
}

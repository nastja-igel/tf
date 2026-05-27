import styles from './TableFoot.module.css'

export interface TableFootProps {
  page: number
  totalPages: number
  pageSize?: number
  totalItems?: number
  onPage?: (page: number) => void
  className?: string
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {dir === 'left'
        ? <path d="m15 6-6 6 6 6" />
        : <path d="m9 6 6 6-6 6" />
      }
    </svg>
  )
}

export function TableFoot({
  page, totalPages, pageSize = 12, totalItems, onPage, className,
}: TableFootProps) {
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1
    if (page <= 4) return i + 1
    if (page >= totalPages - 3) return totalPages - 6 + i
    return page - 3 + i
  })

  return (
    <div className={[styles.foot, className ?? ''].join(' ').trim()} role="navigation" aria-label="Table pagination">
      {totalItems != null && (
        <span className={styles.count}>
          {totalItems} record{totalItems !== 1 ? 's' : ''}
          {totalPages > 1 && <> · page {page} of {totalPages}</>}
        </span>
      )}
      <div className={styles.spacer} />
      <div className={styles.pager}>
        <button
          className={styles.pgBtn}
          onClick={() => onPage?.(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <Chevron dir="left" />
        </button>

        {pages[0] > 1 && (
          <>
            <button className={styles.pgBtn} onClick={() => onPage?.(1)}>1</button>
            {pages[0] > 2 && <span className={styles.ellipsis}>…</span>}
          </>
        )}

        {pages.map(p => (
          <button
            key={p}
            className={[styles.pgBtn, p === page ? styles.pgActive : ''].join(' ')}
            onClick={() => onPage?.(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className={styles.ellipsis}>…</span>}
            <button className={styles.pgBtn} onClick={() => onPage?.(totalPages)}>{totalPages}</button>
          </>
        )}

        <button
          className={styles.pgBtn}
          onClick={() => onPage?.(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  )
}

import styles from './TableHead.module.css'

export interface TableHeadColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

export interface TableHeadProps {
  columns: TableHeadColumn[]
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  className?: string
}

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10"
      fill="none" aria-hidden="true"
      style={{ opacity: active ? 1 : 0.3, flexShrink: 0 }}
    >
      {dir === 'asc'
        ? <path d="M5 2 L8 7 H2 Z" fill="currentColor" />
        : <path d="M5 8 L2 3 H8 Z" fill="currentColor" />
      }
    </svg>
  )
}

export function TableHead({ columns, sortKey, sortDir = 'asc', onSort, className }: TableHeadProps) {
  return (
    <div className={[styles.head, className ?? ''].join(' ').trim()} role="row">
      {columns.map(col => (
        <div
          key={col.key}
          className={[
            styles.cell,
            col.sortable ? styles.sortable : '',
            col.align === 'right' ? styles.right : col.align === 'center' ? styles.center : '',
          ].join(' ').trim()}
          role="columnheader"
          aria-sort={col.sortable && sortKey === col.key
            ? (sortDir === 'asc' ? 'ascending' : 'descending')
            : undefined}
          onClick={col.sortable ? () => onSort?.(col.key) : undefined}
        >
          {col.label}
          {col.sortable && (
            <SortIcon active={sortKey === col.key} dir={sortKey === col.key ? sortDir : 'asc'} />
          )}
        </div>
      ))}
    </div>
  )
}

import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './SearchInput.module.css'

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showShortcut?: boolean
  wrapClassName?: string
}

function Ico({ d, size = 14 }: { d: string | string[]; size?: number }) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

const IC_SEARCH = ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.35-4.35']

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ showShortcut = false, wrapClassName, className, placeholder = 'Search…', ...props }, ref) {
    return (
      <div className={[styles.wrap, wrapClassName ?? ''].join(' ').trim()}>
        <Ico d={IC_SEARCH} />
        <input
          ref={ref}
          className={[styles.input, className ?? ''].join(' ').trim()}
          placeholder={placeholder}
          aria-label={placeholder}
          {...props}
        />
        {showShortcut && <kbd className={styles.shortcut}>⌘K</kbd>}
      </div>
    )
  }
)

import { ButtonHTMLAttributes } from 'react'
import styles from './SocialButton.module.css'

export type SocialProvider =
  | 'google'
  | 'microsoft'
  | 'github'
  | 'apple'
  | 'twitter'
  | 'facebook'
  | 'linkedin'
  | 'discord'

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider
}

/* ── Brand icons ─────────────────────────────────────────────────── */

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M18.17 10.23c0-.66-.06-1.3-.17-1.9H10v3.6h4.59a3.93 3.93 0 0 1-1.7 2.57v2.13h2.75c1.6-1.48 2.53-3.66 2.53-6.4Z" fill="#4285F4"/>
    <path d="M10 18.5c2.3 0 4.23-.76 5.64-2.07l-2.75-2.13c-.77.51-1.74.82-2.89.82-2.22 0-4.1-1.5-4.77-3.52H2.38v2.2A8.5 8.5 0 0 0 10 18.5Z" fill="#34A853"/>
    <path d="M5.23 11.6A5.1 5.1 0 0 1 4.96 10c0-.56.1-1.1.27-1.6V6.2H2.38A8.5 8.5 0 0 0 1.5 10c0 1.37.33 2.67.88 3.8l2.85-2.2Z" fill="#FBBC05"/>
    <path d="M10 4.88c1.25 0 2.37.43 3.25 1.27l2.44-2.44C14.22 2.34 12.3 1.5 10 1.5A8.5 8.5 0 0 0 2.38 6.2l2.85 2.2C5.9 6.38 7.78 4.88 10 4.88Z" fill="#EA4335"/>
  </svg>
)

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1.67" y="1.67" width="7.92" height="7.92" fill="#F25022"/>
    <rect x="10.42" y="1.67" width="7.92" height="7.92" fill="#7FBA00"/>
    <rect x="1.67" y="10.42" width="7.92" height="7.92" fill="#00A4EF"/>
    <rect x="10.42" y="10.42" width="7.92" height="7.92" fill="#FFB900"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 1.667A8.333 8.333 0 0 0 1.667 10c0 3.682 2.387 6.803 5.7 7.905.417.077.568-.181.568-.402 0-.198-.007-.723-.011-1.418-2.317.503-2.805-1.117-2.805-1.117-.379-.962-.925-1.218-.925-1.218-.756-.517.057-.507.057-.507.836.059 1.276.858 1.276.858.743 1.272 1.949.905 2.424.692.075-.538.29-.905.529-1.113-1.849-.21-3.793-.924-3.793-4.113 0-.908.325-1.651.858-2.234-.086-.21-.372-1.057.081-2.203 0 0 .699-.224 2.291.853A7.975 7.975 0 0 1 10 5.7c.708.003 1.421.096 2.087.281 1.59-1.077 2.288-.853 2.288-.853.455 1.146.169 1.993.083 2.203.534.583.857 1.326.857 2.234 0 3.197-1.947 3.9-3.801 4.106.299.257.565.765.565 1.542 0 1.113-.01 2.011-.01 2.284 0 .223.15.483.572.401A8.335 8.335 0 0 0 18.333 10 8.333 8.333 0 0 0 10 1.667Z"
      fill="#24292E"/>
  </svg>
)

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M13.19 2c.05.37.08.74.08 1.12 0 2.56-1.83 4.37-3.67 4.37-.06 0-.12 0-.18-.01C9.2 5.85 7.76 4.26 7.76 2c0-.03 0-.07.01-.1.55.1 1.08.4 1.53.84A3.87 3.87 0 0 0 13.19 2ZM7.44 8.31c-1.1 0-2.82.65-3.71 2.82-.89 2.17-.41 5.2 1.08 6.88.67.73 1.42 1.18 2.04 1.18.52 0 1.05-.21 1.52-.4.48-.2.92-.38 1.37-.38.44 0 .89.18 1.36.37.48.2 1 .41 1.54.41.71 0 1.53-.53 2.22-1.42.45-.58.79-1.25 1-1.77-.25-.09-2.4-.95-2.4-3.55 0-2.27 1.76-3.29 1.87-3.35A4.14 4.14 0 0 0 12.07 8c-.84 0-1.52.28-2.1.52-.47.2-.88.36-1.27.36-.41 0-.82-.17-1.26-.37Z"
      fill="#000"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M15.27 2.5h2.66l-5.82 6.65 6.85 9.05h-5.36l-4.2-5.49-4.8 5.49H2.14l6.23-7.12L1.83 2.5h5.5l3.8 5.02L15.27 2.5Zm-.93 14.07h1.47L5.72 4h-1.58l10.2 12.57Z"
      fill="#000"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M18.33 10a8.33 8.33 0 1 0-9.64 8.23V12.6H6.6V10h2.09V8.17c0-2.06 1.23-3.2 3.1-3.2.9 0 1.84.16 1.84.16v2.02h-1.04c-1.02 0-1.34.63-1.34 1.28V10h2.28l-.36 2.6h-1.92v5.63A8.34 8.34 0 0 0 18.33 10Z"
      fill="#1877F2"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M17.04 17.04h-2.97v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H7.76V7.5h2.85v1.31h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.21ZM4.45 6.19a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.94 17.04H2.96V7.5h2.98v9.54Z"
      fill="#0A66C2"/>
  </svg>
)

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M16.15 3.72A15.18 15.18 0 0 0 12.4 2.5c-.17.3-.37.71-.51 1.03a14.03 14.03 0 0 0-3.78 0A10.7 10.7 0 0 0 7.6 2.5a15.2 15.2 0 0 0-3.76 1.23C1.4 7.47.79 11.11 1.1 14.7a15.32 15.32 0 0 0 4.65 2.35c.38-.51.71-1.05.99-1.62a9.97 9.97 0 0 1-1.56-.75c.13-.09.26-.19.38-.29 3.01 1.39 6.28 1.39 9.25 0l.39.29c-.5.3-1.02.56-1.57.75.28.57.61 1.11.99 1.62a15.27 15.27 0 0 0 4.66-2.36c.38-4.1-.65-7.66-2.73-10.97ZM7.27 12.59c-.81 0-1.48-.75-1.48-1.67s.65-1.67 1.48-1.67c.83 0 1.5.75 1.48 1.67 0 .92-.65 1.67-1.48 1.67Zm5.46 0c-.82 0-1.48-.75-1.48-1.67s.65-1.67 1.48-1.67c.83 0 1.5.75 1.48 1.67 0 .92-.64 1.67-1.48 1.67Z"
      fill="#5865F2"/>
  </svg>
)

/* ── Metadata ────────────────────────────────────────────────────── */

const ICONS: Record<SocialProvider, () => JSX.Element> = {
  google:    GoogleIcon,
  microsoft: MicrosoftIcon,
  github:    GitHubIcon,
  apple:     AppleIcon,
  twitter:   TwitterIcon,
  facebook:  FacebookIcon,
  linkedin:  LinkedInIcon,
  discord:   DiscordIcon,
}

const ARIA_LABELS: Record<SocialProvider, string> = {
  google:    'Continue with Google',
  microsoft: 'Continue with Microsoft',
  github:    'Continue with GitHub',
  apple:     'Continue with Apple',
  twitter:   'Continue with X (Twitter)',
  facebook:  'Continue with Facebook',
  linkedin:  'Continue with LinkedIn',
  discord:   'Continue with Discord',
}

/* ── Component ───────────────────────────────────────────────────── */

export function SocialButton({ provider, className, ...props }: SocialButtonProps) {
  const Icon = ICONS[provider]
  return (
    <button
      type="button"
      aria-label={ARIA_LABELS[provider]}
      title={ARIA_LABELS[provider]}
      className={[styles.btn, className ?? ''].join(' ').trim()}
      {...props}
    >
      <Icon />
    </button>
  )
}

import { FormEvent, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { SocialButton } from '../../components/SocialButton/SocialButton'
import { Divider } from '../../components/Divider/Divider'
import { Checkbox } from '../../components/Checkbox/Checkbox'
import { Toast } from '../../components/Toast/Toast'
import styles from './LoginPage.module.css'

export interface LoginPageProps {
  onLogin?: (email: string, password: string) => void | Promise<void>
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: 'Signed in — redirecting…' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      await onLogin?.(email, password)
      setToast({ show: true, message: 'Signed in — redirecting…' })
    } finally {
      setTimeout(() => setLoading(false), 900)
    }
  }

  function handleSocial(provider: 'google' | 'microsoft') {
    const name = provider === 'google' ? 'Google' : 'Microsoft'
    setToast({ show: true, message: `Continuing with ${name}…` })
  }

  return (
    <div className={styles.stage}>
      {/* Sky background */}
      <div className={styles.sky} />

      {/* Orbital arcs */}
      <div className={styles.arcs} aria-hidden="true">
        <svg viewBox="0 0 1000 1000" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.7">
          <ellipse cx="500" cy="500" rx="520" ry="360" />
          <ellipse cx="500" cy="500" rx="460" ry="320" />
          <ellipse cx="500" cy="500" rx="400" ry="280" />
          <ellipse cx="500" cy="500" rx="340" ry="240" />
          <ellipse cx="500" cy="500" rx="280" ry="200" />
        </svg>
      </div>

      {/* Login card */}
      <form className={styles.card} onSubmit={handleSubmit} autoComplete="off" noValidate>

        {/* Floating logo */}
        <div className={styles.logo} aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round">
            <path d="M 32 6 A 26 26 0 1 1 12.5 53.2" stroke="#334155" strokeWidth="3.5"/>
            <path d="M 16 55.5 A 26 26 0 0 1 6.5 35" stroke="#94A3B8" strokeWidth="3.5"/>
            <path d="M 32 13 A 19 19 0 1 0 51 32.8" stroke="#94A3B8" strokeWidth="3.5"/>
            <path d="M 49.5 36 A 19 19 0 0 1 35.5 50" stroke="#334155" strokeWidth="3.5"/>
            <line x1="32" y1="32" x2="32" y2="21" stroke="#334155" strokeWidth="2.5"/>
            <line x1="32" y1="32" x2="40.5" y2="37" stroke="#334155" strokeWidth="2.5"/>
            <circle cx="32" cy="32" r="1.8" fill="#334155"/>
          </svg>
        </div>

        {/* Heading */}
        <div className={styles.head}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Please enter your details to sign in.</p>
        </div>

        {/* Social buttons */}
        <div className={styles.social}>
          <SocialButton provider="microsoft" onClick={() => handleSocial('microsoft')} />
          <SocialButton provider="google"    onClick={() => handleSocial('google')} />
        </div>

        <Divider />

        {/* Fields */}
        <div className={styles.fields}>
          <Input
            label="E-Mail Address"
            type="email"
            placeholder="Enter your email…"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password@123"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Remember + Forgot */}
        <div className={styles.row}>
          <Checkbox
            label="Remember me"
            checked={remember}
            onChange={setRemember}
          />
          <a href="#" className={styles.forgot}>Forgot password?</a>
        </div>

        {/* Submit */}
        <Button type="submit" fullWidth size="lg" loading={loading}>
          Sign in
        </Button>

        {/* Footer */}
        <p className={styles.foot}>
          Don't have an account yet?
          <a href="#" className={styles.footLink}>Sign up</a>
        </p>
      </form>

      {/* Brand sig */}
      <div className={styles.sig} aria-hidden="true">
        <span className={styles.dot} />
        KLAR TIME · WORKFORCE OPS
      </div>

      <Toast
        message={toast.message}
        show={toast.show}
        onHide={() => setToast(t => ({ ...t, show: false }))}
      />
    </div>
  )
}

import { FormEvent, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Text } from '../../components/Text/Text'
import styles from './LoginPage.module.css'

export interface LoginPageProps {
  onLogin?: (email: string, password: string) => void | Promise<void>
  logoSrc?: string
}

export function LoginPage({ onLogin, logoSrc }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await onLogin?.(email, password)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {logoSrc && <img src={logoSrc} alt="Logo" className={styles.logo} />}

        <div className={styles.header}>
          <Text variant="h2">Welcome back</Text>
          <Text variant="body-sm" color="secondary">
            Sign in to your account to continue
          </Text>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={error}
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <Text variant="caption" color="secondary" className={styles.footer}>
          Don't have an account?{' '}
          <a href="#" className={styles.link}>
            Sign up
          </a>
        </Text>
      </div>
    </div>
  )
}

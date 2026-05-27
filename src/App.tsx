import { useState } from 'react'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { WorktimeApprovals } from './pages/WorktimeApprovals/WorktimeApprovals'
import './tokens.css'

type Page = 'login' | 'worktime'

function App() {
  const [page, setPage] = useState<Page>('login')

  if (page === 'worktime') {
    return <WorktimeApprovals />
  }

  return (
    <LoginPage
      onLogin={async () => {
        await new Promise(r => setTimeout(r, 900))
        setPage('worktime')
      }}
    />
  )
}

export default App

import React, { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ErrorState from './components/ErrorState'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import { useGitHub } from './hooks/useGitHub'

/**
 * App states:
 *   'idle'    — home page, no search yet
 *   'loading' — API call in flight
 *   'results' — profile + repos loaded
 *   'error'   — NOT_FOUND | RATE_LIMIT | API_ERROR
 */
export default function App() {
  const { profile, repos, loading, error, searchUser, reset } = useGitHub()
  const [appState, setAppState] = useState('idle')
  const [lastUsername, setLastUsername] = useState('')

  // Sync app state with hook state
  useEffect(() => {
    if (loading) { setAppState('loading'); return }
    if (error) { setAppState('error'); return }
    if (profile) { setAppState('results'); return }
    setAppState('idle')
  }, [loading, error, profile])

  const handleSearch = username => {
    setLastUsername(username)
    searchUser(username)
  }

  const handleReset = () => {
    reset()
    setLastUsername('')
    setAppState('idle')
  }

  // Determine if sidebar should show (not on homepage)
  const showSidebar = appState === 'results' || appState === 'loading' || appState === 'error'

  return (
    <div className="min-h-screen bg-surface text-on-surface font-syne">
      {/* Top navigation — always visible */}
      <TopNav
        activePage={appState === 'idle' ? 'dashboard' : 'pulse'}
        onNavClick={id => { if (id === 'dashboard') handleReset() }}
      />

      {/* Side navigation — visible on results/loading/error */}
      {showSidebar && (
        <SideNav
          activeItem="repositories"
          onNewScan={handleReset}
          onItemClick={id => { if (id === 'overview') handleReset() }}
        />
      )}

      {/* Main content area */}
      {appState === 'idle' && (
        <HomePage onSearch={handleSearch} loading={false} />
      )}

      {appState === 'loading' && (
        <Loader />
      )}

      {appState === 'results' && profile && (
        <ResultsPage
          profile={profile}
          repos={repos}
          onNewSearch={handleReset}
        />
      )}

      {appState === 'error' && (
        <ErrorState
          type={error}
          username={lastUsername}
          onRetry={() => {
            if (lastUsername) handleSearch(lastUsername)
            else handleReset()
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

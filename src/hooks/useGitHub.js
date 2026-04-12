import { useState, useCallback } from 'react'

const RAW_GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN?.trim() || ''
const GITHUB_TOKEN =
  RAW_GITHUB_TOKEN && RAW_GITHUB_TOKEN !== 'your_token_here'
    ? RAW_GITHUB_TOKEN
    : ''

async function ghFetch(url) {
  const headers = { Accept: 'application/vnd.github+json' }
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  let res

  try {
    res = await fetch(url, { headers })
  } catch {
    throw new Error('NETWORK_ERROR')
  }

  if (res.status === 404) throw new Error('NOT_FOUND')
  if (res.status === 401) throw new Error('INVALID_TOKEN')
  if (res.status === 403) {
    const remaining = res.headers.get('x-ratelimit-remaining')
    throw new Error(remaining === '0' ? 'RATE_LIMIT' : 'API_ERROR')
  }
  if (!res.ok) throw new Error('API_ERROR')
  return res.json()
}

export function useGitHub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) // 'NOT_FOUND' | 'RATE_LIMIT' | 'INVALID_TOKEN' | 'NETWORK_ERROR' | 'API_ERROR' | null

  const searchUser = useCallback(async (username) => {
    if (!username.trim()) return
    setLoading(true)
    setError(null)
    setProfile(null)
    setRepos([])
    try {
      const [profileData, reposData] = await Promise.all([
        ghFetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
        ghFetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`),
      ])
      setProfile(profileData)
      setRepos(Array.isArray(reposData) ? reposData : [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setProfile(null)
    setRepos([])
    setError(null)
    setLoading(false)
  }, [])

  return { profile, repos, loading, error, searchUser, reset }
}

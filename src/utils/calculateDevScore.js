/**
 * calculateDevScore.js
 * Pure function — uses Array HOFs: .reduce(), .filter(), .find(), .map()
 * No for/while loops.
 */

const GRADES = [
  { max: 25, label: 'Beginner', color: '#a8abb3' },
  { max: 50, label: 'Developer', color: '#54fcd8' },
  { max: 75, label: 'Pro', color: '#8cfece' },
  { max: 90, label: 'Expert', color: '#FAC775' },
  { max: 100, label: 'Legend', color: '#ff716c' },
]

export function calculateDevScore(profile, repos) {
  if (!profile || !repos) return null

  // .reduce() — sum total stars
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

  // .filter() + Set — unique languages
  const langs = new Set(repos.filter(r => r.language).map(r => r.language))

  // .filter() — repos active in last 6 months
  const sixMonthsAgo = Date.now() - 1000 * 60 * 60 * 24 * 180
  const recentRepos = repos.filter(r => new Date(r.pushed_at).getTime() > sixMonthsAgo).length

  const maxStars = 1000
  const maxLangs = 10
  const maxRecent = 20
  const maxFollowers = 500
  const maxRepos = 100

  const starsScore = Math.min(totalStars / maxStars, 1) * 30
  const langScore = Math.min(langs.size / maxLangs, 1) * 20
  const activityScore = Math.min(recentRepos / maxRecent, 1) * 20
  const followerScore = Math.min((profile.followers || 0) / maxFollowers, 1) * 15
  const repoScore = Math.min((profile.public_repos || 0) / maxRepos, 1) * 15

  const score = Math.round(starsScore + langScore + activityScore + followerScore + repoScore)

  // .find() — get matching grade
  const grade = GRADES.find(g => score <= g.max) || GRADES[GRADES.length - 1]

  return {
    score,
    grade,
    breakdown: [
      { label: 'Stars Received', icon: 'star', pts: +starsScore.toFixed(1), pct: Math.round((starsScore / 30) * 100) },
      { label: 'Languages Proficiency', icon: 'terminal', pts: +langScore.toFixed(1), pct: Math.round((langScore / 20) * 100) },
      { label: 'Activity Index', icon: 'bolt', pts: +activityScore.toFixed(1), pct: Math.round((activityScore / 20) * 100) },
      { label: 'Follower Network', icon: 'group', pts: +followerScore.toFixed(1), pct: Math.round((followerScore / 15) * 100) },
      { label: 'Repositories', icon: 'folder_zip', pts: +repoScore.toFixed(1), pct: Math.round((repoScore / 15) * 100) },
    ],
    totalStars,
    langs: [...langs],
    recentRepos,
  }
}

export function getLanguageDistribution(repos) {
  // .forEach() — build counts without for loop
  const counts = {}
  repos.forEach(r => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
  })
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([lang, count]) => ({ lang, pct: Math.round((count / total) * 100) }))
}

export function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}yr ago`
}

export const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00B4AB',
  'C#': '#178600',
  Scala: '#c22d40',
  default: '#8cfece',
}

export function langColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default
}

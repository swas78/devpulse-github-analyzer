# 🔍 DevPulse — GitHub Profile & Repo Analyzer

![DevPulse Banner](https://img.shields.io/badge/DevPulse-GitHub%20Analyzer-0d1117?style=for-the-badge&logo=github&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![GitHub API](https://img.shields.io/badge/API-GitHub%20REST-181717?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> A powerful GitHub profile and repository analyzer built with React. Search any GitHub user, explore their repositories, and get a unique **Dev Score** — a visual card that reflects their developer journey based on public stats.

## 📌 Project Purpose

DevPulse is a web application that allows users to:
- Look up any GitHub profile instantly
- Explore their public repositories with rich detail
- Analyze coding patterns through language usage
- Generate a shareable **Dev Score card** based on public GitHub stats

This project was built as part of a web development milestone project to demonstrate skills in JavaScript, React, API integration, and UI development.

---
🌐 Live Demo
🔗 View Live Project (https://devpulse-github-analyzer.vercel.app/)
--
## 🚀 Features

### Core Features
- 🔎 **Search GitHub Users** — Search any public GitHub username and instantly load their profile
- 👤 **Profile Overview** — View avatar, name, bio, followers, following, and public repo count
- 📦 **Repository Explorer** — Browse all public repositories with stars, forks, language, and last updated info
- 🌐 **Language Usage Visualization** — See which languages the user codes in most
- 🏆 **Dev Score Card** — A unique visual score (out of 100) generated from public stats including stars, languages, followers, and recent activity

### Search, Filter & Sort (using Array HOFs)
- 🔍 **Search Repos** — Search repositories by name using `.filter()`
- 🗂️ **Filter by Language** — Dropdown to filter repos by programming language using `.filter()`
- 🔃 **Sort Repos** — Sort by ⭐ Stars, 🍴 Forks, or 🕐 Last Updated using `.sort()`

### UI & UX
- 🌙 **Dark / Light Mode** — Toggle between themes, preference saved in localStorage
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop
- ⏳ **Loading Skeletons** — Animated skeleton cards while data is being fetched
- ❌ **Error Handling** — Graceful messages for invalid usernames, empty results, and API limits

### Bonus Features
- 🔄 **Infinite Scroll** — Automatically loads more repositories as you scroll down
- 🛑 **Throttling on Search** — Prevents excessive API calls using a custom throttle hook
- 💾 **LocalStorage** — Saves theme preference and last searched username
- 📲 **PWA Support** — Installable on devices with offline caching via Service Worker

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React (Vite) | Frontend framework |
| GitHub REST API | Data source |
| CSS / Tailwind CSS | Styling and responsive design |
| LocalStorage API | Theme and search persistence |
| IntersectionObserver API | Infinite scroll implementation |
| Service Worker + Manifest | PWA support |

---

## 🌐 API Used

**GitHub REST API (Public — No Auth Required for basic usage)**

| Endpoint | Purpose |

## 🏆 Dev Score — How It Works

The Dev Score is calculated using a custom algorithm based on publicly available GitHub stats:

| Metric | Weight |
|---|---|
| Total stars across all repos | 30% |
| Number of unique languages used | 20% |
| Number of recently updated repos (last 6 months) | 20% |
| Follower count | 15% |
| Total public repositories | 15% |

**Score Grades:**
- 🟤 0–25 → Beginner
- 🔵 26–50 → Developer
- 🟢 51–75 → Pro
- 🟡 76–90 → Expert
- 🔴 91–100 → Legend

## 📋 Best Practices Followed

- ✅ Array HOFs used for all search, filter, and sort operations (no `for`/`while` loops)
- ✅ Modular component-based architecture
- ✅ Error handling for all API calls
- ✅ Responsive design tested across all screen sizes
- ✅ Meaningful commit messages throughout development
- ✅ DRY principle — reusable functions and components
- ✅ Clean, readable, and well-commented code

---

## 🤝 Contributing

This is a student project. Feedback and suggestions are welcome via issues.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by **Swastik Mishra**  

---

> ⭐ If you like this project, consider giving it a star on GitHub!

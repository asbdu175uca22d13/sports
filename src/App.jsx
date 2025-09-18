import React, { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchControls from './components/SearchControls.jsx'
import PlayerTable from './components/PlayerTable.jsx'
import Footer from './components/Footer.jsx'
import { players as seed } from './data.js'

const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true })

export default function App() {
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState('')
  const [role, setRole] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortDir, setSortDir] = useState('asc')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const t = team.trim().toLowerCase()
    return seed.filter(p => {
      const matchesText = !q || p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)
      const matchesTeam = !t || p.team.toLowerCase().includes(t)
      const matchesRole = !role || p.role === role
      return matchesText && matchesTeam && matchesRole
    })
  }, [query, team, role])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    arr.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortBy === 'age' || sortBy === 'height') {
        return dir * (a[sortBy] - b[sortBy])
      }
      return dir * collator.compare(a[sortBy], b[sortBy])
    })
    return arr
  }, [filtered, sortBy, sortDir])

  const handleHeaderSort = (key) => {
    if (key === sortBy) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="container">
      <Header total={seed.length} filtered={sorted.length} />

      <section className="card" style={{ padding: 16, marginTop: 16 }}>
        <SearchControls
          query={query} onQuery={setQuery}
          team={team} onTeam={setTeam}
          role={role} onRole={setRole}
          sortBy={sortBy} onSortBy={setSortBy}
          sortDir={sortDir} onSortDir={setSortDir}
        />
      </section>

      <section style={{ marginTop: 16 }}>
        <PlayerTable players={sorted} onHeaderSort={handleHeaderSort} />
      </section>

      <Footer />
    </div>
  )
}

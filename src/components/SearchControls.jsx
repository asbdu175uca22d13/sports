import React from 'react'

export default function SearchControls({ query, onQuery, role, onRole, sortBy, onSortBy, sortDir, onSortDir, team, onTeam }) {
  return (
    <div className="controls">
      <input
        placeholder="Search by name or team…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Search players by name"
      />
      <input
        placeholder="Filter by team…"
        value={team}
        onChange={(e) => onTeam(e.target.value)}
        aria-label="Filter by team"
      />
      <select value={role} onChange={(e) => onRole(e.target.value)} aria-label="Filter by role">
        <option value="">All roles</option>
        <option>Bowlers</option>
        <option>All rounder</option>
        <option>Batsmen</option>
        <option>Captain</option>
      </select>
     
      
    </div>
  )
}

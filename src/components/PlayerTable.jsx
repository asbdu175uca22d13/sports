import React from 'react'

export default function PlayerTable({ players, onHeaderSort }) {
  if (!players.length) {
    return <div className="empty card">No players match your search.</div>
  }

  return (
    <div className="table-wrap card">
      <table role="table">
        <thead>
          <tr>
            <th role="columnheader" onClick={() => onHeaderSort('name')}>Name</th>
            <th role="columnheader" onClick={() => onHeaderSort('team')}>Team</th>
            <th role="columnheader" onClick={() => onHeaderSort('role')}>Role</th>
            <th role="columnheader" onClick={() => onHeaderSort('age')}>Age</th>
            <th role="columnheader" onClick={() => onHeaderSort('height')}>Height (cm)</th>
            <th role="columnheader">Nationality</th>
          </tr>
        </thead>
        <tbody>
          {players.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.team}</td>
              <td><span className="role">{p.role}</span></td>
              <td>{p.age}</td>
              <td>{p.height}</td>
              <td>{p.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

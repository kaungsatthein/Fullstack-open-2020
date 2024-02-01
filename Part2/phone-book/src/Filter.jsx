import React from 'react'

export default function Filter({setFilter}) {
  return (
    <div>
        Filter shown with
        <input type="text" onChange={e=>setFilter(e.target.value)}/>
    </div>
  )
}

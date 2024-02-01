import React from 'react'

export default function Persons({persons, handleDelete}) {
  return (
    <div>
        {persons.map((person) => (
          <p key={person.id}>
            {person.name} - {person.number}
            <button onClick={()=>handleDelete(person.id)}>Delete</button>
          </p>
        ))}
      </div>
  )
}

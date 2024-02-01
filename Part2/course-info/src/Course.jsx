import React from "react";

export default function Course({ courses }) {

  return (
    <div>
        <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>

          {course.parts.map((part) => (
            <p key={part.id}>{part.name} {part.exercises}</p>
          ))}
          <h4>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h4>
        </div>
      ))}
    </div>
  );
}

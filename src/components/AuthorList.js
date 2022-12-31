import React from 'react';
import Author from "./Author";

export default function AuthorList({ authors }) {
  return (
    <ul className="list-disc pl-8">
      {authors.map(author => {
          return (
            <Author key={author.id} {...author} />
          )
        })}
    </ul>
  )
}

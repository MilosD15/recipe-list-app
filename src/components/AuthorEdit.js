import React, { useEffect, useRef } from 'react'

export default function AuthorEdit(props) {
  const { author, handleAuthorsChanges, handleDeleteAuthor } = props;
  const inputAuthorNameRef = useRef();

  useEffect(() => {
    inputAuthorNameRef.current.focus();
  }, []);

  function handleAuthorChanges(changes) {
    handleAuthorsChanges(author.id, { ...author, ...changes });
  }

  return (
    <div className="flex items-center gap-2 ">
      <span className="w-7 -translate-y-[3px] hidden sm:block md:hidden lg:block">→</span>
      <input type="text" className="form-input mb-1 w-full" value={author.name} ref={inputAuthorNameRef}
      onChange={e => { handleAuthorChanges({ name: e.target.value }) }} />
      <button 
        className="
        rounded-md 
        transition-all 
        duration-300 
        bg-red-600 
        hover:bg-red-700 
        focus:bg-red-700 
        px-2 
        py-0 
        mb-1
        text-xl"
        onClick={() => { handleDeleteAuthor(author.id) }}
      >
        &times;
      </button>
    </div>
  )
}

import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 focus-within:border-indigo-500 rounded-lg px-4 py-2.5 max-w-md mx-auto shadow-md">
            <input
                type="text"
                placeholder="&#x1F50E; Search for a movie"
                className="bg-transparent text-slate-200 placeholder-slate-500 outline-none w-full text-sm"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    </div>
  )
}

export default Search

//className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 rounded-lg w-500 px-4 py-2 ml-2 mr-2"
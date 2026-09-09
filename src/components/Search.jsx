import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
        <div className="flex items-center justify-center mt-4">
            <input
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    </div>
  )
}

export default Search

//className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 rounded-lg w-500 px-4 py-2 ml-2 mr-2"
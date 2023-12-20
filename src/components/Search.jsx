const Search = ({ searchQuery, handleSearch }) => {
    return (
        <div>
            <h2>Search</h2>
            <div>
                Search: <input value={searchQuery} onChange={handleSearch}/>
            </div>
        </div>
    )
  }
  export default Search
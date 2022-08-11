const Search = ({ search, setSearch }) => {
  return (
    <div
      className="flex w-[80%] max-w-[1150px] items-center justify-center
    space-x-1 rounded-full border border-gray-600 bg-[#1a1a1a] px-2"
    >
      <div className="h-4  w-4 flex-shrink-0 animate-pulse rounded-full border-2" />
      <input
        type="text"
        value={search}
        onChange={(e) => {
          // console.log("set Search", e.target.value);
          setSearch(e.target.value);
        }}
        className="w-full rounded-full border-none bg-[#1a1a1a] text-white placeholder-[#fafafa7c]
                  focus:ring-0"
        placeholder="Search..."
      />
      <div className="flex items-center">
        <div className="flex space-x-2 pr-5">
          <button className="tag">Artist</button>
          <button className="tag">Song</button>
        </div>
      </div>
    </div>
  );
};

export default Search;

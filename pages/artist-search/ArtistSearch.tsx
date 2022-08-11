import { useState } from "react";
import ArtistResults from "../../components/searchArtists/ArtistResults";
import Search from "../../components/searchArtists/Search";
import Wrapper from "../../components/wrapper/Wrapper";
import { useSearchDebounced } from "../../hooks/useSearchDebounced";

const ArtistSearch = () => {
  const [search, setSearch] = useState("");
  const { isLoading, artists, albums } = useSearchDebounced({
    searchQuery: search,
    searchTypes: ["artist"],
    resultLimit: 10,
  });

  // console.log("artists", artists);
  return (
    <Wrapper>
      <div className="mt-2 flex flex-grow flex-col  items-center space-y-2 overflow-hidden">
        <Search search={search} setSearch={setSearch} />

        <div className="  overflow-y-scroll scrollbar-hide">
          <ArtistResults artists={artists} />
        </div>
      </div>
    </Wrapper>
  );
};

export default ArtistSearch;

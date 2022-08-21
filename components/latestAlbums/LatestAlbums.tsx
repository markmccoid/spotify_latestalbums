import { useAtom } from "jotai";
import { useState } from "react";
import { selectedArtistsAtom } from "../../atoms/selectedArtistsAtom";

import useArtistData from "../../hooks/useArtistData";

const LatestAlbums = () => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  // const [search, setSearch] = useState("");
  // const { isLoading, artists, albums } = useSearchDebounced({
  //   searchQuery: search,
  //   searchTypes: ["artist"],
  //   resultLimit: 10,
  // });
  const { artistAlbumsData, isLoading, isError, refetch } = useArtistData(selectedArtists);
  // console.log("artists", selectedArtists);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-grow overflow-hidden overflow-y-scroll">
        {artistAlbumsData?.map((data) => {
          return (
            <div>
              <h1 className="text-2xl">{data.artistName}</h1>
              {data.artistMusic.map((el) => (
                <div>
                  <a href={el.spotifyAlbumURL} target="_blank">
                    {el.release_date} -- {el.name} -- {el.albumType}
                  </a>
                  <ul>
                    {el.artists?.map((artist) => {
                      return (
                        <li>
                          <a href={artist.spotifyArtistURL} target="_blank">
                            {artist.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestAlbums;

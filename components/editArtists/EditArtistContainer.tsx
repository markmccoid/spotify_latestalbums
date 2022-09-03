import { useEffect, useRef, useState } from "react";
import { SelectedArtistAtom } from "../../atoms/selectedArtistsAtom";
import ArtistImage from "../shared/ArtistImage";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  artistObj: SelectedArtistAtom;
  removeArtist: (id: string) => void;
};

const EditArtistContainer = ({ artistObj, removeArtist }: Props) => {
  const [artistToRemove, setArtistToRemove] = useState<string>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const currentArtistRef = useRef<string>();
  const [cancelHeight, setCancelHeight] = useState<number>(0);
  const heightRef = useRef();

  const cancelDelete = () => {
    setArtistToRemove(undefined);
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    currentArtistRef.current = artistToRemove;
    const timeoutIdConst = setTimeout(() => {
      artistToRemove && removeArtist(artistToRemove);
    }, 3000);
    setTimeoutId(timeoutIdConst);
  }, [artistToRemove]);

  //-- This is when we have an artist queed for delete, but unmount
  //-- we want to then immediately remove the artist from the list
  useEffect(() => {
    if (heightRef.current) {
      setCancelHeight(heightRef.current.clientHeight);
    }
    //remove artist immediately when unmounting
    return () => {
      currentArtistRef.current && removeArtist(currentArtistRef.current);
    };
  }, []);

  return (
    <div
      className="mr-3 mb-2 flex w-[400px] flex-grow-0 cursor-pointer flex-row justify-between 
rounded-2xl border-2 border-highlight_bg bg-mm_light transition duration-700"
    >
      <div className="py-3 px-2">
        <ArtistImage images={artistObj.imageURL} />
      </div>

      <div className="py-3 px-2 text-2xl font-bold text-black">
        {artistObj.name}
      </div>

      <div
        ref={heightRef}
        className="relative flex w-[105px] flex-shrink-0 rounded-r-xl border-l-2 border-red-900 bg-red-500 "
      >
        <AnimatePresence initial={false}>
          {!artistToRemove && (
            <motion.div
              key="1"
              className="font-bold text-black"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              onClick={() => setArtistToRemove(artistObj.id)}
            >
              REMOVE
            </motion.div>
          )}
          {artistToRemove && (
            <motion.div
              key="2"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onClick={cancelDelete}
            >
              CANCEL
            </motion.div>
          )}
          {/* {!artistToRemove && (
            <motion.button
              key="start"
              animate={{
                opacity: 1,
                transition: { duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5 },
              }}
              className="h-full w-full self-center px-3 text-xl font-bold text-black"
              onClick={() => setArtistToRemove(artistObj.id)}
            >
              Remove
            </motion.button>
          )}

          {artistToRemove && (
            <motion.button
              key="delete"
              animate={{
                opacity: 1,
                transition: { duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5 },
              }}
              className="h-full w-full self-center px-3 text-xl font-bold text-black"
              onClick={cancelDelete}
            >
              Cancel Delete
             <motion.div
                  key="delete"
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: cancelHeight,
                  }}
                  transition={{
                    duration: 3,
                  }}
                  exit={{
                    height: 0,
                    transition: { duration: 0.5 },
                  }}
                  className="absolute bottom-0 left-0 w-5  border border-black bg-white"
                ></motion.div> 
            </motion.button> 
          )}*/}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditArtistContainer;

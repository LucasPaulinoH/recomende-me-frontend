import booksApi from "@/services/booksApi";
import { useEffect, useState } from "react";
import { RecommendationType } from "@/types/RecommendationType";
import Media from "@/types/SelectedMedia";

const useSearchRecommendationMedia = (type: RecommendationType) => {
  const [search, setSearch] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [results, setResults] = useState([]);

  const fetchBookSearch = async () => {
    if (search.length === 0) {
      setResults([]);
      return;
    }

    try {
      const resultsResponse = await booksApi.searchBook(search.toLowerCase());
      console.log(resultsResponse);

      setResults(resultsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      switch (type) {
        case RecommendationType.BOOK:
          fetchBookSearch();
          break;
        case RecommendationType.MOVIE:
          break;
        case RecommendationType.SONG:
          break;
      }
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [search, type]);

  return { search, setSearch, results, selectedMedia, setSelectedMedia };
};

export default useSearchRecommendationMedia;

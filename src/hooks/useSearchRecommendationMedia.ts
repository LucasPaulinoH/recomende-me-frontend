import booksApi from "@/services/booksApi";
import { useEffect, useState } from "react";
import { RecommendationType } from "@/types/RecommendationType";

import moviesApi from "@/services/moviesApi";
import songsApi from "@/services/songsApi";

const useSearchRecommendationMedia = (
  type: RecommendationType,
  search: string
) => {
  const [results, setResults] = useState([]);

  const fetchBookSearch = async () => {
    try {
      const resultsResponse = await booksApi.searchBook(search.toLowerCase());
      setResults(resultsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieSearch = async () => {
    try {
      const resultsResponse = await moviesApi.searchMovie(search);
      setResults(resultsResponse.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSongSearch = async () => {
    try {
      const resultsResponse = await songsApi.searchSong(search);
      setResults(resultsResponse.results.trackmatches.track);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.length === 0) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      switch (type) {
        case RecommendationType.BOOK:
          fetchBookSearch();
          break;
        case RecommendationType.MOVIE:
          fetchMovieSearch();
          break;
        case RecommendationType.SONG:
          fetchSongSearch();
          break;
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, type]);

  return {
    results,
  };
};

export default useSearchRecommendationMedia;

import booksApi from "@/services/booksApi";
import { useEffect, useState } from "react";
import { RecommendationType } from "@/types/RecommendationType";

const useSearchRecommendationMedia = (type: RecommendationType) => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const fetchBookSearch = async () => {
    if (title.length === 0) {
      setResults([]);
      return;
    }

    try {
      const res = await booksApi.searchBook(title.toLowerCase());
      console.log(res);

      setResults(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    switch (type) {
      case RecommendationType.BOOK:
        fetchBookSearch();
        break;

      default:
        break;
    }
  }, [title]);

  return { title, setTitle, results };
};

export default useSearchRecommendationMedia;

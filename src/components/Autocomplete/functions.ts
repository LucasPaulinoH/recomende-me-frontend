import { RecommendationType } from "@/types/RecommendationType";
import Media from "@/types/SelectedMedia";

const MOVIE_POSTER_URL_RADICAL = "https://image.tmdb.org/t/p/original";

export const getHandledSelectedMedia = (
  result: any,
  type: RecommendationType
) => {
  let selectedMedia: Media | null = null;

  switch (type) {
    case RecommendationType.BOOK:
      selectedMedia = {
        title: result?.volumeInfo?.title,
        authors: result?.volumeInfo?.authors ?? ["Desconhecido"],
        cover: result?.volumeInfo?.imageLinks?.thumbnail ?? "",
      };
      break;
    case RecommendationType.MOVIE:
      selectedMedia = {
        title: result?.title,
        authors: [],
        cover: `${MOVIE_POSTER_URL_RADICAL}${result?.poster_path}`,
      };
      break;
    case RecommendationType.SONG:
      selectedMedia = {
        title: result?.name,
        authors: [result?.artist],
        cover: "",
      };
      break;
  }

  return selectedMedia;
};

export const showAuthors = (authors: string[]) => {
  let authorsString = "";

  authors.forEach((author, index) => {
    authorsString = authorsString.concat(
      index !== authors.length - 1 ? `${author}, ` : author
    );
  });

  return authorsString;
};

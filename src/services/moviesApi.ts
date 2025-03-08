import axios from "axios";

const moviesApi = {
  searchMovie: (search: string) =>
    axios
      .get(
        `${
          import.meta.env.VITE_THE_MOVIE_DB_API_URL
        }${search}&limit=15&language=pt-BR`,
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_THE_MOVIE_DB_API_TOKEN
            }`,
          },
        }
      )
      .then((response) => response.data),
};

export default moviesApi;

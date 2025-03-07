import axios from "axios";

const CONTROLLER_URL = `https://api.themoviedb.org/3/search/movie?query=`;
const THE_MOVIE_DB_API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDE3ZWMxZmNlZmMxNDBlNzgxMjRjOTQ4MjNmMWI0MCIsIm5iZiI6MTc0MTIwNTc3MC43ODQ5OTk4LCJzdWIiOiI2N2M4YjEwYTgzMDU3MGQxZmRjMmJjOTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YzLszP19vrbDbibZA7Vb7aGC1Ih8QIKJ1bIXXHHrQtM";

const moviesApi = {
  searchMovie: (search: string) =>
    axios
      .get(`${CONTROLLER_URL}${search}&limit=15&language=pt-BR`, {
        headers: {
          Authorization: `Bearer ${THE_MOVIE_DB_API_TOKEN}`,
        },
      })
      .then((response) => response.data),
};

export default moviesApi;

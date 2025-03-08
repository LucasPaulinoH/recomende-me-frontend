import axios from "axios";

const songsApi = {
  searchSong: (search: string) =>
    axios
      .get(
        `${import.meta.env.VITE_LAST_FM_API_URL}${search}&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&limit=10&format=json`
      )
      .then((response) => response.data),
};

export default songsApi;

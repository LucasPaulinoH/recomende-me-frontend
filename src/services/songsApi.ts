import axios from "axios";

//const CONTROLLER_URL = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=`;
//const LAST_FM_API_KEY = "47dec8dd38bd326c00165a3c77d05637";

const songsApi = {
  searchSong: (search: string) =>
    axios
      .get(
        `${import.meta.env.VITE_LAST_FM_API_URL}${search}&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&limit=10&format=json`
      )
      .then((response) => response.data),
};

export default songsApi;

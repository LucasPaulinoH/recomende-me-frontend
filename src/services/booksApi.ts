import axios from "axios";

const CONTROLLER_URL = `https://www.googleapis.com/books/v1/volumes?q=`;

const booksApi = {
  searchBook: (search: string) =>
    axios
      .get(`${CONTROLLER_URL}${search}`)
      .then((response) => response.data.items),
};

export default booksApi;

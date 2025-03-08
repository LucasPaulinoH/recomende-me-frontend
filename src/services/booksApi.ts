import axios from "axios";

const booksApi = {
  searchBook: (search: string) =>
    axios
      .get(`${import.meta.env.VITE_GOOGLE_BOOKS_API_URL}${search}`)
      .then((response) => response.data.items),
};

export default booksApi;

interface BookListProps {
  results: any[];
}

const BookList = (props: BookListProps) => {
  const { results } = props;

  return (
    <ul className="flex flex-col items-center content-center gap-[20px] max-w-[400px] max-h-[200px] overflow-auto border">
      {results.map((result, index) => (
        <li
          key={index}
          className="flex flex-row items-center content-center hover:bg-[rgba(255,255,255,0.1)] cursor-pointer gap-[20px] w-full"
        >
          <img
            src={result?.volumeInfo?.imageLinks?.smallThumbnail}
            className="w-[100px] h-[100px]"
            alt={result?.volumeInfo?.imageLinks?.smallThumbnail}
          />
          <div>
            <p className="font-bold">{result?.volumeInfo?.title}</p>
            <p>
              {result?.volumeInfo?.authors
                ? result?.volumeInfo?.authors[0]
                : "Desconhecido"}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;

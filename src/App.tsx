import React, { useCallback, useRef, useState } from "react";
import { UseBookSerach } from "./useBookSerach";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  function handleSearch(e: any) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  const { loading, error, books, hasMore } = UseBookSerach(query, pageNumber);
  // console.log("books", books);

  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  return (
    <>
      <input type="text" onChange={handleSearch} />
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}
      <div>{loading && "Loading..."}</div>

      <div>{error && "Error"}</div>
    </>
  );
}

export default App;

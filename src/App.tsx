import React, { useState } from "react";
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

  return (
    <>
      <input type="text" onChange={handleSearch} />
      {books.map((book) => {
        return <div key={book}>{book}</div>;
      })}
      <div>{loading && "Loading..."}</div>

      <div>{error && "Error"}</div>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

export function UseBookSerach(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);

    /* fetch를 사용한 기본 쿼리
    let q = `q=${query}`;
    let page = `&page=${pageNumber}`;
    fetch("http://openlibrary.org/search.json?" + q + page).then((res) => {
      res.json().then((response) => {
        console.log(response.docs);
      });
    });
    //*/
    //* 강사가 제신한 방법으로  axios cancel로 비동기 요청 취소
    let cancel: Canceler;

    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((b: any) => b.title),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
    //*/
    /* 최신 axios 방법

    const CancelToken = axios.CancelToken;
    let cancel: Canceler;
    let q = `q=${query}`;
    let page = `&page=${pageNumber}`;
    axios.get(`http://openlibrary.org/search.json${q}${page}`, {
      cancelToken: new CancelToken(function executor(c) {
        // excutor 함수는 cancel 함수를 매개 변수로 받습니다.
        cancel = c;
      }),
    });

    // 요청 취소
    cancel();

    //*/
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
}

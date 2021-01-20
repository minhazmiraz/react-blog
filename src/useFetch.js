import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCrtl = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCrtl.signal })
        .then((response) => {
          if (!response.ok) {
            throw Error("Couldn't fetch data from this resource.");
          }
          //console.log(response.json());
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCrtl.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

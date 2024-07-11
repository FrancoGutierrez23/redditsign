import React from "react";

const cache = new Map();

export const fetchSuspense = (key, fetcher) => {
  if (!cache.has(key)) {
    const promise = fetcher().then(
      data => cache.set(key, { data }),
      error => cache.set(key, { error })
    );
    cache.set(key, { promise });
  }

  const entry = cache.get(key);
  if (entry.promise) throw entry.promise;
  if (entry.error) throw entry.error;

  return entry.data;
};

export const useSuspenseFetch = (key, fetcher) => {
  return React.useMemo(() => fetchSuspense(key, fetcher), [key, fetcher]);
};

import { API_KEY } from "@/libs/constants";
import { useEffect, useMemo, useState } from "react";

type UseFetchArgs = {
  url: string;
  method?: string;
  headers?: HeadersInit;
  enabled?: boolean;
};

type UseFetchResult<T> = {
  data: T | undefined;
  isLoading: boolean;
};

export function useFetch<T = unknown>({
  url,
  method = "GET",
  headers = {},
  enabled = true,
}: UseFetchArgs): UseFetchResult<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  const mergedHeaders = useMemo(
    () => ({
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
      ...headers,
    }),
    [headers],
  );

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);

      fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
        method,
        headers: mergedHeaders,
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          const json = (await res.json()) as unknown;
          setData(json as T);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers), enabled]);

  return { data, isLoading };
}

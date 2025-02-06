import { useState, useEffect } from "react";

export const BASE_URL = "https://fe-hometask-api.dev.vault.tryvault.com";

export const useFetch = <TResponse>({
  initialUrl = "",
  isInitiallyTriggered = false,
}: {
  initialUrl?: string;
  isInitiallyTriggered?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TResponse | undefined>(undefined);

  async function queryData(
    props?:
      | { url?: string; body?: undefined; method?: "GET" }
      | { url?: string; body: unknown; method: "POST" },
  ) {
    const { body, method = "GET", url } = props ?? {};
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${url ?? initialUrl}`, {
        method,
        body: JSON.stringify(body),
      });
      const resData = (await res.json()) as TResponse;

      setData(resData);
      return resData;
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isInitiallyTriggered) queryData();
  }, []);

  return {
    data,
    isLoading,
    isError,
    queryData,
  };
};

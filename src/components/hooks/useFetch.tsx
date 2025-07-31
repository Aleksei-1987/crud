import { useState } from "react";
import type { FetchProps } from "./types/FetchProps";
import type { FetchStatusProps } from "./types/FetchStateProps";
/**
 * Хук для выполнения HTTP-запросов.
 * @template T - тип для опций запроса (RequestInit или undefined)
 * @param {FetchProps<T>} props - объект с URL и опциями запроса
 * @returns {{ isLoading: boolean, data: any, error: Error | null, fetchNow: () => Promise<void> }}
 *    объект со статусом запроса, данными, ошибкой и функцией для выполнения запроса
 */
const useFetch = <T extends RequestInit | undefined>({
  url,
  options,
}: FetchProps<T>) => {
  const [status, setStatus] = useState<FetchStatusProps>({
    isLoading: false,
    data: undefined,
    error: null,
  });

  async function fetchNow() {
    setStatus((prevStatus) => ({ ...prevStatus, isLoading: true }));

    const response = await fetch(url, options);
    try {
      if (!response.ok) {
        throw new Error(`Error fetch ${response.statusText}`);
      }

      const result = response.status === 204 ? null : await response.json();

      setStatus((prevStatus) => ({
        ...prevStatus,
        data: result,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
        error: error,
      }));
    } finally {
      setStatus((prevStatus) => ({ ...prevStatus, isLoading: false }));
    }
  }

  return { ...status, fetchNow };
};

export default useFetch;
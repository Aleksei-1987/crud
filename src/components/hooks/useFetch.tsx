import { useState, useCallback } from "react";
import type { FetchProps } from "./types/FetchProps";
import type { FetchStatusProps } from "./types/FetchStateProps";

// Класс для отмены асинхронных операций с обеспечением строгих типов
class AbortablePromise<T> {
  private promise: Promise<T>;
  private controller: AbortController;

  constructor(promiseFn: () => Promise<T>) {
    this.controller = new AbortController();
    this.promise = promiseFn()
      .then((value) => value)
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return Promise.reject(reason);
        }
        return Promise.reject(reason);
      });
  }

  cancel(): void {
    this.controller.abort();
  }

  then<U>(
    onFulfilled?: (value: T) => U | PromiseLike<U>,
    onRejected?: (reason: unknown) => U | PromiseLike<U>
  ): Promise<U> {
    return this.promise.then(onFulfilled!, onRejected!) as Promise<U>;
  }

  catch<U>(onRejected?: (reason: unknown) => U | PromiseLike<U>): Promise<U> {
    return this.promise.catch(onRejected!) as Promise<U>; 
  }
}


const useFetch = <T extends RequestInit | undefined>({
  url,
  options,
}: FetchProps<T>): FetchStatusProps & { fetchNow: () => Promise<void> } => {
  const [status, setStatus] = useState<FetchStatusProps>({
    isLoading: false,
    data: undefined,
    error: null,
  });

  let activePromise: AbortablePromise<Response> | null = null;

  
  const fetchNow = useCallback(async () => {
    if (activePromise) {
      activePromise.cancel(); 
    }

    setStatus((prevStatus) => ({ ...prevStatus, isLoading: true }));

    activePromise = new AbortablePromise<Response>(async () => {
      const response = await fetch(url, options);
      return response;
    });

    try {
      const response = await activePromise;
      if (!response.ok) {
        throw new Error(`Ошибка при запросе (${response.status}): ${response.statusText}`);
      }

      const result = response.status === 204 ? {} : await response.json();

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
    }
  }, [url, options]);

  return { ...status, fetchNow };
};

export default useFetch;
import { useCallback, useEffect, useRef, useState } from "react"

type FetchOptions = {
    poll?: number;
}

type FetchDataOptions = {
    variables?: Record<string, string>;
}

export const createFetch = <T, E = unknown>(url: string, options?: FetchOptions) => {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const [loading, setLoading] = useState(false);
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const [data, setData] = useState<T>();
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const [error, setError] = useState<E>();
    
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const fetchData = useCallback(async (fetchDataOptions?: FetchDataOptions): Promise<T> => {
        let data;
        try {
            setLoading(true);
            const existingURL = new URL(url);
            for (const [key, value] of Object.entries(fetchDataOptions?.variables ?? {})) {
                existingURL.searchParams.set(key, value);
            }
            const response = await fetch(existingURL.toString());
            data = await response.json();
            setData(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setError(e);
        } finally {
            setLoading(false);
            // eslint-disable-next-line no-unsafe-finally
            return data;
        }
    }, [url])

    /* eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any */
    const timer = useRef<any>();
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    useEffect(() => {
        clearInterval(timer.current);
        if (options?.poll) {
            timer.current = setInterval(() => {
                fetchData();
            }, options.poll);
            return () => clearInterval(timer.current);
        }
    }, [fetchData, options])

    return {
        fetchData,
        data,
        loading,
        error,
    }
}

export const useLazyFetch = <T = undefined, E = undefined>(url: string, options?: FetchOptions) => createFetch<T, E>(url, options);

export const useFetch = <T = undefined, E = undefined>(url: string, options?: FetchOptions) => {
    const { fetchData, data, loading, error } = createFetch<T, E>(url, options);
    useEffect(() => {
        fetchData();
    }, [fetchData, url]);

    return { data, loading, error }
}
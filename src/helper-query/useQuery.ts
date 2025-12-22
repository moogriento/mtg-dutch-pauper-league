import { useEffect, useState, useCallback } from 'react';

type UseQueryOptions<T> = {
  queryKey: unknown[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
};

export function useQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, queryKey);

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  };
}

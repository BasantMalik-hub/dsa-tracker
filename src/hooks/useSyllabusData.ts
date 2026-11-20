import { useState, useEffect, useCallback } from 'react';
import { Unit } from '../types';

let cachedUnits: Unit[] | null = null;

export interface UseSyllabusDataResult {
  units: Unit[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSyllabusData(): UseSyllabusDataResult {
  const [units, setUnits] = useState<Unit[]>(() => cachedUnits || []);
  const [loading, setLoading] = useState<boolean>(() => !cachedUnits);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const url = `${normalizedBase}data/syllabus.json`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load syllabus: HTTP ${res.status} ${res.statusText}`);
      }
      const data: Unit[] = await res.json();
      cachedUnits = data;
      setUnits(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    if (cachedUnits) return;

    const baseUrl = import.meta.env.BASE_URL || '/';
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const url = `${normalizedBase}data/syllabus.json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load syllabus: HTTP ${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<Unit[]>;
      })
      .then((data) => {
        if (!ignore) {
          cachedUnits = data;
          setUnits(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return {
    units,
    loading,
    error,
    refetch: loadData
  };
}

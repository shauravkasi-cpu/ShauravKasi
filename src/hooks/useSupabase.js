import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Custom hook for fetching data from a Supabase table.
 * @param {string} table - The table name to fetch from.
 * @param {object} options - Optional config.
 * @param {string} options.orderBy - Column to order by (default: 'sort_order').
 * @param {boolean} options.ascending - Sort direction (default: true).
 * @param {object[]} options.filters - Array of { column, operator, value } filters.
 * @param {boolean} options.enabled - Whether to run the query (default: true).
 * @returns {{ data: any[], loading: boolean, error: string|null, refetch: Function }}
 */
export function useSupabase(table, options = {}) {
  const {
    orderBy = 'sort_order',
    ascending = true,
    filters = [],
    enabled = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let query = supabase.from(table).select('*');

      // Apply filters
      filters.forEach(({ column, operator, value }) => {
        query = query.filter(column, operator, value);
      });

      // Apply ordering
      if (orderBy) {
        query = query.order(orderBy, { ascending });
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setData(result || []);
    } catch (err) {
      console.error(`Error fetching from ${table}:`, err);
      setError(err.message || 'Failed to fetch data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table, enabled]);

  return { data, loading, error, refetch: fetchData };
}

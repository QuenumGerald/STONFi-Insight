import { useState, useEffect } from 'react';
import { fetchPools, fetchPoolTransactions } from '../utils/stonfi';

export interface Pool {
  id: string;
  name: string;
  tvl: number;
  apr: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  token0Symbol: string;
  token1Symbol: string;
}

export interface PoolTransaction {
  timestamp: string;
  type: string;
  amount0: string;
  amount1: string;
  account: string;
}

export const usePoolData = (selectedPoolId: string | null) => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [poolTransactions, setPoolTransactions] = useState<PoolTransaction[] | null>(null);

  // Fetch pools data
  useEffect(() => {
    let mounted = true;

    const loadPools = async () => {
      try {
        console.log('Starting to fetch pools...');
        setLoading(true);
        setError(null);
        const response = await fetchPools();
        console.log('Received pools response:', response);
        
        if (mounted) {
          if (!response.data) {
            console.error('No data in response');
            setPools([]);
          } else {
            console.log(`Setting ${response.data.length} pools`);
            setPools(response.data);
          }
        }
      } catch (err) {
        console.error('Error fetching pools:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch pools');
          setPools([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPools();
    return () => {
      mounted = false;
    };
  }, []);

  // Update selected pool and fetch its transactions when selectedPoolId changes
  useEffect(() => {
    let mounted = true;

    const loadPoolTransactions = async () => {
      if (!selectedPoolId) {
        setSelectedPool(null);
        setPoolTransactions(null);
        return;
      }

      const pool = pools.find(p => p.id === selectedPoolId);
      setSelectedPool(pool || null);

      try {
        setLoading(true);
        const transactions = await fetchPoolTransactions(selectedPoolId);
        if (mounted) {
          setPoolTransactions(transactions);
        }
      } catch (err) {
        console.error('Error fetching pool transactions:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch pool transactions');
          setPoolTransactions(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPoolTransactions();
    return () => {
      mounted = false;
    };
  }, [selectedPoolId, pools]);

  return {
    pools,
    loading,
    error,
    selectedPool,
    poolTransactions
  };
};

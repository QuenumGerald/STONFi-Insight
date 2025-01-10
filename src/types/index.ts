export interface Pool {
  id: string;
  name: string;
  tvl: number;
  apr: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  volume24h: number;
  token0: string;
  token1: string;
  token0Symbol: string;
  token1Symbol: string;
}

export interface HistoricalTVL {
  timestamp: string;
  value: number;
}

export interface PoolData {
  pools: Pool[];
  lastUpdated: string;
}

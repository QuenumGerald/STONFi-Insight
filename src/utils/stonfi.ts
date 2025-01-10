import { StonApiClient, Pool as ApiPool, Asset, OperationData } from '@ston-fi/api';
import { Pool, PoolTransaction } from '../hooks/usePoolData';

// Initialize client with default options
const client = new StonApiClient();

// Number of pools to display
const MAX_POOLS = 20;
// Number of transactions to fetch
const MAX_TRANSACTIONS = 100;

export const fetchPools = async (): Promise<{ data: Pool[] }> => {
  try {
    console.log('Fetching pools from STON.fi API...');
    
    // Fetch pools and assets in parallel for better performance
    const [poolsResponse, assets] = await Promise.all([
      client.getPools(),
      client.getAssets()
    ]).catch(error => {
      console.error('Failed to fetch data:', error);
      return [[], []];
    });

    console.log(`Found ${poolsResponse.length} pools and ${assets.length} assets`);

    // Create a map of assets for quick lookup
    const assetMap = new Map<string, Asset>(
      assets.map(asset => [asset.contractAddress, asset])
    );

    // Transform and sort the pools by TVL
    const transformedPools = await Promise.all(
      poolsResponse
        // First filter out invalid pools
        .filter(pool => 
          !pool.deprecated && 
          parseFloat(pool.lpTotalSupplyUsd || '0') > 0 &&
          assetMap.has(pool.token0Address) &&
          assetMap.has(pool.token1Address)
        )
        // Sort by TVL in descending order
        .sort((a, b) => parseFloat(b.lpTotalSupplyUsd || '0') - parseFloat(a.lpTotalSupplyUsd || '0'))
        // Transform the pools
        .map(async (pool: ApiPool) => {
          try {
            const token0Info = assetMap.get(pool.token0Address)!;
            const token1Info = assetMap.get(pool.token1Address)!;

            const transformedPool: Pool = {
              id: pool.address,
              name: `${token0Info.symbol}/${token1Info.symbol}`,
              tvl: parseFloat(pool.lpTotalSupplyUsd || '0'),
              apr: {
                '24h': parseFloat(pool.apy1D || '0') * 100,
                '7d': parseFloat(pool.apy7D || '0') * 100,
                '30d': parseFloat(pool.apy30D || '0') * 100
              },
              token0Symbol: token0Info.symbol,
              token1Symbol: token1Info.symbol
            };

            return transformedPool;
          } catch (error) {
            console.error(`Error transforming pool ${pool.address}:`, error);
            return null;
          }
        })
    );

    const validPools = transformedPools
      .filter((pool): pool is Pool => pool !== null)
      // Take only the top pools after transformation
      .slice(0, MAX_POOLS);
    console.log(`Successfully transformed ${validPools.length} pools`);
    return { data: validPools };
  } catch (error) {
    console.error('Error fetching pools:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch pools');
  }
};

export const fetchPoolTransactions = async (poolId: string): Promise<PoolTransaction[]> => {
  try {
    console.log('Fetching transactions for pool:', poolId);
    
    // Get operations for the pool
    const operations = await client.getOperations({
      poolAddress: poolId,
      since: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      until: new Date()
    });

    // Filter and transform operations into transactions
    const transactions = operations
      .slice(0, MAX_TRANSACTIONS)
      .map(op => {
        const amounts = getAmountsFromOperation(op.operation);
        return {
          timestamp: op.operation.poolTxTimestamp,
          type: op.operation.operationType,
          amount0: amounts.amount0,
          amount1: amounts.amount1,
          account: op.operation.destinationWalletAddress
        };
      });

    console.log(`Found ${transactions.length} transactions for pool ${poolId}`);
    return transactions;
  } catch (error) {
    console.error('Error fetching pool transactions:', error);
    return [];
  }
};

function getAmountsFromOperation(operation: OperationData): { amount0: string; amount1: string } {
  const amounts = {
    amount0: '0',
    amount1: '0'
  };

  // Try to get amounts based on operation fields
  if (operation.swapAmount && operation.minOutAmount) {
    amounts.amount0 = operation.swapAmount;
    amounts.amount1 = operation.minOutAmount;
  } else if (operation.token0Amount && operation.token1Amount) {
    amounts.amount0 = operation.token0Amount;
    amounts.amount1 = operation.token1Amount;
  } else if (operation.token0DepositAmount && operation.token1DepositAmount) {
    amounts.amount0 = operation.token0DepositAmount;
    amounts.amount1 = operation.token1DepositAmount;
  } else if (operation.token0WithdrawAmount && operation.token1WithdrawAmount) {
    amounts.amount0 = operation.token0WithdrawAmount;
    amounts.amount1 = operation.token1WithdrawAmount;
  }

  return amounts;
}

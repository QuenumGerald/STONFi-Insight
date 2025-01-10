declare module '@ston-fi/api' {
  export interface Asset {
    contractAddress: string;
    symbol: string;
    decimals: number;
  }

  export interface Pool {
    address: string;
    token0Address: string;
    token1Address: string;
    lpTotalSupplyUsd: string;
    apy1D: string;
    apy7D: string;
    apy30D: string;
    deprecated: boolean;
  }

  export interface OperationData {
    poolTxHash: string;
    poolAddress: string;
    routerAddress: string;
    poolTxLt: number;
    poolTxTimestamp: string;
    destinationWalletAddress: string;
    operationType: string;
    swapAmountUsd?: string;
    swapAmount?: string;
    minOutAmount?: string;
    token0Amount?: string;
    token1Amount?: string;
    token0DepositAmount?: string;
    token1DepositAmount?: string;
    token0WithdrawAmount?: string;
    token1WithdrawAmount?: string;
  }

  export interface Operation {
    operation: OperationData;
  }

  export class StonApiClient {
    getOperations(params: {
      poolAddress?: string;
      since: Date;
      until: Date;
    }): Promise<Operation[]>;

    getPools(): Promise<Pool[]>;
    getAssets(): Promise<Asset[]>;
  }
}

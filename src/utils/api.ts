import { fetchPools as fetchPoolsFromSDK } from './stonfi';

export interface APIResponse<T> {
  data: T;
  timestamp: string;
}

export const fetchPools = async () => {
  return fetchPoolsFromSDK();
};

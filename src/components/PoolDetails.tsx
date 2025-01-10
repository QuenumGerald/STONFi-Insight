import React from 'react';
import {
  Box,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Skeleton,
} from '@chakra-ui/react';
import { formatCurrency, formatPercentage } from '../utils/format';
import { Pool } from '../hooks/usePoolData';

interface PoolDetailsProps {
  pool: Pool | null;
  transactions: Array<{
    timestamp: string;
    type: string;
    amount0: string;
    amount1: string;
    account: string;
  }> | null;
  isLoading: boolean;
}

export const PoolDetails: React.FC<PoolDetailsProps> = ({
  pool,
  transactions,
  isLoading,
}) => {
  const bgColor = 'gray.800';
  const borderColor = 'gray.700';
  const textColor = 'gray.400';
  const positiveColor = 'green.300';
  const negativeColor = 'red.300';

  if (!pool) return null;

  return (
    <VStack spacing={6} width="100%" align="stretch">
      <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <Heading size="md" mb={6} color="white">{pool.name} Pool Details</Heading>
        <StatGroup>
          <Stat>
            <StatLabel color={textColor}>TVL</StatLabel>
            <StatNumber color="white">{formatCurrency(pool.tvl)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={textColor}>24h APR</StatLabel>
            <StatNumber color={pool.apr['24h'] > 0 ? positiveColor : negativeColor}>
              {formatPercentage(pool.apr['24h'])}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={textColor}>7d APR</StatLabel>
            <StatNumber color={pool.apr['7d'] > 0 ? positiveColor : negativeColor}>
              {formatPercentage(pool.apr['7d'])}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <Heading size="md" mb={6} color="white">Recent Transactions</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={textColor}>Time</Th>
              <Th color={textColor}>Type</Th>
              <Th color={textColor}>{pool.token0Symbol}</Th>
              <Th color={textColor}>{pool.token1Symbol}</Th>
              <Th color={textColor}>Account</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <Tr key={i}>
                  <Td><Skeleton height="20px" width="150px" /></Td>
                  <Td><Skeleton height="20px" width="100px" /></Td>
                  <Td><Skeleton height="20px" width="120px" /></Td>
                  <Td><Skeleton height="20px" width="120px" /></Td>
                  <Td><Skeleton height="20px" width="200px" /></Td>
                </Tr>
              ))
            ) : transactions && transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <Tr key={index}>
                  <Td>
                    <Text color="white">{new Date(tx.timestamp).toLocaleString()}</Text>
                  </Td>
                  <Td>
                    <Text color="white" textTransform="capitalize">{tx.type.toLowerCase()}</Text>
                  </Td>
                  <Td>
                    <Text color="white">{tx.amount0}</Text>
                  </Td>
                  <Td>
                    <Text color="white">{tx.amount1}</Text>
                  </Td>
                  <Td>
                    <Text color="white" isTruncated maxW="200px">{tx.account}</Text>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign="center" color={textColor}>
                  No transactions found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

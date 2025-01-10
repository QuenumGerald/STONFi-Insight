import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import { formatCurrency, formatPercentage } from '../utils/format';
import { Pool } from '../hooks/usePoolData';

interface PoolTableProps {
  pools: Pool[];
  isLoading: boolean;
}

export const PoolTable: React.FC<PoolTableProps> = ({
  pools,
  isLoading,
}) => {
  const navigate = useNavigate();
  const bgColor = 'gray.800';
  const borderColor = 'gray.700';
  const hoverBg = 'gray.700';
  const positiveColor = 'green.300';
  const negativeColor = 'red.300';

  const handlePoolClick = (poolId: string) => {
    navigate(`/pool/${poolId}`);
  };

  return (
    <Box
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      bg={bgColor}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Pool</Th>
            <Th isNumeric>TVL</Th>
            <Th isNumeric>APR 24h</Th>
            <Th isNumeric>APR 7d</Th>
            <Th isNumeric>APR 30d</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <Tr key={i}>
                <Td><Skeleton height="20px" width="200px" /></Td>
                <Td><Skeleton height="20px" width="100px" /></Td>
                <Td><Skeleton height="20px" width="80px" /></Td>
                <Td><Skeleton height="20px" width="80px" /></Td>
                <Td><Skeleton height="20px" width="80px" /></Td>
              </Tr>
            ))
          ) : (
            pools.map((pool) => (
              <Tr
                key={pool.id}
                onClick={() => handlePoolClick(pool.id)}
                cursor="pointer"
                _hover={{ bg: hoverBg }}
                transition="background-color 0.2s"
              >
                <Td>
                  <Text fontWeight="medium">{pool.name}</Text>
                </Td>
                <Td isNumeric>
                  <Text>{formatCurrency(pool.tvl)}</Text>
                </Td>
                <Td isNumeric>
                  <Text color={pool.apr['24h'] > 0 ? positiveColor : negativeColor}>
                    {formatPercentage(pool.apr['24h'])}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text color={pool.apr['7d'] > 0 ? positiveColor : negativeColor}>
                    {formatPercentage(pool.apr['7d'])}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text color={pool.apr['30d'] > 0 ? positiveColor : negativeColor}>
                    {formatPercentage(pool.apr['30d'])}
                  </Text>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

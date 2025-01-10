import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  IconButton,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PoolDetails } from '../components/PoolDetails';
import { usePoolData } from '../hooks/usePoolData';

export const PoolDetailsPage: React.FC = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const navigate = useNavigate();
  const bgColor = 'gray.900';

  const { selectedPool, poolTransactions, loading } = usePoolData(poolId || null);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <HStack spacing={4} mb={6}>
          <IconButton
            aria-label="Back to pools"
            icon={<ArrowBackIcon />}
            onClick={handleBack}
            variant="ghost"
            color="white"
            _hover={{ bg: 'gray.800' }}
          />
          <Heading size="lg" color="white">Pool Details</Heading>
        </HStack>

        <PoolDetails
          pool={selectedPool}
          transactions={poolTransactions}
          isLoading={loading}
        />
      </Container>
    </Box>
  );
};

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { PoolTable } from '../components/PoolTable';
import { usePoolData } from '../hooks/usePoolData';

export const PoolsListPage: React.FC = () => {
  const bgColor = 'gray.900';
  const textColor = 'white';

  const [searchQuery, setSearchQuery] = useState('');
  const { pools, loading, error } = usePoolData(null);

  const filteredPools = pools.filter(pool =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={2} align="stretch">
            <Heading size="lg">STONFi Insight</Heading>
            <Text>Explore STONFi pools and their performance metrics</Text>
          </VStack>

          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Search pools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                pr="4.5rem"
              />
              {searchQuery && (
                <IconButton
                  aria-label="Clear search"
                  icon={<CloseIcon />}
                  size="sm"
                  position="absolute"
                  right="2"
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={() => setSearchQuery('')}
                />
              )}
            </InputGroup>
          </Box>

          {error ? (
            <Text color="red.500">Error: {error}</Text>
          ) : (
            <PoolTable
              pools={filteredPools}
              isLoading={loading}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
};

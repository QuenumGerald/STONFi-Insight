import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { PoolsListPage } from './pages/PoolsListPage';
import { PoolDetailsPage } from './pages/PoolDetailsPage';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Routes>
          <Route path="/" element={<PoolsListPage />} />
          <Route path="/pool/:poolId" element={<PoolDetailsPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

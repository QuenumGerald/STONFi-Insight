import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  styles: {
    global: (props: any) => ({
      'html, body': {
        backgroundColor: 'gray.900',
        color: 'white',
      },
      '*': {
        borderColor: 'gray.700',
      },
    }),
  },
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: 'gray.900', _dark: 'gray.900' },
      'chakra-body-text': { _light: 'white', _dark: 'white' },
    },
  },
});

export default theme;

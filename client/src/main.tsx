// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// react-router-dom
import { BrowserRouter } from 'react-router-dom';

// emotion
import { GlobalStyle, theme } from './styles';
import { ThemeProvider } from '@emotion/react';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ModalProvider from './components/ModalProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 1000 * 60 * 3, // 3m
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
        <ModalProvider />
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  // </React.StrictMode>,
);

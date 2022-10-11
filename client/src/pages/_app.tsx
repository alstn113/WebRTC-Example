// next
import type { AppProps } from 'next/app';
import { useState } from 'react';

// emotion
import GlobalStyle from '~/styles/GlobalStyle';
import { theme } from '~/styles/theme';
import { ThemeProvider } from '@emotion/react';

// react-query
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function MyApp({ Component, pageProps }: AppProps<any>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

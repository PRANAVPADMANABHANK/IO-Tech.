"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { ReactNode } from "react"

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}

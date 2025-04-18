import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { AuthProvider } from './contexts/AuthContext' // Import AuthProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster as DefaultToaster } from '@/components/ui/toaster' 
import { Toaster as SonnerToaster } from '@/components/ui/sonner' 

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* AuthProvider should ideally wrap CartProvider and WishlistProvider */}
        {/* as they might depend on auth status */}
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
              <DefaultToaster />
              <SonnerToaster position="top-right" richColors />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

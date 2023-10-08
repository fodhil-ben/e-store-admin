"use client"
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsProvider from './ProductsProvider'
import CategoriesProvider from './CategoriesProvider'

type Props = {
    children: ReactNode
}

export const queryClient = new QueryClient()
const Provider = ({ children }: Props) => {
    return (
        <CategoriesProvider>
            <ProductsProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ProductsProvider>
        </CategoriesProvider>
    )
}

export default Provider
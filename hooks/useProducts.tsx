"use client"
import { ProductsContext } from "@/Providers/ProductsProvider"
import { useContext } from "react"

const useProducts = () => {
    const context: any = useContext(ProductsContext)
    if (context) {
        return { ...context }
    } else {
        throw new Error('products context must be used inside ProductsProvider')
    }
}

export default useProducts
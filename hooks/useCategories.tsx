"use client"
import { CategoriesContext } from "@/Providers/CategoriesProvider"
import { useContext } from "react"

function useCategories() {
    const context: any = useContext(CategoriesContext)
    if (context) {
        console.log(context);
        return { ...context }
    } else {
        throw new Error('Categories context must be used inside CategoriesProvider')
    }
}

export default useCategories
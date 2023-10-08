"use client"
import React, { ReactNode, createContext, useReducer, useState } from 'react'

// type Props = {
//     children: ReactNode
// }


// const editProducts = (state, action) => {
//     state.products.map((e) => {
//         if (e._id = action.payload._id) {
//             e = action.payload
//         }
//     })
// }

export const ProductsContext = createContext([])

// const productsReducer = (state, action) => {
//     switch (action.type) {
//         case "SET_PRODUCTS":
//             return { products: action.payload }
//         case "ADD_PRODUCTS":
//             return { products: [...state.products, action.payload] }
//         case "EDIT_PRODUCTS":
//             return { products: editProducts(state, action) }
//         case "DELETE_PRODUCTS":
//             return { products: action.payload }

//         default:
//             break;
//     }
// }

const ProductsProvider = ({ children }) => {
    // const [products, dispatch] = useReducer < any > (productsReducer, { products: [] })
    const [ActiveProduct, setActiveProduct] = useState({})
    return (
        <ProductsContext.Provider value={{ ActiveProduct, setActiveProduct }}>
            {children}
        </ProductsContext.Provider >
    )
}

export default ProductsProvider
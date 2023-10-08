"use client"
import React, { createContext, useReducer, useState } from 'react'


const editCategories = (state, action) => {
    state.categories.map((e) => {
        if (e._id = action.payload._id) {
            e = action.payload
        }
    })
}

export const CategoriesContext = createContext([])

const categoriesReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORIES":
            return { categories: action.payload }
        case "ADD_CATEGORIES":
            return { categories: [...state.categories, action.payload] }
        case "EDIT_CATEGORIES":
            return { categories: editCategories(state, action) }
        case "DELETE_CATEGORIES":
            return { categories: action.payload }

        default:
            return state;
    }
}

const CategoriesProvider = ({ children }) => {
    const [categories, dispatch] = useReducer(categoriesReducer, { categories: [] })
    // const [ActiveProduct, setActiveProduct] = useState({})
    return (
        <CategoriesContext.Provider value={{ ...categories, dispatch }}>
            {children}
        </CategoriesContext.Provider >
    )
}

export default CategoriesProvider
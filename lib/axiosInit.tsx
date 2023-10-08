import axios from "axios";

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://e-store-admin-fodhil-ben.vercel.app'

export const auth = axios.create({
    baseURL: BASE_URL
})


export const getProducts = async () => {
    const response = await auth.get(`/api/products`)
    return response.data.products
}

export const getProduct = async (productId: string) => {
    const response = await auth.get(`/api/products?id=${productId}`)
    return response.data
}


export async function getCategories() {
    const response = await auth.get(`/api/categories`)
    return response.data.categories
}

export const getOrders = async () => {
    const response = await auth.get(`/api/orders`)
    return response.data.orders
}
export const getUsers = async () => {
    const response = await auth.get(`/api/users`)
    return response.data
}
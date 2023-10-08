"use client"
import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/axiosInit'
import { IProduct } from '@/models/Product'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
type Props = {}

const DeleteProduct = (props: Props) => {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const { productId } = useParams()
    const { refetch } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60
    })
    const handleDelete = async () => {
        setError('')
        try {
            await axios.delete('/api/products', {
                headers: {
                    "Content-Type": 'application/json'
                },
                data: { _id: productId }
            }) as AxiosResponse
            refetch()
            router.push('/products')

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.request.status === 401) router.push('/unauthorized')
                setError(error.request.response)
            }
            else {
                console.log(error)
                setError('Error happened try again')
            }

        }
    }

    return (
        <>
            <div className='bg-gray-200 dark:bg-black font-semibold shadow-2xl dark:shadow-gray-800 rounded-xl w-2/3 m-auto mt-20 px-10 py-5 text-2xl grid gap-10'>
                <div className='text-center '>By clicking on confirm the product will be deleted permanently</div>
                <div className='grid grid-cols-2 gap-10'>
                    <Button className='text-xl' onClick={() => router.back()}>Cancel</Button>
                    <Button className='text-xl' onClick={handleDelete}>Confirm</Button>
                </div>
            </div>
            <div onClick={() => setError('')} className={`bg-error py-2 cursor-pointer px-5 md:py-5 md:px-10 absolute top-10  rounded-2xl w-fit md:text-xl mb-10 font-bold  ${error ? 'block' : ' hidden'} `}>{error}</div>

        </>
    )
}

export default DeleteProduct
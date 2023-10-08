"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { IProduct } from '@/models/Product'
import { useQuery } from '@tanstack/react-query'
import ProcessingButton from '../ui/ProcessingButton'
import useProducts from '@/hooks/useProducts'
import { getProduct } from '@/lib/axiosInit'

type Props = {}

const ProductElement = ({ productId }: { productId: string }) => {
    const router = useRouter()
    const { data: product, isSuccess, isLoading, error } = useQuery<IProduct>({
        queryKey: ["products", productId],
        queryFn: () => getProduct(productId),
        staleTime: 1000 * 60
    })

    const { setActiveProduct } = useProducts()

    const handleEdit = () => {
        router.push(`/products/${productId}/edit`)
        setActiveProduct(product)
    }
    if (error) return <>Error happened!</>
    return (
        <div className='flex w-full justify-center items-center'>
            {isLoading && <ProcessingButton />}
            {isSuccess &&
                <div className='bg-gray-200 p-10 grid gap-5 rounded-xl'>
                    <Image
                        className='rounded-xl'
                        src={`${product.images ? product.images[0] : '/#'}`}
                        alt='product image'
                        width={300}
                        height={300}
                    />
                    <div className='grid gap-5 dark:text-black'>
                        <div className='text-3xl'>{product?.name}</div>
                        <div>Price: {product?.price} DZ</div>
                        <div>Category: {product?.category}</div>
                        <div className='gap-5 grid grid-cols-2'>
                            <Button onClick={handleEdit}>Edit</Button>
                            <Button onClick={() => router.push(`/products/${productId}/delete`)}>Delete</Button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ProductElement
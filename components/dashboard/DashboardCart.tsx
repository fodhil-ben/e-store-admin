"use client"
import { getProducts } from '@/lib/axiosInit'
import { IProduct } from '@/models/Product'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { BiDollarCircle } from 'react-icons/bi'
import { BsFillBoxFill } from 'react-icons/bs'
type Props = {}

const DashboardCart = (props: Props) => {
    const smallCard = 'border p-5 rounded-xl grid gap-3'
    const { data: products } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 10
    })

    return (
        <div className='grid lg:grid-cols-3 gap-5 mt-10'>
            <div className={smallCard}>
                <div className='flex justify-between w-full items-center text-xl'>
                    Total revenue
                    <BiDollarCircle></BiDollarCircle>
                </div>
                <div className='text-2xl font-bold'>$0.00</div>
            </div>
            <div className={smallCard}>
                <div className='flex justify-between w-full items-center text-xl'>
                    Orders
                    <AiOutlineStock></AiOutlineStock>
                </div>
                <div className='text-2xl font-bold'>10</div>
            </div>
            <div className={smallCard}>
                <div className='flex justify-between w-full items-center text-xl'>
                    Products
                    <BsFillBoxFill></BsFillBoxFill>
                </div>
                <div className='text-2xl font-bold'>{products?.length ? products?.length : '?'}</div>
            </div>
        </div>)
}

export default DashboardCart
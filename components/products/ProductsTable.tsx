"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { redirect, useRouter } from 'next/navigation'
import { IProduct } from '@/models/Product'
import { useQuery } from '@tanstack/react-query'
import ProcessingButton from '../ui/ProcessingButton'
import MainTitle from '@/components/ui/MainTitle'
import { Input } from '@/components/ui/Input'
import { IoAddOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getProducts } from '@/lib/axiosInit'
import { useEffect, useState } from "react"

type Props = {}

const ProductsTable = ({ }: Props) => {
    const router = useRouter()
    const { data: products, isLoading, isSuccess, error } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 10
    })

    const [searched, setSearched] = useState<string>('')
    const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
    useEffect(() => {
        const newProducts = products?.filter((e) => {
            return e.name.includes(searched)
        })
        setSearchedProducts(newProducts || [])

    }, [searched, products])

    useEffect(() => {
        if (isSuccess) {
            setSearchedProducts(products)
        }
    }, [products, isSuccess])


    return (
        <>
            <MainTitle title={`Products (${Array.isArray(products) ? products?.length : '0'})`} />
            <div className='mb-10 flex flex-col lg:flex-row gap-5 justify-between'>
                <Input value={searched} onChange={(e) => setSearched(e.target.value)} placeholder='Search...' className='w-full lg:w-fit' />
                <Link href={'/products/add'}>
                    <Button className='flex gap-4 w-full lg:w-fit'>
                        <div className='text-white dark:text-gray-950 text-xl'><IoAddOutline></IoAddOutline></div>
                        Add new
                    </Button>
                </Link>
            </div>
            <div className='overflow-hidden  border-2 rounded-md '>
                {isLoading && <div className='lg:text-3xl'><ProcessingButton /></div>}
                {isSuccess &&
                    <Table className=' '>
                        <TableHeader>
                            <TableRow className='grid grid-cols-4'>

                                <TableHead className='flex justify-start items-center'>name</TableHead>
                                <TableHead className='flex justify-start items-center'>category</TableHead>
                                <TableHead className='flex justify-start items-center'>Price</TableHead>
                                <TableHead className='flex justify-start items-center'>Properties</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                products.length > 0
                                    ? searchedProducts.map((e) => {
                                        return (
                                            <TableRow key={e._id} onClick={() => router.push(`/products/${e._id}`)} className='grid cursor-pointer grid-cols-4'>
                                                <TableCell >{e.name}</TableCell>
                                                <TableCell >{e.category}</TableCell>
                                                <TableCell >{e.price}</TableCell>
                                                <TableCell className="flex flex-wrap gap-3">{e.tags.map((t, i) => {
                                                    return <span key={i} className="bg-black px-5 py-2 dark:bg-white dark:text-black shadow-zinc-400 dark:shadow-gray-700 shadow-xl rounded-md text-white">{t}</span>
                                                })}</TableCell>
                                            </TableRow>)

                                    })
                                    : <TableRow><TableCell>No products to show</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                }
            </div>
        </>
    )
}

export default ProductsTable
// </Link>
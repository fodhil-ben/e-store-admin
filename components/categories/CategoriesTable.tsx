"use client"
import React, { useEffect, useState } from 'react'
import ProcessingButton from '@/components/ui/ProcessingButton'
import { ICategory } from '@/models/Category'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { getCategories } from '@/lib/axiosInit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { IoAddOutline } from 'react-icons/io5'
import MainTitle from '../ui/MainTitle'

type Props = {}

const CategoriesTable = (props: Props) => {
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const { data: categories, isLoading, isSuccess, refetch } = useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60
    })
    const [searched, setSearched] = useState<string>('')
    const [searchedCategories, setSearchedCategories] = useState<ICategory[]>([])



    useEffect(() => {
        const newCategories = categories?.filter((e) => {
            return e.name.includes(searched)
        })
        setSearchedCategories(newCategories || [])
    }, [searched, categories])

    useEffect(() => {
        if (isSuccess) {
            setSearchedCategories(categories)
            console.log('mount')
        }
    }, [categories, isSuccess])

    const router = useRouter()
    const handleEdit = (id: string | undefined, name: string) => {
        router.push(`/categories/edit?_id=${id}&name=${name}`)
    }
    const handleDelete = async (_id: string | undefined) => {
        setError('')
        setMessage('')
        try {
            await axios.delete('/api/categories', {
                headers: {
                    "Content-Type": 'application/json'
                },
                data: { _id }
            }) as AxiosResponse
            setMessage('Category Successfully Deleted')
            console.log('deleted')
            refetch()

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

    return (<>
        <MainTitle title={`Categories (${Array.isArray(categories) ? categories.length : '0'})`} />
        <div className='mb-10 flex flex-col lg:flex-row gap-5 justify-between'>
            <Input value={searched} onChange={(e) => setSearched(e.target.value)} placeholder='Search...' className='w-full lg:w-fit' />
            <Link href={'/categories/add'}>
                <Button className='flex gap-4 w-full lg:w-fit'>
                    <div className='text-white dark:text-gray-950 text-xl'><IoAddOutline></IoAddOutline></div>
                    Add new
                </Button>
            </Link>
        </div>
        <div onClick={() => setError('')} className={`bg-error py-2 cursor-pointer px-5 md:py-5 md:px-10 absolute top-10  rounded-2xl w-fit md:text-xl mb-10 font-bold  ${error ? 'block' : ' hidden'} `}>{error}</div>
        <div onClick={() => setMessage('')} className={`bg-success cursor-pointer py-2 px-5 md:py-5 md:px-10 absolute top-10 left-1/2 -translate-x-1/4 rounded-2xl w-fit md:text-xl mb-10 font-bold  ${message ? 'block' : 'hidden'} `}>{message}</div>
        <div className='overflow-hidden  border-2 rounded-md '>
            {isLoading && <div className='lg:text-3xl'><ProcessingButton /></div>}
            {isSuccess &&
                <div>
                    <div className='p-3'>
                        <div>name</div>
                    </div>
                    <div>

                        {categories.length > 0
                            ? searchedCategories.map((e, i) => {
                                return <div className='border-t flex justify-between p-3 font-bold items-center tracking-wider' key={e._id}>
                                    <div >{e.name}</div>
                                    <div className='flex gap-5'>
                                        <Button onClick={() => handleEdit(e._id, e.name)}>Edit</Button>
                                        <Button onClick={() => handleDelete(e._id)}>Delete</Button>
                                    </div>
                                </div>
                            })
                            : <div className='border-t p-3 tracking-wider'><div>No Categories to show</div></div>
                        }

                    </div>
                </div>}

        </div>
    </>)
}
export default CategoriesTable
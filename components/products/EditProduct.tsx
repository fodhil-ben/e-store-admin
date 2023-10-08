"use client"
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ImageUpload from '@/components/products/ImageUpload'
import axios, { AxiosResponse } from 'axios'
import ProcessingButton from '@/components/ui/ProcessingButton'
import { useRouter } from 'next/navigation'

import { IProduct } from '@/models/Product'
import { ICategory } from '@/models/Category'
import { GiCancel } from 'react-icons/gi'

type Props = {
    categories: ICategory[]
    product: IProduct
}
const EditProduct = ({ categories, product }: Props) => {
    const [tag, setTag] = useState<string>('')
    const [tags, setTags] = useState<string[]>(product.tags || [])
    const [images, setImages] = useState<string[]>(product.images || [])
    const [name, setName] = useState<string>(product.name)
    const [price, setPrice] = useState<string>(product.price)
    const [category, setCategory] = useState<string>(product.category)
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleTags = (t: string) => {
        const newTags = tags.filter(tag => {
            return tag !== t
        })
        setTags(newTags)
    }

    const addTag = (e: React.FormEvent) => {
        e.preventDefault()
        setTags([...tags, tag])
        setTag('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setError('')
        setMessage('')
        e.preventDefault()
        setIsRequestLoading(true)
        try {
            const response = await axios.put('/api/products', { _id: product._id, price, images, name, category, tags }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }) as AxiosResponse
            setMessage('Product Successfully Added')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.request.status === 401) router.push('/unauthorized')
                setError(error.request.response)
            }
            else {
                console.log(error)
                setError('Error happened try again')
            }
        } finally {
            setIsRequestLoading(false)
        }
    }

    return (
        <div className=' overflow-hidden relative'>
            <div className='font-bold text-2xl mb-4'> Create new product </div>
            <form onSubmit={handleSubmit} className='border-y py-5 grid gap-10 '>
                <ImageUpload
                    value={images}
                    onChange={(url) => {
                        setImages([...images, url])
                    }
                    }
                    onRemove={(url => setImages([...images.filter(u => u !== url)]))} />
                <div className='grid gap-10 lg:grid-cols-3 '>
                    <Label className='grid gap-5' htmlFor='name'>
                        Name
                        <Input value={name} onChange={(e) => setName(e.target.value)} id='name' type='text' placeholder='Product name' className='w-full ' />
                    </Label>
                    <Label className='grid gap-5' htmlFor='Price'>
                        Price
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} id='Price' type='text' placeholder='Price' className='w-full ' />
                    </Label>

                    <Label className='grid gap-5'>
                        Category
                        <Select defaultValue={category} onValueChange={(e) => { setCategory(e) }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((e: ICategory, i: number) => {
                                    return (

                                        <SelectItem key={i} value={e.name}>{e.name}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </Label>
                    <Label className='grid gap-5' htmlFor='tags'>
                        tags
                        <div className='flex gap-x-8 gap-y-4 flex-wrap'>
                            {tags.map((e, i) => {
                                return <div key={i} className='bg-black px-5 relative py-2 dark:bg-white dark:text-black shadow-zinc-400 dark:shadow-gray-700 shadow-xl rounded-md text-white'>
                                    {e}
                                    <button onClick={() => handleTags(e)} className='absolute text-xl -top-3 -right-3 text-black'><GiCancel /></button>
                                </div>
                            })}
                        </div>
                        <div className='flex gap-4 items-center'>
                            <Input value={tag} onChange={(e) => setTag(e.target.value)} id='tag' type='text' placeholder='tag' className='w-full p-5' />
                            <Button onClick={addTag}>add</Button>
                        </div>
                    </Label>
                </div>

                <Button onClick={handleSubmit} className='lg:w-fit'>Edit Product</Button>
            </form>
            {isRequestLoading && <div className='mt-10 w-fit text-xl'><ProcessingButton /></div>}
            <div className={`bg-error py-2 absolute top-1/4 -translate-y-3/4 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl  mt-10 font-bold   duration-500 ${error ? 'visible right-20' : ' invisible -right-full'} `}>{error}</div>
            <div className={`bg-success py-2 absolute top-1/4 -translate-y-3/4 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl  mt-10 font-bold   duration-500 ${message ? 'visible right-20' : ' invisible -right-full'} `}>{message}</div>
        </div>
    )
}
export default EditProduct
"use client"
import { Input } from '@/components/ui/Input'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { GiCancel } from 'react-icons/gi'
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
import { useQuery } from '@tanstack/react-query'
import { ICategory } from '@/models/Category'
import { getCategories } from '@/lib/axiosInit'

const AddProduct = () => {
    const { data: categories, isSuccess } = useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60
    })
    const [tags, setTags] = useState<string[]>([])
    const [tag, setTag] = useState<string>('')
    const [images, setImages] = useState<string[]>([])
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [category, setCategory] = useState<string>('')

    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const addTag = (e: React.FormEvent) => {
        e.preventDefault()
        setTags([...tags, tag])
        setTag('')
    }
    const removeTag = (e: React.FormEvent, t: string) => {
        e.preventDefault()
        let newTags = tags.filter(ele => ele !== t)
        setTags(newTags)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        setError('')
        setMessage('')
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post('/api/products', { name, category, price, images, tags }, {
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
            setIsLoading(false)
        }
    }
    return (
        <MainElement className=' overflow-hidden relative' >
            <MainTitle title='Create new product' />
            <form onSubmit={handleSubmit} className='border-y py-10 grid gap-10 '>
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
                        <Select value={category} onValueChange={(e) => { setCategory(e) }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    isSuccess &&
                                    categories.map((c, i) => {
                                        return (
                                            <SelectItem key={i} value={c.name}>{c.name}</SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </Label>
                    <Label className='grid gap-5' htmlFor='tag'>
                        tags
                        <div className='flex gap-4 items-center'>
                            <Input value={tag} onChange={(e) => setTag(e.target.value)} id='tag' type='text' placeholder='tag' className='w-full p-5' />
                            <Button onClick={addTag}>add</Button>
                        </div>
                    </Label>


                </div>
                <div className='flex gap-5'>
                    {tags.length > 0 && tags?.map((t, i) => (
                        <div className=' relative border rounded-2xl px-5 py-2 font-bold' key={i}>
                            {t}
                            <button onClick={(e) => removeTag(e, t)} className=' absolute -right-1 -top-1 text-lg'>
                                <GiCancel />
                            </button>
                        </div>
                    ))}
                </div>

                <Button onClick={handleSubmit} className='lg:w-fit'>Add Product</Button>
            </form>
            {isLoading && <div className='mt-10 w-fit text-xl'><ProcessingButton /></div>}
            <div className={`bg-error py-2 absolute top-1/4 -translate-y-3/4 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl  mt-10 font-bold   duration-500 ${error ? 'visible right-24' : ' invisible -right-full'} `}>{error}</div>
            <div className={`bg-success py-2 absolute top-1/4 -translate-y-3/4 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl  mt-10 font-bold   duration-500 ${message ? 'visible right-24' : ' invisible -right-full'} `}>{message}</div>
        </MainElement>
    )
}

export default AddProduct
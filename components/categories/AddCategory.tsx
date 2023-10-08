"use client"
import { Input } from '@/components/ui/Input'
import ProcessingButton from '@/components/ui/ProcessingButton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
type Props = {}

const AddCategory = (props: Props) => {
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        setError('')
        setMessage('')
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post('/api/categories', { name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }) as AxiosResponse
            setMessage('Category Successfully Added')
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
        <>
            <form onSubmit={handleSubmit} className='grid border-y py-10 gap-10'>
                <Label className='grid gap-5' htmlFor='category'>
                    Name
                    <Input id='category' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Category name' className='w-full lg:w-fit' />
                </Label>
                <Button onClick={handleSubmit} className='w-fit'>Add category</Button>
            </form>
            {isLoading && <div className='mt-10 w-fit text-xl'><ProcessingButton /></div>}
            <div className={`bg-error py-2 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl mt-10 font-bold  ${error ? 'block' : ' hidden'} `}>{error}</div>
            <div className={`bg-success py-2 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl mt-10 font-bold  ${message ? 'block' : ' hidden'} `}>{message}</div>
        </>
    )
}

export default AddCategory
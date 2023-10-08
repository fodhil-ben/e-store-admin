"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import ProcessingButton from '@/components/ui/ProcessingButton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import axios, { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import useCategories from '@/hooks/useCategories'
type Props = {}

const EditCategory = (props: Props) => {
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const router = useSearchParams()
    const routerToredirect = useRouter()

    const { dispatch } = useCategories()
    const handleSubmit = async (e: React.FormEvent) => {
        setError('')
        setMessage('')
        e.preventDefault()
        setIsLoading(true)
        try {
            const _id = String(router.get('_id'))
            await axios.put('/api/categories', { _id, name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }) as AxiosResponse
            setMessage('Category Successfully Edited')
            dispatch({ type: "EDIT_CATEGORIES", paylaod: { _id, name } })
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.request.status === 401) routerToredirect.push('/unauthorized')
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
                    Old name
                    <Input id='category' value={String(router.get('name'))} readOnly type='text' className='w-full lg:w-fit' />
                </Label>
                <Label className='grid gap-5' htmlFor='category'>
                    New name
                    <Input id='category' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='new category name' className='w-full lg:w-fit' />
                </Label>
                <Button onClick={handleSubmit} className='w-fit'>Edit category</Button>
            </form>
            {isLoading && <div className='mt-10 w-fit text-xl'><ProcessingButton /></div>}
            <div className={`bg-error py-2 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl mt-10 font-bold  ${error ? 'block' : ' hidden'} `}>{error}</div>
            <div className={`bg-success py-2 px-5 md:py-5 md:px-10  rounded-2xl w-fit md:text-2xl mt-10 font-bold  ${message ? 'block' : ' hidden'} `}>{message}</div>
        </>
    )
}

export default EditCategory
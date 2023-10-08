"use client"
import React from 'react'
import { IUser } from '@/models/User'
import { useQuery } from '@tanstack/react-query'
import { auth, getUsers } from '@/lib/axiosInit'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import MainTitle from '../ui/MainTitle'
import { Button } from '../ui/button'
import Spinner from '../ui/Spinner'
import { IoAddOutline } from 'react-icons/io5'
import { IoMdRemoveCircleOutline } from 'react-icons/io'

const UsersTable = () => {
    const { data, isSuccess, isRefetching, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        staleTime: 1000 * 60
    })
    const router = useRouter()
    const addAdmin = async (e: IUser) => {
        try {
            auth.post('/api/users', { _id: e._id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            refetch()
            refetch()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.request.status === 401) router.push('/unauthorized')
            }
            router.push('/error')
        }
    }

    const removeAdmin = async (e: IUser) => {
        try {
            auth.delete('/api/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { _id: e._id }
            })
            refetch()
            refetch()

        } catch (error) {

            if (axios.isAxiosError(error)) {
                if (error.request.status === 401) router.push('/unauthorized')
            }
            router.push('/error')
        }
    }
    return (
        (isSuccess && (
            <div className='flex gap-10 h-4/5 px-5 border'>
                <div className='h-full w-1/2'>
                    <MainTitle title='Admins' />
                    <div className='overflow-y-scroll h-2/3 w-full  rounded-xl border'>

                        <>{data["owners"].map((e: IUser) => {
                            return <div key={e._id} className='text-xl flex justify-between items-center hover:bg-gray-200 p-4 w-full border-b'>
                                {e.username}
                                <div className=''>owner</div>
                            </div>
                        })}

                            {data["admins"].map((e: IUser, i: number) => {
                                return <div key={i} className='text-xl flex justify-between items-center hover:bg-gray-200 p-4 w-full border-b'>
                                    {e.username}
                                    {!isRefetching
                                        ? <Button disabled={isRefetching} className='text-2xl' onClick={() => removeAdmin(e)}><IoMdRemoveCircleOutline></IoMdRemoveCircleOutline></Button>
                                        : <Spinner />
                                    }
                                </div>
                            })}
                        </>


                    </div>
                </div>
                <div className='h-full w-1/2'>
                    <MainTitle title='Users' />
                    <div className='overflow-y-scroll h-2/3 w-full rounded-xl border'>
                        {
                            data["users"].map((e: IUser, i: number) => {
                                return <div key={i} className='text-xl flex justify-between items-center hover:bg-gray-200 p-4 w-full border-b '>
                                    {e.username}
                                    {!isRefetching
                                        ? <Button className='text-2xl' onClick={() => addAdmin(e)}><IoAddOutline></IoAddOutline></Button>
                                        : <Spinner />
                                    }

                                </div>
                            })

                        }


                    </div>
                </div>
            </div>)))
}

export default UsersTable
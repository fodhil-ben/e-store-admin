"use client"
import { IUser } from '@/models/User'
import MainTitle from '../ui/MainTitle'
import { IoAddOutline } from 'react-icons/io5'
import { auth } from '@/lib/axiosInit'
import { Button } from '../ui/button'
import { useState } from 'react'
import ProcessingButton from '../ui/ProcessingButton'
import { getUsers } from '@/helpers/helpers'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

type Props = {
    users: IUser[]
    owners: IUser[]
}

const Users = ({ users, owners }: Props) => {
    const { refetch, isRefetching } = useQuery({
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
    return (
        <div className='h-full w-1/2'>
            <MainTitle title='Users' />
            <div className='overflow-y-scroll h-2/3 w-full rounded-xl border'>
                {
                    users.map((e, i) => {
                        return <div key={i} className='text-xl flex justify-between items-center hover:bg-gray-200 p-4 w-full border-b '>
                            {e.username}
                            {!isRefetching
                                ? <Button className='text-2xl' onClick={() => addAdmin(e)}><IoAddOutline></IoAddOutline></Button>
                                : <ProcessingButton />
                            }
                        </div>
                    })

                }


            </div>
        </div>
    )
}

export default Users
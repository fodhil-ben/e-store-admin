"use client"
import { IUser } from '@/models/User'
import MainTitle from '../ui/MainTitle'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { auth } from '@/lib/axiosInit'
import { Button } from '../ui/button'
import { useState } from 'react'
import ProcessingButton from '../ui/ProcessingButton'
import { getUsers } from '@/helpers/helpers'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

type Props = {
    admins: IUser[]
    owners: IUser[]
}

const Admins = ({ admins, owners }: Props) => {
    const [error, setError] = useState(false)
    const router = useRouter()

    const { refetch, isRefetching } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        staleTime: 1000 * 60
    })

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
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (error.request.status === 401) router.push('/unauthorized')
            }
            router.push('/internal_error')
        }
    }
    return (
        <div className='h-full w-1/2'>
            <MainTitle title='Admins' />
            <div className='overflow-y-scroll h-2/3 w-full  rounded-xl border'>
                <>{owners.map(e => {
                    return <div key={e._id} className='text-xl flex justify-between items-center hover:bg-gray-200 p-4 w-full border-b'>
                        {e.username}
                        <div className=''>owner</div>
                    </div>
                })}
                    {admins.map((e, i) => {
                        return <div key={i} className='text-xl flex justify-between items-center hover:bg-gray-200 p-4 w-full border-b'>
                            {e.username}
                            {!isRefetching
                                ? <Button disabled={isRefetching} className='text-2xl' onClick={() => removeAdmin(e)}><IoMdRemoveCircleOutline></IoMdRemoveCircleOutline></Button>
                                : <ProcessingButton />
                            }
                        </div>
                    })}
                </>


            </div>
        </div>
    )
}

export default Admins
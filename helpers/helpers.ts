import { auth } from '@/lib/axiosInit'
import { IUser } from '@/models/User'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const loginUser = async ({ username, password }: { username: string, password: string }) => {
    const result = signIn("credentials", {
        redirect: false,
        username,
        password
    })
    return result
}


//handle errors

export async function getUsers() {
    let users: IUser[] = []
    let admins: IUser[] = []
    let owners: IUser[] = []
    try {
        const response = await auth.get('/api/users', {
            withCredentials: true
        })
        response.data.users.map((e: IUser) => {
            if (e.admin && !e.owner) admins.push(e)
            else if (e.owner) owners.push(e)
            else users.push(e)
        })
        return { admins, users, owners }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.response?.status === 401) {
                return redirect('/unauthorized')
            }
        }

        return redirect('/unauthorized')

    }

}




import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

type Props = {
    children: ReactNode
}

const layout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions)
    if (session) redirect('/dashboard')
    return (
        <>{children}</>
    )
}

export default layout
// "use client"
import UsersTable from '@/components/settings/UsersTable'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'
import { getUsers } from '@/helpers/helpers'

import React from 'react'

type Props = {}

const page = async (props: Props) => {

    return (
        <MainElement>
            <MainTitle title='Settings' />
            <UsersTable />
        </MainElement>
    )
}

export default page
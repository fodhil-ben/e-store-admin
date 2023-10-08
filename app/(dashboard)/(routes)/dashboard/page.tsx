import DashboardCart from '@/components/dashboard/DashboardCart'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'
import React from 'react'

type DashbordProps = {}

const Dashbord = (props: DashbordProps) => {
    return (
        <MainElement>
            <MainTitle title='Dashboard' />
            <DashboardCart />
            <div>
            </div>
        </MainElement>)
}

export default Dashbord
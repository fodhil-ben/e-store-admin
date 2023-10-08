import React from 'react'


import MainElement from '@/components/ui/MainElement'
import ProductsTable from '@/components/products/ProductsTable'

type Props = {}

const page = (props: Props) => {



    return (
        <MainElement >
            <ProductsTable />
        </MainElement>
    )
}

export default page
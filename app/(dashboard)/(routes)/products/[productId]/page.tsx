
import ProductElement from '@/components/products/ProductElement'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'

import React from 'react'

type Props = {}

const page = ({ params }: { params: { productId: string } }) => {

    return (
        <MainElement>
            <MainTitle title='Product Details:' />
            <ProductElement productId={params.productId} />
        </MainElement>
    )
}

export default page
import EditProductWrapper from '@/components/products/EditProductWrapper'
import React from 'react'

type Props = {
    productId: string
}
const page = ({ params }: { params: Props }) => {

    return (
        <div className='p-8 lg:px-20 lg:py-15 w-full lg:w-fit lg:flex-grow mt-16 lg:mt-0'>
            <EditProductWrapper params={params} />
        </div>
    )
}

export default page
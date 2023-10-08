"use client"
import EditProduct from '@/components/products/EditProduct'
import { getCategories, getProduct } from '@/lib/axiosInit'
import { ICategory } from '@/models/Category'
import { IProduct } from '@/models/Product'
import { useQuery } from '@tanstack/react-query'
type Props = {
    productId: string
}
const EditProductWrapper = ({ params }: { params: Props }) => {

    const { data: product, isLoading, isSuccess } = useQuery<IProduct>({
        queryKey: ["products", params.productId],
        queryFn: () => getProduct(String(params.productId)),
        staleTime: 1000 * 60 * 60
    })
    const { data: categories, isSuccess: isSuccessC } = useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 20
    })
    return (
        <>
            {isSuccess && isSuccessC &&
                <EditProduct
                    categories={categories}
                    product={product}
                />
            }
        </>
    )
}

export default EditProductWrapper
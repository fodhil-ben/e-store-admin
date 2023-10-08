import EditCategory from '@/components/categories/EditCategory'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'

type Props = {}

function page(props: Props) {

    return (
        <MainElement>
            <MainTitle title='Edit Category name:' />
            <EditCategory />
        </MainElement>
    )
}

export default page
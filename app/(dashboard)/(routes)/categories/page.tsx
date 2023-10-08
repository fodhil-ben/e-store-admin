import CategoriesTable from '@/components/categories/CategoriesTable'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'


type Props = {}

const page = (props: Props) => {

    return (
        <MainElement >
            <CategoriesTable />
        </MainElement>
    )
}

export default page
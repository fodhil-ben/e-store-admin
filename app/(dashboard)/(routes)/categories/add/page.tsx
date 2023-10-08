import AddCategory from "@/components/categories/AddCategory"
import MainElement from "@/components/ui/MainElement"
import MainTitle from "@/components/ui/MainTitle"


type Props = {}

function page(props: Props) {

    return (
        <MainElement>
            <MainTitle title='Create new category' />
            <AddCategory />
        </MainElement>
    )
}

export default page
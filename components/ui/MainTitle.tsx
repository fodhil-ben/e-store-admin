import React from 'react'

type Props = {
    title: string
}

const MainTitle = ({ title }: Props) => {
    return (
        <h1 className='text-3xl pl-1 h-fit w-fit font-semibold mt-8 my-10'>{title}</h1>
    )
}

export default MainTitle
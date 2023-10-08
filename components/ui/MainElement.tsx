import React, { ReactNode } from 'react'


export interface MainElementProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

function MainElement({ children, className }: MainElementProps) {
    return (
        <div className={`${className} p-8 lg:p-20 w-full lg:w-fit lg:flex-grow mt-16 lg:mt-0`}>{children}</div>
    )
}

export default MainElement
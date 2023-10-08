"use client"

import Link from 'next/link'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type Props = {
    link: string
    elementName: string
    icon: ReactNode
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBarElement = ({ link, elementName, setShowSideBar, icon }: Props) => {
    const activeLink = 'bg-gray-800 text-white'
    const inactiveLink = ''
    const pathname = usePathname()
    return (
        <Link onClick={() => setShowSideBar(false)} href={link} className={`${pathname.includes(link) ? activeLink : inactiveLink} hover:bg-gray-800 hover:text-white rounded-2xl text-xl gap-3 flex items-center p-3`}>
            <div className='text-4xl'>{icon}</div>
            {elementName}
        </Link>
    )
}

export default SideBarElement
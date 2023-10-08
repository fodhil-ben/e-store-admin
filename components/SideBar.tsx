"use client"
import React, { useState } from 'react'
import { ModeToggle } from './ui/ToggleDarkMode'
import SideBarElement from './ui/SideBarElement'
import { AiOutlineAppstore, AiOutlineStock } from 'react-icons/ai'
import { IoMenuOutline } from 'react-icons/io5'
import { BiStore, BiMenuAltLeft } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { usePathname, useRouter } from 'next/navigation'
import { ImExit } from 'react-icons/im'
import { signOut } from 'next-auth/react'

type SideBarProps = {}

const SideBar = (props: SideBarProps) => {
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()
    const logout = async () => {
        await signOut()
        router.push('/')
    }

    return (
        <>
            {pathname !== '/login' && pathname !== '/sign' && pathname !== '/unauthorized' &&
                <>
                    <div className='text-3xl z-50 lg:hidden absolute top-6 right-6 flex gap-4 justify-center items-center'>
                        <button onClick={() => setShowSideBar(!showSideBar)} className=' hover:bg-white hover:text-black dark:bg-slate-950 dark:text-white  dark:shadow-gray-800 shadow-sm  border p-1 rounded-md  w-fit h-fit'><IoMenuOutline></IoMenuOutline></button>
                        <ModeToggle />
                    </div>
                    <aside className={`${showSideBar ? 'absolute top-0 left-0 w-screen' : 'hidden'} lg:relative z-40 lg:block lg:w-1/5 p-6 bg-gray-200 dark:bg-gray-900 h-screen`}>
                        <div className='hidden lg:block absolute right-4 top-4'><ModeToggle /></div>
                        <nav className='grid mt-10 gap-4'>
                            <SideBarElement setShowSideBar={setShowSideBar} link='/dashboard' elementName='Dashbord' icon={<AiOutlineAppstore />} />
                            <SideBarElement setShowSideBar={setShowSideBar} link='/products' elementName='Products' icon={<BiStore></BiStore>} />
                            <SideBarElement setShowSideBar={setShowSideBar} link='/categories' elementName='Categories' icon={<BiMenuAltLeft></BiMenuAltLeft>} />
                            <SideBarElement setShowSideBar={setShowSideBar} link='/orders' elementName='Orders' icon={<AiOutlineStock></AiOutlineStock>} />
                            <SideBarElement setShowSideBar={setShowSideBar} link='/settings' elementName='Settings' icon={<FiSettings></FiSettings>} />
                            <div onClick={logout} className='hover:bg-gray-800 cursor-pointer hover:text-white rounded-2xl text-xl gap-3 flex items-center p-3 '>
                                <div className='text-4xl'><ImExit></ImExit></div>
                                Logout
                            </div>
                        </nav>
                    </aside>
                </>
            }
        </>
    )
}

export default SideBar
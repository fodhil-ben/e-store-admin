import { cn } from '@/lib/utils'
import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export interface SpinnerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

function Spinner({ className, type, ...props }: SpinnerProps) {
    return (
        <button
            type="button"
            id='processingBtn'
            disabled
            className={cn('rounded-xl',
                className)}
            {...props} >
            <div><FaSpinner className="animate-spin h-5 w-5"></FaSpinner></div>
        </button>
    )
}



export default Spinner 
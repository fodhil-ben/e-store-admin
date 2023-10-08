import { cn } from '@/lib/utils'
import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export interface ProcessingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

function ProcessingButton(
    { className, type, ...props }: ProcessingButtonProps) {
    return (
        <button
            type="button"
            id='processingBtn'
            disabled
            className={cn('rounded-xl flex justify-center p-2 w-fit gap-5 items-center m-auto',
                className)}
            {...props} >
            <div><FaSpinner className="animate-spin h-5 w-5"></FaSpinner></div>
            Processing...
        </button>
    )
}




export default ProcessingButton 
"use client"

import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/Input"
import { Label } from "./ui/label"
import ProcessingButton from "./ui/ProcessingButton"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/axiosInit"
import axios, { AxiosResponse } from "axios"
import Link from "next/link"

interface SignUpProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonText: string
}

export function SignUpForm({ className, buttonText, ...props }: SignUpProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setError('')
        setMessage('')
        setIsLoading(true)
        //validate data more

        if (!username.trim() || !password.trim()) {
            setError('Paramter Missing !')
            setIsLoading(false)
            return
        }
        else {
            try {
                const response = await auth.post('/api/auth/signup', { username, password }) as AxiosResponse
                setMessage(`${response.data} Go to Login`)
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    setError(error.request.response)
                }
                else {
                    setError('Error happened try again')
                }
            } finally {
                setIsLoading(false)
            }

        }

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-6">
                    <div className="">
                        <Label className="pl-1" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="Your username..."
                            type="text"
                            autoCapitalize="none"
                            disabled={isLoading}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <Label className="pl-1" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="*******"
                            type="password"
                            disabled={isLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isLoading
                        ? <ProcessingButton className="bg-gray-800 w-full rounded-md text-white dark:text-gray-900 dark:bg-gray-100" />
                        : <Button disabled={isLoading}>
                            {buttonText}
                        </Button>
                    }
                </div>
            </form>
            <div className="grid gap-3">
                <div> Already have an account?</div>
                <Button className="p-0"> <Link className="rounded-md flex items-center justify-center font-bold w-full h-full" href={'/login'}>Go to Login</Link></Button>
            </div>
            <div className={`bg-error py-2 px-5 md:py-5 md:px-10 absolute rounded-2xl w-fit md:text-2xl left-1/2 font-bold -translate-x-1/2 ${error ? 'bottom-1/4' : '-top-full invisible'} duration-700`}>{error}</div>
            <div className={`bg-success py-2 px-5 md:py-5 md:px-10 absolute rounded-2xl w-fit md:text-2xl left-1/2 font-bold -translate-x-1/2 ${message ? 'bottom-1/4' : '-top-full invisible'} duration-700`}>{message}</div>
        </div>
    )
}
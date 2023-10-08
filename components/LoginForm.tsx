"use client"
import { useState } from "react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/Input"
import { Label } from "./ui/label"
import ProcessingButton from "./ui/ProcessingButton"
import { loginUser } from "@/helpers/helpers"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonText: string
}

export function LoginForm({ className, buttonText, ...props }: LoginFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const router = useRouter()

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            setIsLoading(true)
            const loginRes = await loginUser({ username, password })

            if (loginRes && loginRes.error) {
                setError(loginRes.error)
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            setError('Error happend try again')
        } finally {
            setIsLoading(false)
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
                <div> Dont have an account?</div>
                <Button className="p-0"> <Link className="rounded-md flex items-center justify-center font-bold w-full h-full" href={'/sign'}>Go to register</Link></Button>
            </div>
            <div className={`bg-error py-2 px-5 md:py-5 md:px-10 absolute rounded-2xl w-fit md:text-2xl left-1/2 font-bold -translate-x-1/2 ${error ? 'bottom-1/4' : '-top-full invisible'} duration-700`}>{error}</div>

        </div>
    )
}
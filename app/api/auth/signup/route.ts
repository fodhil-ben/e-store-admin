import { dbConnection } from "@/lib/db"
import User, { IUser } from "@/models/User"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"



export async function POST(req: Request) {
    const body = await req.json()
    const { username, password } = body
    if (!username || !password) return new NextResponse('Parameter Missing !!', { status: 400 })

    try {
        await dbConnection()
        const users = await User.find({})
        if (users.length > 0) {
            const userExists = await User.findOne({ username: username })
            if (userExists) return new NextResponse('User already Exists', { status: 409 })
            const hashedPwd = await hash(password, 10)
            await User.create({
                username,
                password: hashedPwd,
                admin: false,
                owner: false
            })
            return new NextResponse('you successfully registred')
        } else {
            const hashedPwd = await hash(password, 10)
            await User.create({
                username,
                password: hashedPwd,
                admin: true,
                owner: true
            })
            return new NextResponse('you successfully registred')
        }
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
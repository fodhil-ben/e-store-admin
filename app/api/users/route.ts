import { dbConnection } from "@/lib/db"
import User, { IUser } from "@/models/User"
import { NextResponse } from "next/server"
import { IsAdminRequest, authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


export async function GET(req: Request) {
    try {

        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        let users: IUser[] = []
        let admins: IUser[] = []
        let owners: IUser[] = []
        const all_users: IUser[] = await User.find({})
        all_users.map((e: IUser) => {
            if (e.admin && !e.owner) admins.push(e)
            else if (e.owner) owners.push(e)
            else users.push(e)
        })
        return new NextResponse(JSON.stringify({ users, admins, owners }))
    } catch (error) {
        console.log('error')
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

//specifu that only the admins can do this and the owner cant be deleted

export async function POST(req: Request) {
    const isValid = await IsAdminRequest(req)
    if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
    const body = await req.json()
    const { _id } = body
    if (!_id) return new NextResponse('Parameter Missing !!', { status: 400 })
    try {
        const user: IUser | null = await User.findOne({ _id })
        if (!user) return new NextResponse('User Does not exists!!', { status: 404 })
        await User.findOneAndUpdate({ _id }, { admin: true })
        return new NextResponse('Admin is added')
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
export async function DELETE(req: Request) {
    const isValid = await IsAdminRequest(req)
    if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
    const body = await req.json()
    const { _id } = body
    if (!_id) return new NextResponse('Parameter Missing !!', { status: 400 })
    try {
        const user: IUser | null = await User.findOne({ _id })
        if (!user) return new NextResponse('User Does not exists!!', { status: 404 })
        await User.findOneAndUpdate({ _id }, { admin: false })
        return new NextResponse('Admin is deleted')
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
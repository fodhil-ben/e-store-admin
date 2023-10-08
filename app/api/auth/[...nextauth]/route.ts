import NextAuth, { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnection } from "@/lib/db"
import { compare } from 'bcryptjs'
import User, { IUser } from '@/models/User'
import { NextResponse } from "next/server"

interface IUserSession {
    user: {
        _id?: string,
        username?: string,
        password?: string,
        admin?: boolean,
        owner?: boolean,
        __v?: number
    }
    expires?: string
}




export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' },
                admin: { label: 'admin', type: 'boolean' },
                owner: { label: 'owner', type: 'boolean' }
            },
            async authorize(credentials, req) {
                await dbConnection()

                if (!credentials || !credentials.username || !credentials.password) {
                    throw new Error("Missing Parameters !")
                }

                const user = await User.findOne({
                    username: credentials.username
                }).select("+password")

                if (!user) {
                    throw new Error("Invalid credentials")
                }

                const isPasswordCorrect = await compare(credentials.password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials")
                }
                if (!user.admin) {
                    throw new Error("Invalid credentials")
                }
                return user

            }
        })
    ],
    pages: { signIn: '/login' }
    ,
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user as any
            session.user = user
            return session
        }
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export async function IsAdminRequest(req: Request) {
    await dbConnection()
    const session = await getServerSession(authOptions) as IUserSession
    if (!session) return false
    const admins = await User.find({ admin: true }).select('+password')
    const isAdmin = admins.find(admin => {
        return (String(admin._id) === session.user._id && admin.password === session.user.password && admin.username === session.user.username)
    })
    if (!isAdmin) {
        return false
    }
    else {
        return true
    }
}


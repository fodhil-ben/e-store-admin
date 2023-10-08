import { dbConnection } from "@/lib/db";
import Category, { ICategory } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";
import { IsAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    try {
        dbConnection()
        const url = new URL(req.url)
        const queryParams = url.searchParams.get('id')
        if (queryParams) {
            const category: ICategory | null = await Category.findById(queryParams)
            if (!category) return new NextResponse('Category does not exists', { status: 404 })
            return new NextResponse(JSON.stringify(Category))
        }
        else {
            const categories: ICategory[] = await Category.find({})
            if (!categories || categories.length === 0) return new NextResponse('There is no categories to show', { status: 404 })
            return new NextResponse(JSON.stringify({ categories }))
        }

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        const { name } = await req.json()
        if (!name) return new NextResponse('Parameter Missing', { status: 400 })
        const exists = await Category.find({ name })
        if (exists.length !== 0) {
            return new NextResponse('Category Already exists', { status: 409 })
        }
        const category = await Category.create({
            name
        })
        return new NextResponse(category)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        const { _id, name } = await req.json()
        if (!_id || !name) return new NextResponse('Parameter Missing', { status: 400 })
        const category = await Category.findOneAndUpdate({ _id }, { name })
        if (!category) return new NextResponse('Category Does Not Exists', { status: 404 })
        return new NextResponse('Category Edited')
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        const { _id } = await req.json()
        if (!_id) return new NextResponse('Parameter Missing', { status: 400 })
        const category = await Category.findOneAndDelete({ _id })
        if (!Category) return new NextResponse('Category Does Not Exists', { status: 404 })
        return new NextResponse('Category deleted')
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
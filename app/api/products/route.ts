import { dbConnection } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IsAdminRequest, authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    try {
        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        const url = new URL(req.url)
        const queryParams = url.searchParams.get('id')
        if (queryParams) {
            // check if valid id
            const product: IProduct | null = await Product.findById(queryParams)
            if (!product) return new NextResponse('Product does not exists', { status: 404 })
            return new NextResponse(JSON.stringify(product))
        }
        else {
            const products: IProduct[] = await Product.find({})
            if (!products || products.length === 0) return new NextResponse('There is no products to show', { status: 404 })
            return new NextResponse(JSON.stringify({ products }))
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
        const { name, category, price, images, tags } = await req.json()

        if (!name || !category || !price || !images || !tags) {
            console.log(tags)
            console.log(images)
            console.log(price)
            console.log(category)
            console.log(name)
            return new NextResponse('Parameter Missing', { status: 400 })
        }
        const product = await Product.create({
            name, category, price, images, tags
        })
        return new NextResponse(product)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        const { _id, name, category, price, images, tags } = await req.json()
        if (!_id || !name || !category || !price || !images || !tags) return new NextResponse('Parameter Missing', { status: 400 })
        const product = await Product.findOneAndUpdate({ _id }, { name, category, price, images, tags })
        if (!product) return new NextResponse('Product Does Not Exists', { status: 404 })
        return new NextResponse('Product Edited')
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
        const product = await Product.findOneAndDelete({ _id })
        if (!product) return new NextResponse('Product Does Not Exists', { status: 404 })
        return new NextResponse('Product deleted')
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
import Order, { IOrder } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { IsAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    try {
        const isValid = await IsAdminRequest(req)
        if (!isValid) return new NextResponse('Unauthorized', { status: 401 })
        const url = new URL(req.url)
        const queryParams = url.searchParams.get('id')
        if (queryParams) {
            const order: IOrder | null = await Order.findById(queryParams)
            if (!order) return new NextResponse('Order does not exists', { status: 404 })
            return new NextResponse(JSON.stringify(order))
        }
        else {
            const orders: IOrder[] = await Order.find({})
            if (!orders || orders.length === 0) return new NextResponse('There is no orders to show', { status: 404 })
            return new NextResponse(JSON.stringify({ orders }))
        }

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
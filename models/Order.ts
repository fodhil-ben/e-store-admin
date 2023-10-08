import mongoose, { Schema, model, models } from "mongoose";
//
export interface IOrder {
    _id?: string
    name: string
    items: object
    phone: string
    address: string
    paid: boolean
}

const OrderSchema = new Schema<IOrder>({
    name: { type: String, required: true },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paid: { type: Boolean, required: true }
},
    {
        timestamps: true
    })

export default models.Order || model('Order', OrderSchema)
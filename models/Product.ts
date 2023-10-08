import { Schema, model, models } from "mongoose";
export interface IProduct {
    _id?: string
    name: string
    category: string
    price: string
    images: string[]
    tags: string[]

}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: String, required: true }],
    tags: [{ type: String, required: true }],
},
    {
        timestamps: true
    })

export default models.Product || model('Product', ProductSchema)


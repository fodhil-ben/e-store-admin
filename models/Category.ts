import mongoose, { Schema, model, models } from "mongoose";
//
export interface ICategory {
    _id?: string
    name: string
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
})

export default models.Category || model('Category', CategorySchema)
import mongoose from "mongoose";
import { CategorySchema } from "./category.schema";

const TransacitionSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    type: String,
    date: Date,
    category: CategorySchema,
    },
    { versionKey: false }
)

export const TransacitionModel = mongoose.model('Transaction', TransacitionSchema)

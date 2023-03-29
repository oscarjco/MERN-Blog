import { Schema, model } from "mongoose";

const schemaName = "Article";
const collectionName = "articles";

const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String
    }
})

export default model(schemaName, ArticleSchema, collectionName);
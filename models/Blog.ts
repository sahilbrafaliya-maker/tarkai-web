import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    id: number;
    slug: string;
    title: string;
    description: string;
    date: string;
    tag: string;
    coverImage: string;
    paragraph: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    images: string[];
}

const BlogSchema: Schema = new Schema({
    id: { type: Number, unique: true },
    slug: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: String, default: '' },
    tag: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    paragraph: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    images: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    id: number;
    slug: string;
    title: string;
    description: string;
    date: string;
    tag: string;
    coverImage: string;
    coverImageAlt?: string;
    paragraph: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    images: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
}

const BlogSchema: Schema = new Schema({
    id: { type: Number, unique: true },
    slug: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: String, default: '' },
    tag: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    coverImageAlt: { type: String, default: '' },
    paragraph: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    images: { type: [String], default: [] },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: [String], default: [] },
    canonicalUrl: { type: String, default: '' },
    noIndex: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

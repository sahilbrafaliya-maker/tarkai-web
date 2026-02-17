import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    description: string;
    color: string;
}

const BlogSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true }, // Keeping numerical ID for compatibility
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    color: { type: String, required: false },
}, {
    timestamps: true,
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

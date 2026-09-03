import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  id: number;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
  reviewText: string;
  isVerified: boolean;
  date?: string;
  createdAt?: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    author: { type: String, required: true },
    role: { type: String, default: 'Student / Parent' },
    avatar: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    reviewText: { type: String, required: true },
    isVerified: { type: Boolean, default: true },
    date: { type: String, default: '' },
  },
  { timestamps: true }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;

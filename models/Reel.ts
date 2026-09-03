import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReel extends Document {
  id: number;
  title: string;
  category: string;
  videoUrl?: string;
  coverImage: string;
  views?: string;
  duration?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  createdAt?: Date;
}

const ReelSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Life at TarkAI' },
    videoUrl: { type: String, default: '' },
    coverImage: { type: String, required: true },
    views: { type: String, default: '1.2k views' },
    duration: { type: String, default: '0:45' },
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

const Reel: Model<IReel> =
  mongoose.models.Reel || mongoose.model<IReel>('Reel', ReelSchema);

export default Reel;

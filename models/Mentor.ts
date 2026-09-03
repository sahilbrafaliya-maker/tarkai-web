import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMentor extends Document {
  id: number;
  name: string;
  role: string;
  avatar: string;
  companyLogo?: string;
  educationBadge?: string;
  bio?: string;
  specializations?: string[];
  linkedin?: string;
  twitter?: string;
  order?: number;
  createdAt?: Date;
}

const MentorSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true },
    companyLogo: { type: String, default: '/Logo.png' },
    educationBadge: { type: String, default: 'IIIT Lucknow M.Sc. Graduate' },
    bio: { type: String, default: '' },
    specializations: { type: [String], default: [] },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Mentor: Model<IMentor> =
  mongoose.models.Mentor || mongoose.model<IMentor>('Mentor', MentorSchema);

export default Mentor;

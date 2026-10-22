import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletterSubscriber extends Document {
  email: string;
  source: string;
  promoCode?: string;
  createdAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    source: { 
      type: String, 
      default: 'diwali_popup' 
    },
    promoCode: { 
      type: String, 
      default: 'DIWALI10' 
    },
  },
  { timestamps: true }
);

export default mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);

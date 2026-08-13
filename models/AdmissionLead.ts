import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmissionLead extends Document {
  applicationId: string;
  fullName: string;
  mobile: string;
  email: string;
  currentStatus: string;
  courseInterested: string;
  demoSession: string;
  submissionTime: string;
  ip?: string;
  createdAt: Date;
}

const AdmissionLeadSchema = new Schema<IAdmissionLead>(
  {
    applicationId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    currentStatus: { type: String, required: true },
    courseInterested: { type: String, required: true },
    demoSession: { type: String, required: true },
    submissionTime: { type: String, required: true },
    ip: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.AdmissionLead ||
  mongoose.model<IAdmissionLead>('AdmissionLead', AdmissionLeadSchema);

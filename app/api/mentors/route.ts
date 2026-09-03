import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const mentors = await Mentor.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json({ error: 'Failed to fetch mentors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const last = await Mentor.findOne().sort({ id: -1 });
    const newId = last ? last.id + 1 : 1;

    const created = await Mentor.create({ ...body, id: newId });
    revalidatePath('/');
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating mentor:', error);
    return NextResponse.json({ error: 'Failed to create mentor' }, { status: 500 });
  }
}

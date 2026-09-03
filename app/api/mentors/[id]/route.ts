import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const mentor = await Mentor.findOne({ id: parseInt(id, 10) });
    if (!mentor) return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
    return NextResponse.json(mentor);
  } catch (error) {
    console.error('Error fetching mentor:', error);
    return NextResponse.json({ error: 'Failed to fetch mentor' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await Mentor.findOneAndUpdate({ id: parseInt(id, 10) }, body, { new: true });
    revalidatePath('/');
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating mentor:', error);
    return NextResponse.json({ error: 'Failed to update mentor' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Mentor.findOneAndDelete({ id: parseInt(id, 10) });
    revalidatePath('/');
    return NextResponse.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    return NextResponse.json({ error: 'Failed to delete mentor' }, { status: 500 });
  }
}

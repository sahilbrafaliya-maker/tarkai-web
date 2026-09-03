import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';

export async function GET() {
  try {
    await dbConnect();
    const settingsList = await Setting.find({});
    const settingsMap: Record<string, any> = {
      averageRating: '4.9',
      totalReviews: '226',
    };

    settingsList.forEach((item) => {
      settingsMap[item.key] = item.value;
    });

    return NextResponse.json(settingsMap, { status: 200 });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { averageRating: '4.9', totalReviews: '226' },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (body && typeof body === 'object') {
      const keys = Object.keys(body);
      for (const key of keys) {
        await Setting.findOneAndUpdate(
          { key },
          { key, value: body[key] },
          { upsert: true, new: true }
        );
      }
    }

    return NextResponse.json({ message: 'Settings updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

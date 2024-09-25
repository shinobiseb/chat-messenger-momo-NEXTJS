import { NextRequest, NextResponse } from 'next/server';
import { watchMessages } from '@/lib/mongo/watch';

export async function GET(req: NextRequest) {
  try {
    await watchMessages(); // This starts the watch on MongoDB change streams
    return NextResponse.json({ message: 'Watching messages for changes' });
  } catch (error) {
    console.error('Error setting up message watcher:', error);
    return NextResponse.json({ error: 'Failed to watch messages' }, { status: 500 });
  }
}

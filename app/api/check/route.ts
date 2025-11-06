import { NextResponse } from 'next/server';
import { checkPubMedCounts } from '@/lib/pubmed';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      items: { topicId: string; terms: string[] }[];
    };

    if (!body?.items || !Array.isArray(body.items)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const results = await checkPubMedCounts(body.items);
    return NextResponse.json({ results });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

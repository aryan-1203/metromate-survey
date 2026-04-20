import { NextRequest, NextResponse } from 'next/server';

// Flatten answers into a single row object for Google Sheets.
// Arrays (multi-select) are joined as comma-separated strings.
function flattenAnswers(answers: Record<string, string | string[]>) {
  return {
    submitted_at: new Date().toISOString(),
    city:          answers['q1_city'] ?? '',
    role:          answers['q2_role'] ?? '',
    housing:       answers['q3_housing'] ?? '',
    pain_score:    answers['q4_pain'] ?? '',
    platforms:     Array.isArray(answers['q5_platforms'])
                     ? answers['q5_platforms'].join(', ')
                     : (answers['q5_platforms'] ?? ''),
    frustration:   answers['q6_frustration'] ?? '',
    excitement:    answers['q7_excitement'] ?? '',
    features:      Array.isArray(answers['q8_features'])
                     ? answers['q8_features'].join(', ')
                     : (answers['q8_features'] ?? ''),
    pricing:       answers['q9_pricing'] ?? '',
    trust_signals: Array.isArray(answers['q10_trust'])
                     ? answers['q10_trust'].join(', ')
                     : (answers['q10_trust'] ?? ''),
    waitlist:      answers['q11_waitlist'] ?? '',
    email:         answers['q12_email'] ?? '',
    feedback:      answers['q13_feedback'] ?? '',
  };
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('GOOGLE_SHEETS_WEBHOOK_URL is not set');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let body: { answers: Record<string, string | string[]> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const row = flattenAnswers(body.answers ?? {});

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Google Sheets webhook error:', text);
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to reach Google Sheets webhook:', err);
    return NextResponse.json({ error: 'Network error' }, { status: 502 });
  }
}

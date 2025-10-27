import { NextRequest, NextResponse } from 'next/server';

// Basic spam protection with rate limiting
const submissionTimes = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = submissionTimes.get(ip) || [];
  
  // Remove entries older than 1 hour
  const recentTimes = times.filter(time => now - time < 3600000);
  
  // Allow max 3 submissions per hour
  if (recentTimes.length >= 3) {
    return true;
  }
  
  recentTimes.push(now);
  submissionTimes.set(ip, recentTimes);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Send an email using a service like SendGrid, Resend, or AWS SES
    // 2. Store the message in a database
    // 3. Send a notification to yourself
    
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

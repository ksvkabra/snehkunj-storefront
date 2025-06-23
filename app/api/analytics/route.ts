import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();
    
    // Validate the event structure
    if (!event.event || !event.timestamp) {
      return NextResponse.json(
        { error: 'Invalid event structure' },
        { status: 400 }
      );
    }

    // Log the analytics event
    console.log('Analytics Event:', {
      event: event.event,
      properties: event.properties,
      timestamp: new Date(event.timestamp).toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.ip,
    });

    // Here you would typically:
    // 1. Store the event in a database
    // 2. Send to external analytics services
    // 3. Process for real-time analytics
    // 4. Trigger webhooks for other systems

    // Example: Store in database (you'd implement this based on your database)
    // await storeAnalyticsEvent(event);

    // Example: Send to external service
    // await sendToExternalAnalytics(event);

    // Revalidate relevant pages if needed
    if (event.event === 'purchase') {
      revalidatePath('/');
      revalidatePath('/product/[slug]');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('event');
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    // Here you would typically:
    // 1. Query your analytics database
    // 2. Return aggregated data
    // 3. Apply filters based on parameters

    // Example response structure
    const analyticsData = {
      totalEvents: 0,
      eventsByType: {},
      topProducts: [],
      conversionRate: 0,
      averageOrderValue: 0,
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Analytics GET Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
// Analytics utility for e-commerce tracking
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface ProductViewEvent extends AnalyticsEvent {
  event: 'product_viewed';
  properties: {
    product_id: string;
    product_name: string;
    product_price: number;
    product_currency: string;
    product_category?: string;
  };
}

export interface AddToCartEvent extends AnalyticsEvent {
  event: 'add_to_cart';
  properties: {
    product_id: string;
    product_name: string;
    product_price: number;
    product_currency: string;
    quantity: number;
    variant_id?: string;
  };
}

export interface SearchEvent extends AnalyticsEvent {
  event: 'search';
  properties: {
    query: string;
    results_count: number;
    filters?: Record<string, any>;
  };
}

export interface PurchaseEvent extends AnalyticsEvent {
  event: 'purchase';
  properties: {
    order_id: string;
    total: number;
    currency: string;
    items: Array<{
      product_id: string;
      product_name: string;
      price: number;
      quantity: number;
    }>;
  };
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private isProduction = process.env.NODE_ENV === 'production';

  // Track product view
  trackProductView(event: Omit<ProductViewEvent, 'event' | 'timestamp'>) {
    const analyticsEvent: ProductViewEvent = {
      event: 'product_viewed',
      timestamp: Date.now(),
      ...event,
    };
    
    this.track(analyticsEvent);
  }

  // Track add to cart
  trackAddToCart(event: Omit<AddToCartEvent, 'event' | 'timestamp'>) {
    const analyticsEvent: AddToCartEvent = {
      event: 'add_to_cart',
      timestamp: Date.now(),
      ...event,
    };
    
    this.track(analyticsEvent);
  }

  // Track search
  trackSearch(event: Omit<SearchEvent, 'event' | 'timestamp'>) {
    const analyticsEvent: SearchEvent = {
      event: 'search',
      timestamp: Date.now(),
      ...event,
    };
    
    this.track(analyticsEvent);
  }

  // Track purchase
  trackPurchase(event: Omit<PurchaseEvent, 'event' | 'timestamp'>) {
    const analyticsEvent: PurchaseEvent = {
      event: 'purchase',
      timestamp: Date.now(),
      ...event,
    };
    
    this.track(analyticsEvent);
  }

  // Generic track method
  private track(event: AnalyticsEvent) {
    this.events.push(event);
    
    if (this.isProduction) {
      // Send to analytics service (e.g., Google Analytics, Mixpanel, etc.)
      this.sendToAnalytics(event);
    } else {
      // Log in development
      console.log('Analytics Event:', event);
    }
  }

  // Send to external analytics service
  private async sendToAnalytics(event: AnalyticsEvent) {
    try {
      // Example: Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.event, event.properties);
      }

      // Example: Send to custom analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Get all tracked events (for debugging)
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear events (for testing)
  clearEvents() {
    this.events = [];
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Performance monitoring
export class PerformanceMonitor {
  private metrics: Record<string, number[]> = {};

  // Track page load time
  trackPageLoad(page: string) {
    if (typeof window !== 'undefined') {
      const loadTime = performance.now();
      this.recordMetric(`page_load_${page}`, loadTime);
    }
  }

  // Track API response time
  trackApiCall(endpoint: string, duration: number) {
    this.recordMetric(`api_${endpoint}`, duration);
  }

  // Track image load time
  trackImageLoad(imageUrl: string, duration: number) {
    this.recordMetric(`image_load`, duration);
  }

  // Record a metric
  private recordMetric(name: string, value: number) {
    if (!this.metrics[name]) {
      this.metrics[name] = [];
    }
    this.metrics[name].push(value);

    // Keep only last 100 values
    if (this.metrics[name].length > 100) {
      this.metrics[name] = this.metrics[name].slice(-100);
    }
  }

  // Get average for a metric
  getAverage(name: string): number {
    const values = this.metrics[name];
    if (!values || values.length === 0) return 0;
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  // Get all metrics
  getMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {};
    
    Object.entries(this.metrics).forEach(([name, values]) => {
      result[name] = {
        average: this.getAverage(name),
        count: values.length,
      };
    });

    return result;
  }
}

export const performanceMonitor = new PerformanceMonitor(); 
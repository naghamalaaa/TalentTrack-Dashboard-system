import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  company_size: string;
  phone?: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  status: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  company: string;
  avatar_url?: string;
  quote: string;
  rating: number;
  metrics: Record<string, string>;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  benefits: string[];
  image_url?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface Integration {
  id: string;
  name: string;
  logo_url: string;
  category: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

// API functions
export const demoRequestsApi = {
  create: async (data: Omit<DemoRequest, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    const { data: result, error } = await supabase
      .from('demo_requests')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

export const newsletterApi = {
  subscribe: async (email: string) => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }])
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Email already subscribed');
      }
      throw error;
    }
    return data;
  }
};

export const testimonialsApi = {
  getFeatured: async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

export const pricingApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

export const featuresApi = {
  getFeatured: async () => {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

export const integrationsApi = {
  getFeatured: async () => {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

export const faqsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};
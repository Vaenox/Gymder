import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vhjrobuazheamojcejsd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoanJvYnVhemhlYW1vamNlanNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzgyNDEsImV4cCI6MjA2MjExNDI0MX0.HNdHZ8pC_d1mDEKo0eQuh9HQyNz1NR1AWlJ_uebMsXo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type User = {
  id: string;
  name: string;
  email: string;
  images: string[];
  online: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export type Conversation = {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  updated_at: string;
}; 
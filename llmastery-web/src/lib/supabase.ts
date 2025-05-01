import { Database } from "@/types/database-types";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client-side Supabase client (uses the anon key)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper to create a server-side Supabase client
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};

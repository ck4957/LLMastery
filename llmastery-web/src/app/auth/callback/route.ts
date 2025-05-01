import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createUserProfile, getUserProfile } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // Create Supabase client with the server cookies
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });

  // Get auth code from the URL
  const code = request.nextUrl.searchParams.get('code');
  
  if (code) {
    // Exchange code for session
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get the current session and user
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    
    if (user) {
      // Check if user profile exists, if not create one
      const userProfile = await getUserProfile(user.id);
      if (!userProfile) {
        // For social logins, we can use user.user_metadata for additional info
        const { email, name } = user.user_metadata;
        const username = name || email?.split('@')[0];
        
        await createUserProfile(user.id, username);
      }
    }
  }

  // Redirect to dashboard after login
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
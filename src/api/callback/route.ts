import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(
            name: string,
            value: string,
            options: {
              path: string;
              maxAge?: number;
              domain?: string;
              sameSite?: 'lax' | 'strict' | 'none';
              secure?: boolean;
            },
          ) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: { path: string; domain?: string }) {
            cookieStore.set({ name, value: '', ...options, maxAge: 0 });
          },
        },
      },
    );

    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to the dashboard after sign in
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

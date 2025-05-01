import { NextRequest, NextResponse } from "next/server";
import { getUserProfile, upsertUserProfile } from "@/services/users";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * GET /api/users/profile
 * Gets the current user's profile
 */
export async function GET(request: NextRequest) {
  try {
    // Get the current user from Supabase auth
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const userProfile = await getUserProfile(userId);

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: userProfile });
  } catch (error: any) {
    console.error("Error in GET /api/users/profile:", error);
    return NextResponse.json(
      {
        error:
          error.message || "An error occurred while fetching the user profile",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/profile
 * Updates the current user's profile
 */
export async function PUT(request: NextRequest) {
  try {
    // Get the current user from Supabase auth
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();

    // Validate the request body
    if (!body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const userProfile = await upsertUserProfile(userId, body);

    if (!userProfile) {
      return NextResponse.json(
        { error: "Failed to update user profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: userProfile });
  } catch (error: any) {
    console.error("Error in PUT /api/users/profile:", error);
    return NextResponse.json(
      {
        error:
          error.message || "An error occurred while updating the user profile",
      },
      { status: 500 }
    );
  }
}

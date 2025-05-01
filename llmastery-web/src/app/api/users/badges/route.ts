import { NextRequest, NextResponse } from "next/server";
import { getUserBadges, awardBadgeToUser } from "@/services/users";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * GET /api/users/badges
 * Gets the current user's badges
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
    const badges = await getUserBadges(userId);

    return NextResponse.json({ data: badges });
  } catch (error: any) {
    console.error("Error in GET /api/users/badges:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while fetching user badges",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users/badges
 * Awards a new badge to the current user
 */
export async function POST(request: NextRequest) {
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
    const { badgeId } = await request.json();

    if (!badgeId) {
      return NextResponse.json(
        { error: "Badge ID is required" },
        { status: 400 }
      );
    }

    const badge = await awardBadgeToUser(userId, badgeId);

    if (!badge) {
      return NextResponse.json(
        { error: "Failed to award badge" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: badge });
  } catch (error: any) {
    console.error("Error in POST /api/users/badges:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while awarding a badge" },
      { status: 500 }
    );
  }
}

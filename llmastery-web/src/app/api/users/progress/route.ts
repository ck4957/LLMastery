import { NextRequest, NextResponse } from "next/server";
import {
  getUserLessonProgress,
  updateLessonProgress,
  updateUserStreak,
} from "@/services/users";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * GET /api/users/progress
 * Gets the current user's lesson progress
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
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId") || undefined;

    const progress = await getUserLessonProgress(
      userId,
      lessonId as string | undefined
    );

    return NextResponse.json({ data: progress });
  } catch (error: any) {
    console.error("Error in GET /api/users/progress:", error);
    return NextResponse.json(
      {
        error:
          error.message || "An error occurred while fetching user progress",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users/progress
 * Updates the current user's lesson progress
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
    const { lessonId, progress } = await request.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    // Update user streak if lesson was completed
    if (progress.completed) {
      await updateUserStreak(userId);
    }

    const updatedProgress = await updateLessonProgress(
      userId,
      lessonId,
      progress
    );

    if (!updatedProgress) {
      return NextResponse.json(
        { error: "Failed to update progress" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: updatedProgress });
  } catch (error: any) {
    console.error("Error in POST /api/users/progress:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while updating progress" },
      { status: 500 }
    );
  }
}

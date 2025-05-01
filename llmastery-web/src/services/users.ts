import { createServerSupabaseClient } from "@/lib/supabase";
import { LessonProgress } from "@/types/lesson-types";
import type { UserProfile, UserBadge } from "@/types/user-types";

/**
 * Get user profile by ID
 */
export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data as UserProfile;
}

/**
 * Create or update user profile
 */
export async function upsertUserProfile(
  userId: string,
  profile: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>
): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient();

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  let result;

  if (existingProfile) {
    // Update existing profile
    result = await supabase
      .from("user_profiles")
      .update({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();
  } else {
    // Create new profile
    result = await supabase
      .from("user_profiles")
      .insert({
        id: userId,
        ...profile,
        points: profile.points || 0,
        streak: profile.streak || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
  }

  if (result.error) {
    console.error("Error upserting user profile:", result.error);
    throw new Error(result.error.message);
  }

  return result.data as UserProfile;
}

/**
 * Get user badges
 */
export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("user_badges")
    .select(
      `
      *,
      badge:badges(*)
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user badges:", error);
    throw new Error(error.message);
  }

  return data as UserBadge[];
}

/**
 * Award a badge to a user
 */
export async function awardBadgeToUser(
  userId: string,
  badgeId: string
): Promise<UserBadge | null> {
  const supabase = createServerSupabaseClient();

  // Check if user already has this badge
  const { data: existingBadge } = await supabase
    .from("user_badges")
    .select("*")
    .eq("user_id", userId)
    .eq("badge_id", badgeId)
    .single();

  if (existingBadge) {
    return existingBadge as UserBadge;
  }

  // Award new badge
  const { data, error } = await supabase
    .from("user_badges")
    .insert({
      user_id: userId,
      badge_id: badgeId,
      earned_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error awarding badge to user:", error);
    throw new Error(error.message);
  }

  return data as UserBadge;
}

/**
 * Get user's lesson progress
 */
export async function getUserLessonProgress(
  userId: string,
  lessonId?: string
): Promise<LessonProgress[]> {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId);

  if (lessonId) {
    query = query.eq("lesson_id", lessonId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching user lesson progress:", error);
    throw new Error(error.message);
  }

  return data as LessonProgress[];
}

/**
 * Update user's lesson progress
 */
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  progress: Partial<
    Omit<
      LessonProgress,
      "id" | "user_id" | "lesson_id" | "created_at" | "updated_at"
    >
  >
): Promise<LessonProgress | null> {
  const supabase = createServerSupabaseClient();

  // Check if progress exists
  const { data: existingProgress } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  let result;

  if (existingProgress) {
    // Update existing progress
    result = await supabase
      .from("lesson_progress")
      .update({
        ...progress,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingProgress.id)
      .select()
      .single();
  } else {
    // Create new progress
    result = await supabase
      .from("lesson_progress")
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        ...progress,
        started_at: progress.started_at || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
  }

  if (result.error) {
    console.error("Error updating lesson progress:", result.error);
    throw new Error(result.error.message);
  }

  return result.data as LessonProgress;
}

/**
 * Update user streak
 */
export async function updateUserStreak(
  userId: string
): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient();

  // Get user profile with current streak
  const { data: userProfile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error(
      "Error fetching user profile for streak update:",
      profileError
    );
    throw new Error(profileError.message);
  }

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  const now = new Date();
  const lastUpdated = userProfile.streak_last_updated
    ? new Date(userProfile.streak_last_updated)
    : new Date(0); // epoch if never updated

  // Check if last streak update was on a different day (not today)
  const isNewDay = now.toDateString() !== lastUpdated.toDateString();

  // Only update streak if it's a new day
  if (isNewDay) {
    // Calculate if streak continues or resets
    // If last update was yesterday, continue streak, otherwise reset to 1
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const isConsecutive =
      lastUpdated.toDateString() === yesterday.toDateString();
    const newStreak = isConsecutive ? (userProfile.streak || 0) + 1 : 1;

    // Update streak
    const { data, error } = await supabase
      .from("user_profiles")
      .update({
        streak: newStreak,
        streak_last_updated: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating user streak:", error);
      throw new Error(error.message);
    }

    return data as UserProfile;
  }

  // If already updated today, return current profile
  return userProfile as UserProfile;
}

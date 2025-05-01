import { createServerSupabaseClient } from "@/lib/supabase";
import { Lesson, Quiz, Challenge } from "@/types/lesson-types";
/**
 * Fetches all lessons with optional filtering and pagination
 */
export async function getLessons({
  limit = 10,
  page = 1,
  level,
  category,
  isPublished = true,
  orderBy = "order_index",
  ascending = true,
}: {
  limit?: number;
  page?: number;
  level?: string;
  category?: string;
  isPublished?: boolean;
  orderBy?: string;
  ascending?: boolean;
} = {}): Promise<{ lessons: Lesson[]; count: number }> {
  const supabase = createServerSupabaseClient();
  const offset = (page - 1) * limit;

  let query = supabase.from("lessons").select("*", { count: "exact" });

  // Apply filters if provided
  if (level) {
    query = query.eq("level", level);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (isPublished !== undefined) {
    query = query.eq("is_published", isPublished);
  }

  // Apply pagination and ordering
  const { data, error, count } = await query
    .order(orderBy, { ascending })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching lessons:", error);
    throw new Error(error.message);
  }

  return {
    lessons: data || [],
    count: count || 0,
  };
}

/**
 * Fetches a single lesson by ID with its related quizzes and challenges
 */
export async function getLessonById(id: string): Promise<Lesson | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("lessons")
    .select(
      `
      *,
      quizzes (*),
      challenges (*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching lesson by ID:", error);
    return null;
  }

  return data as Lesson;
}

/**
 * Creates a new lesson
 */
export async function createLesson(
  lesson: Omit<Lesson, "id" | "created_at" | "updated_at">
): Promise<Lesson | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("lessons")
    .insert(lesson)
    .select()
    .single();

  if (error) {
    console.error("Error creating lesson:", error);
    throw new Error(error.message);
  }

  return data as Lesson;
}

/**
 * Updates an existing lesson
 */
export async function updateLesson(
  id: string,
  updates: Partial<Omit<Lesson, "id" | "created_at" | "updated_at">>
): Promise<Lesson | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("lessons")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating lesson:", error);
    throw new Error(error.message);
  }

  return data as Lesson;
}

/**
 * Deletes a lesson by ID
 */
export async function deleteLesson(id: string): Promise<{ success: boolean }> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("lessons").delete().eq("id", id);

  if (error) {
    console.error("Error deleting lesson:", error);
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * Add a quiz to a lesson
 */
export async function addQuizToLesson(
  quiz: Omit<Quiz, "id" | "created_at" | "updated_at">
): Promise<Quiz | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("quizzes")
    .insert(quiz)
    .select()
    .single();

  if (error) {
    console.error("Error adding quiz to lesson:", error);
    throw new Error(error.message);
  }

  return data as Quiz;
}

/**
 * Add a challenge to a lesson
 */
export async function addChallengeToLesson(
  challenge: Omit<Challenge, "id" | "created_at" | "updated_at">
): Promise<Challenge | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("challenges")
    .insert(challenge)
    .select()
    .single();

  if (error) {
    console.error("Error adding challenge to lesson:", error);
    throw new Error(error.message);
  }

  return data as Challenge;
}

/**
 * Updates the order of lessons
 */
export async function updateLessonsOrder(
  lessonOrders: { id: string; order_index: number }[]
): Promise<{ success: boolean }> {
  const supabase = createServerSupabaseClient();

  // Use transaction to ensure all updates succeed or none do
  const updates = lessonOrders.map(({ id, order_index }) =>
    supabase.from("lessons").update({ order_index }).eq("id", id)
  );

  try {
    await Promise.all(updates);
    return { success: true };
  } catch (error) {
    console.error("Error updating lesson order:", error);
    throw new Error("Failed to update lesson order");
  }
}

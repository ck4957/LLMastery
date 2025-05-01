import { Lesson, LessonProgress } from "@/types/lesson-types";
import { UserBadge, UserProfile } from "@/types/user-types";

/**
 * Generic API response type
 */
type ApiResponse<T> = {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    pageCount?: number;
  };
  error?: string;
};

/**
 * Error handling helper function
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An error occurred");
  }

  const data = await response.json();
  return data.data;
}

/**
 * Lessons API
 */
export async function getLessons(
  params: {
    limit?: number;
    page?: number;
    level?: string;
    category?: string;
    isPublished?: boolean;
    orderBy?: string;
    ascending?: boolean;
  } = {}
): Promise<{ lessons: Lesson[]; count: number }> {
  // Convert params to URL search params
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.level) searchParams.append("level", params.level);
  if (params.category) searchParams.append("category", params.category);
  if (params.isPublished !== undefined)
    searchParams.append("isPublished", params.isPublished.toString());
  if (params.orderBy) searchParams.append("orderBy", params.orderBy);
  if (params.ascending !== undefined)
    searchParams.append("ascending", params.ascending.toString());

  const url = `/api/lessons?${searchParams.toString()}`;
  const response = await fetch(url);
  const result = await handleResponse<ApiResponse<Lesson[]>>(response);

  return {
    lessons: result,
    count: result.meta?.total || 0,
  };
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  try {
    const response = await fetch(`/api/lessons/${id}`);
    if (response.status === 404) return null;
    return await handleResponse<Lesson>(response);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
}

export async function createLesson(
  lesson: Omit<Lesson, "id" | "created_at" | "updated_at">
): Promise<Lesson> {
  const response = await fetch("/api/lessons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lesson),
  });

  return handleResponse<Lesson>(response);
}

export async function updateLesson(
  id: string,
  updates: Partial<Omit<Lesson, "id" | "created_at" | "updated_at">>
): Promise<Lesson> {
  const response = await fetch(`/api/lessons/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return handleResponse<Lesson>(response);
}

export async function deleteLesson(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/lessons/${id}`, {
    method: "DELETE",
  });

  return handleResponse<{ success: boolean }>(response);
}

/**
 * User Profile API
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const response = await fetch("/api/users/profile");
    if (response.status === 404) return null;
    return await handleResponse<UserProfile>(response);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function updateUserProfile(
  profile: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>
): Promise<UserProfile> {
  const response = await fetch("/api/users/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  return handleResponse<UserProfile>(response);
}

/**
 * User Badges API
 */
export async function getUserBadges(): Promise<UserBadge[]> {
  const response = await fetch("/api/users/badges");
  return handleResponse<UserBadge[]>(response);
}

export async function awardUserBadge(badgeId: string): Promise<UserBadge> {
  const response = await fetch("/api/users/badges", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ badgeId }),
  });

  return handleResponse<UserBadge>(response);
}

/**
 * Lesson Progress API
 */
export async function getLessonProgress(
  lessonId?: string
): Promise<LessonProgress[]> {
  const url = lessonId
    ? `/api/users/progress?lessonId=${lessonId}`
    : "/api/users/progress";
  const response = await fetch(url);
  return handleResponse<LessonProgress[]>(response);
}

export async function updateLessonProgress(
  lessonId: string,
  progress: Partial<
    Omit<
      LessonProgress,
      "id" | "user_id" | "lesson_id" | "created_at" | "updated_at"
    >
  >
): Promise<LessonProgress> {
  const response = await fetch("/api/users/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId, progress }),
  });

  return handleResponse<LessonProgress>(response);
}

/**
 * Helper functions for lesson tracking
 */
export async function startLesson(lessonId: string): Promise<LessonProgress> {
  return updateLessonProgress(lessonId, {
    started_at: new Date().toISOString(),
    completed: false,
  });
}

export async function completeLesson(
  lessonId: string,
  quizScore: number | null = null,
  challengeCompleted: boolean = false
): Promise<LessonProgress> {
  return updateLessonProgress(lessonId, {
    completed: true,
    quiz_score: quizScore,
    challenge_completed: challengeCompleted,
    completed_at: new Date().toISOString(),
  });
}

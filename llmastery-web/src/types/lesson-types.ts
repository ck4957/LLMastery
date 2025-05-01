/**
 * Lesson related type definitions
 */

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  duration: number;
  points: number;
  xp_reward: number;
  created_at: string;
  updated_at: string;
  order_index: number;
  next_lesson_id: string | null;
  is_published: boolean;
  quizzes?: Quiz[];
  challenges?: Challenge[];
}

export interface Quiz {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_answer_index: number;
  explanation: string | null;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  lesson_id: string;
  prompt: string;
  example: string | null;
  point_value: number;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  started_at: string;
  completed_at: string | null;
  quiz_score: number | null;
  challenge_completed: boolean;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

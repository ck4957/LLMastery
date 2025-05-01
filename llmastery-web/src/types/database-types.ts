import { Lesson, Quiz, Challenge, LessonProgress } from "./lesson-types";
import { UserProfile, Badge, UserBadge } from "./user-types";
import { PricingPlan, UserSubscription } from "./subscription-types";

export interface Database {
  public: {
    Tables: {
      lessons: {
        Row: Lesson;
        Insert: Omit<Lesson, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Lesson, "id" | "created_at" | "updated_at">>;
      };
      quizzes: {
        Row: Quiz;
        Insert: Omit<Quiz, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Quiz, "id" | "created_at" | "updated_at">>;
      };
      challenges: {
        Row: Challenge;
        Insert: Omit<Challenge, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Challenge, "id" | "created_at" | "updated_at">>;
      };
      user_profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>;
      };
      badges: {
        Row: Badge;
        Insert: Omit<Badge, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Badge, "id" | "created_at" | "updated_at">>;
      };
      user_badges: {
        Row: UserBadge;
        Insert: Omit<UserBadge, "id" | "earned_at">;
        Update: Partial<Omit<UserBadge, "id" | "earned_at">>;
      };
      lesson_progress: {
        Row: LessonProgress;
        Insert: Omit<LessonProgress, "id" | "created_at" | "updated_at">;
        Update: Partial<
          Omit<LessonProgress, "id" | "created_at" | "updated_at">
        >;
      };
      pricing_plans: {
        Row: PricingPlan;
        Insert: Omit<PricingPlan, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<PricingPlan, "id" | "created_at" | "updated_at">>;
      };
      user_subscriptions: {
        Row: UserSubscription;
        Insert: Omit<UserSubscription, "id" | "created_at" | "updated_at">;
        Update: Partial<
          Omit<UserSubscription, "id" | "created_at" | "updated_at">
        >;
      };
    };
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: {
      lesson_category:
        | "FUNDAMENTALS"
        | "ARCHITECTURE"
        | "PROMPTING"
        | "TRAINING"
        | "EVALUATION"
        | "APPLICATIONS"
        | "ETHICS";
      lesson_level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;

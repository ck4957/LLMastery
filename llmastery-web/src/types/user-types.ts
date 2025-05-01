/**
 * User related type definitions
 */

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  points: number;
  streak: number;
  streak_last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  criteria: string;
  created_at: string;
  updated_at: string;
}

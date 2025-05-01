"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  getLessons,
  getUserProfile,
  getUserBadges,
  getLessonProgress,
} from "@/lib/api-client";
import {
  Lesson,
  UserProfile,
  UserBadge,
  LessonProgress,
} from "@/types/supabase";
import NavBar from "@/components/layout/NavBar";

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [userProgress, setUserProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch user data and lessons when authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get all data in parallel for better performance
        const [lessonsResponse, profileData, badgesData, progressData] =
          await Promise.all([
            getLessons({ limit: 20, orderBy: "order_index", ascending: true }),
            getUserProfile(),
            getUserBadges(),
            getLessonProgress(),
          ]);

        setLessons(lessonsResponse.lessons);
        setUserProfile(profileData);
        setUserBadges(badgesData);
        setUserProgress(progressData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Helper function to get completion status of a lesson
  const getLessonCompletionStatus = (lessonId: string) => {
    const progress = userProgress.find((p) => p.lesson_id === lessonId);
    if (!progress) return "not-started";
    if (progress.completed) return "completed";
    return "in-progress";
  };

  // Calculate progress percentage
  const completedLessons = userProgress.filter((p) => p.completed).length;
  const progressPercentage =
    lessons.length > 0
      ? Math.round((completedLessons / lessons.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Use the shared NavBar component */}
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back
                {userProfile?.username ? `, ${userProfile.username}` : ""}!
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Continue your learning journey in large language models.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">
                    {userProfile?.points || 0}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Points
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center bg-orange-100 dark:bg-orange-900/50 px-3 py-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-600 dark:text-orange-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 font-medium text-orange-600 dark:text-orange-400">
                    {userProfile?.streak || 0}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Streak
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center bg-purple-100 dark:bg-purple-900/50 px-3 py-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600 dark:text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 font-medium text-purple-600 dark:text-purple-400">
                    {userBadges.length}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Badges
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Overall Progress</span>
              <span>
                {completedLessons} of {lessons.length} lessons completed
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Learning Path
              </h2>

              <div className="space-y-4">
                {lessons.map((lesson, index) => {
                  const completionStatus = getLessonCompletionStatus(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className={`block p-4 border rounded-lg transition-all 
                        ${
                          completionStatus === "completed"
                            ? "border-green-200 dark:border-green-800"
                            : completionStatus === "in-progress"
                            ? "border-yellow-200 dark:border-yellow-800"
                            : "border-gray-200 dark:border-gray-700"
                        }
                        hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white
                              ${
                                completionStatus === "completed"
                                  ? "bg-green-500 dark:bg-green-600"
                                  : completionStatus === "in-progress"
                                  ? "bg-yellow-500 dark:bg-yellow-600"
                                  : "bg-gray-400 dark:bg-gray-600"
                              }`}
                          >
                            {completionStatus === "completed" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className="text-xs font-medium border px-2 py-1 rounded-full
                            bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {lesson.level}
                          </div>
                          <div
                            className="text-xs font-medium border px-2 py-1 rounded-full
                            bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                          >
                            {lesson.duration} min
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Column */}
          <div>
            {/* Badges Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Badges
              </h2>

              {userBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {userBadges.map((userBadge) => (
                    <div
                      key={userBadge.id}
                      className="flex flex-col items-center text-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-2">
                        {userBadge.badge?.image_url ? (
                          <Image
                            src={userBadge.badge.image_url}
                            alt={userBadge.badge.name}
                            width={32}
                            height={32}
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {userBadge.badge?.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(userBadge.earned_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Complete lessons to earn badges
                  </p>
                </div>
              )}

              {/* Badge Placeholder for Locked Badges */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Array(4 - Math.min(userBadges.length, 4))
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center p-2 rounded-lg opacity-40"
                    >
                      <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400 dark:text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                        Locked
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">
                    Lessons Completed
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {completedLessons}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">
                    Current Streak
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {userProfile?.streak || 0} days
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Points
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {userProfile?.points || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">
                    Badges Earned
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {userBadges.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

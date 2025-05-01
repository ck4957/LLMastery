import Link from "next/link";
import { FEATURES } from "@/lib/features";
import NavBar from "@/components/layout/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Navigation Header */}
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            LLMastery
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Master Large Language Models through gamified learning
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full px-8 py-3 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/about"
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium rounded-full px-8 py-3 border border-indigo-600 dark:border-indigo-400 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Interactive Lessons
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Bite-sized, interactive lessons on LLMs with quizzes and practical
              exercises.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              AI-Powered Tutor
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized assistance and feedback from our advanced AI
              tutor.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Earn & Compete
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Earn badges, maintain streaks, and compete on leaderboards as you
              learn.
            </p>
          </div>
        </div>

        {/* Learning Path Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Your LLM Learning Path
          </h2>
          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
            {/* Module 1 */}
            <div className="flex-shrink-0 w-40 bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
              <div className="rounded-full bg-green-500 w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="font-semibold">LLM Basics</h3>
            </div>

            {/* Module 2 */}
            <div className="flex-shrink-0 w-40 bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 text-center">
              <div className="rounded-full bg-yellow-500 w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="font-semibold">Transformers</h3>
            </div>

            {/* Module 3 */}
            <div className="flex-shrink-0 w-40 bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
              <div className="rounded-full bg-blue-500 w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="font-semibold">Prompt Engineering</h3>
            </div>

            {/* Module 4 */}
            <div className="flex-shrink-0 w-40 bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
              <div className="rounded-full bg-purple-500 w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white font-bold">
                4
              </div>
              <h3 className="font-semibold">Fine-tuning</h3>
            </div>

            {/* Module 5 */}
            <div className="flex-shrink-0 w-40 bg-pink-100 dark:bg-pink-900 rounded-lg p-4 text-center">
              <div className="rounded-full bg-pink-500 w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white font-bold">
                5
              </div>
              <h3 className="font-semibold">RLHF</h3>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to master LLMs?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of learners on their journey to LLM expertise.
          </p>
          <Link
            href="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full px-8 py-3 transition-colors"
          >
            Start Learning for Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                &copy; 2025 LLMastery. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                About
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Contact
              </Link>
              {FEATURES.SHOW_COMMUNITY_LINK && (
                <Link
                  href="/community"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Community
                </Link>
              )}
              {FEATURES.SHOW_PRICING_LINK && (
                <Link
                  href="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Pricing
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

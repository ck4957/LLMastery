"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

export default function NavBar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      // Redirect happens automatically via auth context
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            LLMastery
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {/* Navigation links commented out */}
        </nav>

        {/* Conditional rendering based on authentication status */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <div className="bg-indigo-500 h-8 w-8 rounded-full flex items-center justify-center text-white">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
              >
                {isLoggingOut ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin mr-2 h-4 w-4 text-gray-600 dark:text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  "Sign out"
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

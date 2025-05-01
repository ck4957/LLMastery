"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { getLessonById, startLesson, completeLesson } from "@/lib/api-client";

// Component interfaces
interface LessonData {
  id: string;
  title: string;
  description: string;
  content: string;
  level: string;
  category: string;
  duration: number;
  points: number;
  xp_reward: number;
  quizzes: QuizData[];
  challenges: ChallengeData[];
  next_lesson_id: string | null;
}

interface QuizData {
  id: string;
  question: string;
  options: string[];
  correct_answer_index: number;
  explanation: string | null;
}

interface ChallengeData {
  id: string;
  prompt: string;
  example: string | null;
  point_value: number;
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = params.id;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<
    "content" | "quiz" | "challenge" | "complete"
  >("content");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [showChallengeExample, setShowChallengeExample] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Fetch lesson data
  useEffect(() => {
    async function fetchLessonData() {
      if (!lessonId) return;

      try {
        setLoading(true);
        const lessonData = await getLessonById(lessonId);

        if (lessonData) {
          setLesson(lessonData as unknown as LessonData);

          // Start lesson tracking if authenticated
          if (user) {
            await startLesson(lessonId);
          }
        } else {
          console.error("Lesson not found");
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchLessonData();
    }
  }, [lessonId, user, authLoading]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(
        "/login?redirect=" + encodeURIComponent(`/lessons/${lessonId}`)
      );
    }
  }, [user, authLoading, router, lessonId]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Lesson not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The lesson you're looking for doesn't exist.
          </p>
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleQuizSubmit = () => {
    if (quizAnswers.length !== lesson.quizzes.length) {
      setFeedbackMessage("Please answer all questions.");
      return;
    }

    const results = lesson.quizzes.map(
      (q, index) => q.correct_answer_index === quizAnswers[index]
    );
    setQuizResults(results);

    // Calculate score as percentage
    const correctAnswers = results.filter((result) => result).length;
    const score = correctAnswers / results.length;
    setQuizScore(score);

    if (results.every((result) => result)) {
      setFeedbackMessage("Great job! All answers are correct!");
      setTimeout(() => {
        setFeedbackMessage("");
        setCurrentStep("challenge");
      }, 2000);
    } else {
      setFeedbackMessage("Some answers are incorrect. Try again!");
    }
  };

  const handleChallengeSubmit = async () => {
    if (challengeAnswer.length < 20) {
      setFeedbackMessage(
        "Your answer is too short. Please provide a more detailed explanation."
      );
      return;
    }

    setFeedbackMessage("Challenge completed! Your response has been recorded.");

    // Record lesson completion with quiz score and challenge completion
    if (user) {
      await completeLesson(lessonId, quizScore, true);
    }

    setTimeout(() => {
      setCurrentStep("complete");
    }, 2000);
  };

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  const renderContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <div
        className="prose prose-indigo dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setCurrentStep("quiz")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Continue to Quiz
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Knowledge Check
      </h2>
      {lesson.quizzes.map((question, qIndex) => (
        <div key={qIndex} className="mb-8">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {qIndex + 1}. {question.question}
          </p>
          <div className="space-y-3">
            {question.options.map((option, oIndex) => (
              <label
                key={oIndex}
                className={`
                  block p-4 border rounded-lg cursor-pointer transition-all
                  ${
                    quizAnswers[qIndex] === oIndex
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }
                  ${
                    quizResults.length > 0 && quizAnswers[qIndex] === oIndex
                      ? quizResults[qIndex]
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : ""
                  }
                `}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={quizAnswers[qIndex] === oIndex}
                    onChange={() => handleOptionSelect(qIndex, oIndex)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-800 dark:text-gray-200">
                    {option}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Show explanation when answered incorrectly */}
          {quizResults.length > 0 &&
            !quizResults[qIndex] &&
            question.explanation && (
              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-200 rounded-md text-sm">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            )}
        </div>
      ))}

      {feedbackMessage && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            feedbackMessage.includes("correct")
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentStep("content")}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Back to Content
        </button>
        <button
          onClick={handleQuizSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Check Answers
        </button>
      </div>
    </div>
  );

  const renderChallenge = () => {
    // Use first challenge from the lesson
    const challenge =
      lesson.challenges && lesson.challenges.length > 0
        ? lesson.challenges[0]
        : { prompt: "Challenge not available", example: null, point_value: 0 };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Challenge Exercise
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete this challenge to earn extra XP!
        </p>

        <div className="mb-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            {challenge.prompt}
          </p>
          <textarea
            value={challengeAnswer}
            onChange={(e) => setChallengeAnswer(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
            placeholder="Type your answer here..."
          />
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowChallengeExample(!showChallengeExample)}
            className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
          >
            {showChallengeExample ? "Hide example" : "Show me an example"}
          </button>

          {showChallengeExample && challenge.example && (
            <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{challenge.example}"
              </p>
            </div>
          )}
        </div>

        {feedbackMessage && (
          <div className="p-4 mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
            {feedbackMessage}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep("quiz")}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Back to Quiz
          </button>
          <button
            onClick={handleChallengeSubmit}
            disabled={challengeAnswer.length < 10}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Submit Challenge
          </button>
        </div>
      </div>
    );
  };

  const renderComplete = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
      <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 mx-auto flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Lesson Complete!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Great job completing this lesson.
      </p>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg mb-8 inline-block">
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm">
              Points Earned
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              +
              {quizScore !== null
                ? Math.round(lesson.points * quizScore)
                : lesson.points}
            </p>
          </div>
          <div className="text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm">
              XP Reward
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              +{lesson.xp_reward}
            </p>
          </div>
          <div className="text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm">
              Streak
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              +1
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          href="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Back to Dashboard
        </Link>
        {lesson.next_lesson_id && (
          <Link
            href={`/lessons/${lesson.next_lesson_id}`}
            className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-indigo-600 dark:text-indigo-400 px-6 py-2 rounded-lg border border-indigo-600 dark:border-indigo-400 transition-colors"
          >
            Next Lesson
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              LLMastery
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 font-medium text-indigo-600 dark:text-indigo-400">
                {user?.user_metadata?.points || "0"}
              </span>
            </div>
            <Link
              href="/dashboard"
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Exit Lesson
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Header */}
      <div className="bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {lesson.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {lesson.description}
          </p>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center">
            <div className="flex-grow flex">
              {["content", "quiz", "challenge", "complete"].map(
                (step, index) => (
                  <div key={index} className="flex-grow relative">
                    <div
                      className={`h-2 ${
                        ["content", "quiz", "challenge", "complete"].indexOf(
                          currentStep
                        ) >= index
                          ? "bg-indigo-600 dark:bg-indigo-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></div>
                    {index < 3 && (
                      <div
                        className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
                          ["content", "quiz", "challenge", "complete"].indexOf(
                            currentStep
                          ) > index
                            ? "bg-indigo-600 dark:bg-indigo-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      ></div>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              {lesson.duration} min
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === "content" && renderContent()}
        {currentStep === "quiz" && renderQuiz()}
        {currentStep === "challenge" && renderChallenge()}
        {currentStep === "complete" && renderComplete()}
      </main>
    </div>
  );
}

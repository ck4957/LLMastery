"use client";

import InfoPageLayout from "@/components/shared/InfoPageLayout";

export default function AboutPage() {
  return (
    <InfoPageLayout
      title="About LLMastery"
      description="Our mission is to make advanced AI education accessible to everyone"
    >
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Our Story
        </h2>

        <p className="mb-6">
          Founded in 2025, LLMastery was created with a singular vision: to
          democratize access to high-quality educational content about Large
          Language Models and AI technologies. As these powerful tools transform
          industries and reshape our world, we believe that understanding how
          they work should not be reserved for technical specialists alone.
        </p>

        <p className="mb-10">
          Our platform combines the expertise of AI researchers, educators, and
          industry practitioners to create a learning experience that is both
          accessible and comprehensive. We use gamification elements to make the
          learning process engaging and rewarding, helping you build practical
          skills that can be applied immediately in your work or studies.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Our Approach
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Learn by Doing
            </h3>
            <p>
              Our interactive exercises and challenges give you hands-on
              experience with prompting, fine-tuning, and deploying LLMs, so you
              can apply these skills in real-world scenarios.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Community-Powered
            </h3>
            <p>
              Join a vibrant community of learners, from beginners to experts,
              who share insights, challenges, and discoveries as they navigate
              the rapidly evolving landscape of AI.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Industry-Relevant
            </h3>
            <p>
              Our curriculum is continuously updated to reflect the latest
              advancements in LLM technology, ensuring you are learning skills
              that matter in todays AI-powered economy.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Inclusive Design
            </h3>
            <p>
              We have built our platform to be accessible to learners from
              diverse backgrounds, with varying levels of technical expertise,
              creating multiple pathways to mastery.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Our Mission
        </h2>

        <p className="mb-6">At LLMastery, we are committed to:</p>

        <ul className="list-disc pl-6 mb-10">
          <li className="mb-2">
            Making advanced AI education accessible to everyone, regardless of
            technical background
          </li>
          <li className="mb-2">
            Building an inclusive community where diverse perspectives enrich
            the learning experience
          </li>
          <li className="mb-2">
            Promoting responsible AI practices and ethical considerations in LLM
            development and use
          </li>
          <li className="mb-2">
            Continuously evolving our platform based on learner feedback and the
            latest industry developments
          </li>
          <li>
            Empowering individuals to harness the transformative potential of AI
            in their careers and ventures
          </li>
        </ul>

        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-3">
            Join Us on This Journey
          </h3>
          <p className="mb-4">
            Whether you are just beginning to explore LLMs or looking to deepen
            your expertise, LLMastery is your partner in navigating the exciting
            frontier of artificial intelligence.
          </p>
          <a
            href="/signup"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Start Learning Today
          </a>
        </div>
      </div>
    </InfoPageLayout>
  );
}

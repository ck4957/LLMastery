'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getLessons, getLessonProgress } from '@/lib/api-client';
import { Lesson, LessonProgress } from '@/types/supabase';

export default function LessonsPage() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all lessons
        const { lessons: allLessons } = await getLessons({ 
          isPublished: true,
          orderBy: 'order_index',
          ascending: true
        });
        setLessons(allLessons);

        // If user is logged in, fetch their lesson progress
        if (user) {
          const progress = await getLessonProgress();
          
          // Convert array to record for easier lookup
          const progressRecord: Record<string, LessonProgress> = {};
          progress.forEach(p => {
            progressRecord[p.lesson_id] = p;
          });
          
          setLessonProgress(progressRecord);
        }
      } catch (error) {
        console.error('Error fetching lessons data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  function getProgressPercent(lessonId: string): number {
    if (!user || !lessonProgress[lessonId]) return 0;
    return lessonProgress[lessonId].completed ? 100 : 0;
  }

  function getLessonStatus(lessonId: string): 'not-started' | 'in-progress' | 'completed' {
    if (!user || !lessonProgress[lessonId]) return 'not-started';
    
    if (lessonProgress[lessonId].completed) return 'completed';
    if (lessonProgress[lessonId].started_at) return 'in-progress';
    return 'not-started';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">LLMastery Learning Path</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <p className="text-lg text-center max-w-3xl mx-auto">
              Master the fundamentals of Large Language Models through our comprehensive curriculum. 
              Work through each lesson to build your skills and knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const status = getLessonStatus(lesson.id);
              const progressPercent = getProgressPercent(lesson.id);
              
              return (
                <div 
                  key={lesson.id} 
                  className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{lesson.title}</h3>
                      
                      {user && (
                        <div className="flex items-center">
                          {status === 'completed' && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Completed
                            </span>
                          )}
                          {status === 'in-progress' && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{lesson.description}</p>
                    
                    {user && progressPercent > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <span className="mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {lesson.estimated_time} min
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {lesson.difficulty}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/lessons/${lesson.id}`}
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    >
                      {status === 'in-progress' ? 'Continue Learning' : 'Start Lesson'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
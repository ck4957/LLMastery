'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Member {
  id: string;
  avatar?: string;
  name: string;
}

interface CommunityGroupProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: Member[];
  isJoined: boolean;
  topics: string[];
  onJoinLeave?: (id: string, action: 'join' | 'leave') => void;
}

const CommunityGroupCard = ({
  id,
  name,
  description,
  memberCount,
  members,
  isJoined,
  topics,
  onJoinLeave
}: CommunityGroupProps) => {
  const [joined, setJoined] = useState(isJoined);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinLeave = async () => {
    if (!onJoinLeave) return;
    
    setIsLoading(true);
    try {
      await onJoinLeave(id, joined ? 'leave' : 'join');
      setJoined(!joined);
    } catch (error) {
      console.error('Failed to join/leave group:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Group Header */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          <Link href={`/community/groups/${id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
            {name}
          </Link>
        </h3>
        
        {/* Topics/Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {topics.map((topic) => (
            <span 
              key={topic}
              className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 
                text-xs font-medium rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
        
        {/* Group Stats & Members */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((member) => (
                <div key={member.id} className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  {member.avatar ? (
                    <Image src={member.avatar} alt={member.name} width={28} height={28} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              
              {memberCount > 3 && (
                <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">+{memberCount - 3}</span>
                </div>
              )}
            </div>
            
            <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">
              {memberCount} members
            </span>
          </div>
          
          <button 
            onClick={handleJoinLeave}
            disabled={isLoading}
            className={`text-sm font-medium px-4 py-1.5 rounded-full ${
              joined ? 
              'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : 
              'bg-indigo-600 hover:bg-indigo-700 text-white'
            } transition-colors`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {joined ? 'Leaving...' : 'Joining...'}
              </span>
            ) : (
              joined ? 'Leave Group' : 'Join Group'
            )}
          </button>
        </div>
      </div>
      
      {/* Latest Activity */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
        <Link href={`/community/groups/${id}`} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
          View Group →
        </Link>
      </div>
    </div>
  );
};

export default CommunityGroupCard;
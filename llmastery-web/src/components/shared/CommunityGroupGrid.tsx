'use client';

import { useState } from 'react';
import CommunityGroupCard from './CommunityGroupCard';

interface Member {
  id: string;
  avatar?: string;
  name: string;
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: Member[];
  isJoined: boolean;
  topics: string[];
}

interface CommunityGroupGridProps {
  groups: CommunityGroup[];
  onJoinLeave?: (id: string, action: 'join' | 'leave') => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

const CommunityGroupGrid = ({
  groups,
  onJoinLeave,
  isLoading = false,
  emptyMessage = "No groups found"
}: CommunityGroupGridProps) => {
  const [filter, setFilter] = useState('');
  
  const filteredGroups = filter 
    ? groups.filter(group => 
        group.name.toLowerCase().includes(filter.toLowerCase()) || 
        group.description.toLowerCase().includes(filter.toLowerCase()) ||
        group.topics.some(topic => topic.toLowerCase().includes(filter.toLowerCase()))
      )
    : groups;

  return (
    <div>
      {/* Search/Filter */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search groups by name, topic or description..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredGroups.length > 0 ? (
        // Groups grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <CommunityGroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              description={group.description}
              memberCount={group.memberCount}
              members={group.members}
              isJoined={group.isJoined}
              topics={group.topics}
              onJoinLeave={onJoinLeave}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CommunityGroupGrid;
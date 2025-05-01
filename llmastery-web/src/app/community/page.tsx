'use client';

import { useState } from 'react';
import InfoPageLayout from "@/components/shared/InfoPageLayout";
import CommunityGroupGrid from '@/components/shared/CommunityGroupGrid';

export default function CommunityPage() {
  const [isLoading] = useState(false);
  
  // Mock data for community groups
  const communityGroups = [
    {
      id: 'group-1',
      name: 'LLM Beginners',
      description: 'A friendly space for those just starting their journey into large language models.',
      memberCount: 142,
      members: [
        { id: 'user-1', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 'user-2', name: 'Mike Peters', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 'user-3', name: 'Amy Wong' },
        { id: 'user-4', name: 'Daniel Smith' }
      ],
      isJoined: false,
      topics: ['Beginners', 'Fundamentals', 'LLM Basics']
    },
    {
      id: 'group-2',
      name: 'Prompt Engineering Masters',
      description: 'Advanced techniques and strategies for crafting effective prompts for LLMs.',
      memberCount: 89,
      members: [
        { id: 'user-5', name: 'Robert Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: 'user-6', name: 'Lisa Park' },
        { id: 'user-7', name: 'Chris Mendez', avatar: 'https://i.pravatar.cc/150?img=4' }
      ],
      isJoined: true,
      topics: ['Prompt Engineering', 'Advanced', 'Techniques']
    },
    {
      id: 'group-3',
      name: 'LLM Development',
      description: 'Discussions on developing applications with large language models and related technologies.',
      memberCount: 204,
      members: [
        { id: 'user-8', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5' },
        { id: 'user-9', name: 'James Taylor' },
        { id: 'user-10', name: 'Olivia Martinez', avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: 'user-11', name: 'Ethan Brown' }
      ],
      isJoined: false,
      topics: ['Development', 'Applications', 'Integration']
    },
    {
      id: 'group-4',
      name: 'AI Ethics',
      description: 'Exploring the ethical implications and responsible use of AI and large language models.',
      memberCount: 112,
      members: [
        { id: 'user-12', name: 'Nathan Lee', avatar: 'https://i.pravatar.cc/150?img=7' },
        { id: 'user-13', name: 'Isabella Kim' },
        { id: 'user-14', name: 'William Johnson', avatar: 'https://i.pravatar.cc/150?img=8' }
      ],
      isJoined: false,
      topics: ['Ethics', 'Responsible AI', 'Policy']
    },
    {
      id: 'group-5',
      name: 'Fine-Tuning Workshop',
      description: 'Share experiences and techniques for fine-tuning LLMs for specific use cases.',
      memberCount: 73,
      members: [
        { id: 'user-15', name: 'Sophia Garcia', avatar: 'https://i.pravatar.cc/150?img=9' },
        { id: 'user-16', name: 'Lucas Rodriguez' },
        { id: 'user-17', name: 'Ava Thompson', avatar: 'https://i.pravatar.cc/150?img=10' }
      ],
      isJoined: true,
      topics: ['Fine-Tuning', 'Training', 'Domain Adaptation']
    },
    {
      id: 'group-6',
      name: 'LLM Research',
      description: 'Discussing the latest research papers and breakthroughs in LLM technology.',
      memberCount: 156,
      members: [
        { id: 'user-18', name: 'Benjamin Clark' },
        { id: 'user-19', name: 'Chloe Lewis', avatar: 'https://i.pravatar.cc/150?img=11' },
        { id: 'user-20', name: 'Henry Wilson', avatar: 'https://i.pravatar.cc/150?img=12' }
      ],
      isJoined: false,
      topics: ['Research', 'Papers', 'Innovations']
    }
  ];

  // Handle join/leave group
  const handleJoinLeave = async (groupId: string, action: 'join' | 'leave') => {
    // In a real app, this would make an API call to join/leave the group
    console.log(`${action} group ${groupId}`);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  return (
    <InfoPageLayout 
      title="Community Groups" 
      description="Connect with fellow learners and join discussions on various LLM topics"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Groups</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Join groups based on your interests and learning goals
            </p>
          </div>
          
          <button 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            onClick={() => alert('Create group functionality would go here!')}
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Group
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <CommunityGroupGrid
            groups={communityGroups}
            onJoinLeave={handleJoinLeave}
            isLoading={isLoading}
          />
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
          <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200 mb-2">
            Community Guidelines
          </h3>
          <ul className="space-y-2 text-indigo-700 dark:text-indigo-300">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Be respectful and constructive in all interactions.
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Share knowledge and help fellow community members.
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Keep discussions relevant to the group topic.
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Report any inappropriate content to moderators.
            </li>
          </ul>
        </div>
      </div>
    </InfoPageLayout>
  );
}
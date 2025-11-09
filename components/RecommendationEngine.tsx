import React, { useState, useCallback } from 'react';
import { getPersonalizedTopics } from '../services/geminiService';
import { Icon } from './Icons';

interface RecommendationEngineProps {
  onSearch: (topics: string[]) => void;
}

export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    const result = await getPersonalizedTopics(query);
    onSearch(result.topics);
    if (result.error) {
      setError(result.error);
    }
    
    setIsLoading(false);
  }, [query, onSearch]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl my-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <Icon name="search" className="w-8 h-8 text-pink-500 mr-3"/>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">AI-Powered Search</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Describe what you're looking for, and our AI will find videos tailored to your query.
        (e.g., "landscape painting tutorials", "3D modeling basics", "pottery ideas")
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for creative videos with AI..."
          className="flex-grow bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-pink-700 transition flex items-center justify-center disabled:bg-pink-800 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
import React, { useState } from 'react';
import { generateMockContent } from './services/geminiService';

const App: React.FC = () => {
  const [title, setTitle] = useState('Hello CreatiTube');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCall = async () => {
    setIsLoading(true);
    setApiResponse(null);
    const result = await generateMockContent();
    setApiResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{title}</h1>
        
        <p className="text-gray-600 mb-8">
          This is the minimal starter for CreatiTube. Click the button below to test the
          stubbed Gemini API service.
        </p>

        <button
          onClick={handleApiCall}
          disabled={isLoading}
          className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-pink-700 transition disabled:bg-pink-400 disabled:cursor-wait w-full sm:w-auto"
        >
          {isLoading ? 'Loading...' : 'Call Mock Gemini API'}
        </button>

        {apiResponse && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-left">
            <h3 className="font-semibold text-gray-700 mb-2">API Response:</h3>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {apiResponse}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

/**
 * This is a stubbed-out, safe version of the Gemini service for the minimal starter.
 * It allows the UI to function without a real API key.
 */

/**
 * Generates a mock content string, simulating an API call.
 * Checks for the API_KEY environment variable and returns a different
 * message depending on whether it's found. This function will not throw an error.
 * @returns A promise that resolves to a mock response string.
 */
export const generateMockContent = async (): Promise<string> => {
  console.log('Simulating Gemini API call...');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Returning a fallback response.");
    return "API Key not found. This is a mock response from the service.";
  }

  console.log("API_KEY found. Simulating a successful API call.");
  return "API Key is configured. Mock API call successful!";
};

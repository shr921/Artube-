import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates a list of video topics based on user interests.
 * @param interests A string describing the user's interests.
 * @returns A promise that resolves to an array of topic strings.
 */
export const getPersonalizedTopics = async (interests: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following user interests, generate a list of 5 specific and relevant creative video topics or art styles they might enjoy watching. User interests: "${interests}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topics: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "A creative video topic or art style."
              }
            }
          }
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && Array.isArray(result.topics)) {
        return result.topics;
    }

    return [];
  } catch (error) {
    console.error("Error generating personalized topics:", error);
    // Return a default set of topics on error
    return ["diy", "art", "crafting", "tutorial", "woodworking"];
  }
};


/**
 * Generates a short summary of a video based on its title and description.
 * @param title The title of the video.
 * @param description The description of the video.
 * @returns A promise that resolves to a string containing the summary.
 */
export const getVideoHighlights = async (title: string, description: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the video title "${title}" and description "${description}", generate a short, exciting summary of what the viewer can expect as a markdown bulleted list (using '*' for bullets). Start with a brief introductory sentence. Make it sound engaging for a creative audience.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating video highlights:", error);
        throw new Error("Failed to generate AI highlights.");
    }
};

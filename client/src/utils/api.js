import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

// General function to make API calls
const callGeminiAPI = async (prompt) => {
    try {
        const response = await axios.post(BASE_URL, {
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "";
    }
};

// Function to get real-time code suggestions
export const getRealTimeCodeSuggestion = (code) => 
    callGeminiAPI(`Suggest the next line of code for:\n\n${code} without Markdown formatting or explanations.`);

// Function to get AI-powered bug fixes
export const debugCode = (code, language) => 
    callGeminiAPI(`Debug the following code:\n\n${code} without Markdown formatting or explanations or \`\`\`. Make sure that the language of the code is ${language}, if not output "please choose language as <language in which the code is written>. The possible languages are Javascript, pyhton, C++, Java, HTML, CSS.`);

// Function to generate test cases for the given code
export const getTestCases = (code) => 
    callGeminiAPI(`Generate 5 test cases for the following code with input and output for the full code:\n\n${code} without Markdown formatting or explanations.`);

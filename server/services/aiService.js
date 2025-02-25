const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// AI Code Suggestion (Real-time)
exports.getRealTimeCodeSuggestion = async (code) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Suggest the next line for:\n${code}`);
        return result.response.text();
    } catch (error) {
        console.error("AI Suggestion Error:", error);
        return "Error fetching suggestion.";
    }
};

// AI Bug Fixing (Debugging)
exports.getDebugFix = async (code) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Find and fix the bug in this code:\n${code}`);
        return result.response.text();
    } catch (error) {
        console.error("AI Debugging Error:", error);
        return "Error analyzing the bug.";
    }
};

// AI Test Case Generation
exports.getInlineCodeCompletion = async (code) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Predict the next few characters of:\n${code}`);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Completion Error:", error);
        return "";
    }
};
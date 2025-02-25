const { getRealTimeCodeSuggestion, getDebugFix, getTestCases } = require("../services/aiService");

// Handle AI-powered Code Suggestion
exports.codeSuggestion = async (req, res) => {
    try {
        const { code } = req.body;
        const suggestion = await getRealTimeCodeSuggestion(code);
        res.json({ suggestion });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch code suggestion." });
    }
};

// Handle AI Debugging (Bug Fixes)
exports.debugCode = async (req, res) => {
    try {
        const { code } = req.body;
        const fix = await getDebugFix(code);
        res.json({ fix });
    } catch (error) {
        res.status(500).json({ error: "Failed to analyze the bug." });
    }
};

// Handle AI Test Case Generation
exports.generateTests = async (req, res) => {
    try {
        const { code } = req.body;
        const tests = await getTestCases(code);
        res.json({ tests });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate test cases." });
    }
};

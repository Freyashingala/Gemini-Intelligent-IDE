const express = require("express");
const { codeSuggestion, debugCode, generateTests } = require("../controllers/ideController");
const { getInlineCodeCompletion } = require("../services/aiService");

const router = express.Router();

router.post("/suggest", codeSuggestion);
router.post("/debug", debugCode);
router.post("/generate-tests", generateTests);

router.post("/autocomplete", async (req, res) => {
     try {
         const { code } = req.body;
         const suggestion = await getInlineCodeCompletion(code);
         res.json({ suggestion });
     } catch (error) {
         res.status(500).json({ error: "Failed to fetch completion." });
     }
 });

module.exports = router;

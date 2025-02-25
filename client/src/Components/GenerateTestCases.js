import React from "react";
import { getTestCases } from "../utils/api"; // Import API call

const GenerateTestCases = ({ editorRef, setTestOutput, language }) => {
    const handleGenerateTestCases = async () => {
        if (!editorRef.current) return;

        const currentCode = editorRef.current.getValue();
        console.log("Generating Tests for Code:", currentCode);

        try {
            const testCases = await getTestCases(currentCode, language);
            console.log("Generated Test Cases:", testCases);

            setTestOutput(testCases);
        } catch (error) {
            console.error("Test Case Generation failed:", error);
        }
    };

    return (
        <button onClick={handleGenerateTestCases} className="test-button">Generate Test Cases</button>
    );
};

export default GenerateTestCases;
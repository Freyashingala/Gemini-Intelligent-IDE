import React from "react";
import { debugCode } from "../utils/api"; // Import API call

const Debugger = ({ editorRef, setDebugOutput, language}) => {
    const handleDebugCode = async () => {
        if (!editorRef.current) return;

        const currentCode = editorRef.current.getValue(); // Get the code from Monaco Editor

        try {
            const fixedCode = await debugCode(currentCode, language); // AI debugging API

            setDebugOutput(fixedCode);
        } catch (error) {
            console.error("Debugging failed:", error);
        }
    };

    return (
        <div className="debugger-container">
            <button onClick={handleDebugCode}>Debug Code with Gemini</button>
            {/* <button onClick={applyFix}>Apply Fix</button> */}
        </div>
        
    );
};

export default Debugger;

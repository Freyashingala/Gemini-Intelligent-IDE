import React from "react";
import { debugCode } from "../utils/api"; // Import API call

const Debugger = ({ editorRef, setDebugOutput }) => {
    const handleDebugCode = async () => {
        if (!editorRef.current) return;

        const currentCode = editorRef.current.getValue(); // Get the code from Monaco Editor
        console.log("Original Code:", currentCode);

        try {
            const fixedCode = await debugCode(currentCode); // AI debugging API
            console.log("Debugged Code:", fixedCode);

            setDebugOutput(fixedCode);
        } catch (error) {
            console.error("Debugging failed:", error);
        }
    };

    return (
        <div className="debugger-container">
            <button onClick={handleDebugCode}>Debug Code with Gemini</button>
        </div>
    );
};

export default Debugger;

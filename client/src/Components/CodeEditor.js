import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import debounce from "lodash.debounce";
import "../css/CodeEditor.css";
import { getRealTimeCodeSuggestion } from "../utils/api";
import Debugger from "./Debugger";
import GenerateTestCases from "./GenerateTestCases";

const CodeEditor = () => {
    const [code, setCode] = useState("// Type your code here...");
    const [suggestion, setSuggestion] = useState("Type your code to get suggestions...");
    const editorRef = useRef(null);
    const [language, setLanguage] = useState("javascript");
    const [debugOutput, setDebugOutput] = useState(""); // Debugged code output
    const [testOutput, setTestOutput] = useState("");

    const suggestionRef = useRef(suggestion);
    useEffect(() => {
        suggestionRef.current = suggestion;
    }, [suggestion]);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        const debouncedFetchSuggestion = debounce(async (value) => {
            if (value.trim().length > 0) {
                const aiSuggestion = await getRealTimeCodeSuggestion(value);
                setSuggestion(aiSuggestion);
            } else {
                setSuggestion("");
            }
        }, 500);

        debouncedFetchSuggestion(code);

        return () => debouncedFetchSuggestion.cancel(); // Cleanup to prevent memory leaks
    }, [code]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        editor.onKeyDown((event) => {
            if (event.browserEvent.key === "Tab") {
                event.preventDefault();
                event.stopPropagation();

                const insertText = suggestionRef.current;

                const model = editor.getModel();
                const position = editor.getPosition();
                if (!model || !position) return;

                model.applyEdits([
                    {
                        range: new monaco.Range(
                            position.lineNumber,
                            position.column,
                            position.lineNumber,
                            position.column
                        ),
                        text: insertText,
                        forceMoveMarkers: true,
                    },
                ]);

                // Move the cursor after the inserted text
                editor.setPosition({
                    lineNumber: position.lineNumber,
                    column: position.column + insertText.length,
                });
            }
        });
    }

    return (
        <div className="code-editor-wrapper">
            <div className="editor-header">
                <h1>Gemini Intelligent IDE</h1>
                <select onChange={handleLanguageChange} value={language} className="language-selector">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                </select>
            </div>

            <div className="editor-container">
                <div className="monaco-container">
                <Editor
                    height="100%"
                    width="100%"
                    language={language}
                    // theme="vs-dark"
                    value={code}
                    onChange={setCode}
                    options={{
                        fontSize: 14,
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        tabCompletion: "off",
                    }}
                    onMount={handleEditorDidMount}
                />
                </div>

                {suggestion && (
                    <div className="suggestion-box">
                        <strong>AI Suggestion:</strong>
                        <pre>{suggestion}</pre>
                        <p>(Press <kbd>Tab</kbd> to insert)</p>
                    </div>
                )}
            </div>
            <div>
                <div className="debugger">
                        <Debugger editorRef={editorRef} setDebugOutput={setDebugOutput} />
                </div>
                <div className="debugger">
                    <GenerateTestCases editorRef={editorRef} setTestOutput={setTestOutput} language={language}/>
                </div>
            </div>
            <div className="output-container">
                <div className="output-window">
                    <h3>Debugged Code</h3>
                    <pre>{debugOutput || "Click 'Debug Code' to see results."}</pre>
                </div>
                <div className="output-window">
                    <h3>Generated Test Cases</h3>
                    <pre>{testOutput || "Click 'Generate Test Cases' to see results."}</pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;

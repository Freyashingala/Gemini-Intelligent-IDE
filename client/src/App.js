import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import Login from './Components/Login';
import Register from './Components/Register';
import CodeEditor from './Components/CodeEditor';
function App() {
  return (
    <div className="container">
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/CodeEditor' element={<CodeEditor />} />
        </Routes>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;

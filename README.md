# Gemini Intelligent IDE 

An AI-powered **Intelligent IDE** that provides **real-time code suggestions, AI-based debugging, automated test case generation, and bug-fixing capabilities** using **Monaco Editor** and Gemini AI.

---
## **Deployed Website Link:**

#### https://gemini-intelligent-ide.vercel.app/
---

## **Features**
###  **1. AI-Powered Code Suggestions**
- AI provides **real-time inline suggestions** inside Monaco Editor.
- Press `Tab` to insert the AI-generated suggestion into editor.

###  **2. AI Debugging (Bug Detection & Fixing)**
- Click **"Check Bugs"** to send the code to an AI model.
- AI detects **potential bugs and suggests fixes**.
- Click **"Apply Fix"** to automatically update your code.

###  **3. AI-Generated Test Cases**
- Click **"Generate Test Cases"** to send the code to an AI model.
- AI generates test cases for functions and classes.
- Helps in ensuring **better test coverage**.

###  **4. Multi-Language Support**
- Supports **JavaScript, Python, C++, Java, HTML, and CSS**.
- Allows switching between languages dynamically.

###  **5. Modern UI with Monaco Editor**
- Uses **Monaco Editor** (the editor behind VS Code).
- Syntax highlighting, automatic indentation, and IntelliSense.

### **6. User Authentication(Login and Registration)**
- Secure **user authentication** system with **JWT-based session management**.  
- Users can **register, log in, and manage their code snippets**.  
- Uses **MongoDB for storing user credentials**.

---

## **Tech Stacks used**
- **Frontend:** React, Monaco Editor
- **AI Integration:** Gemini API (for suggestions, debugging, and test cases)
- **Backend:** Node.js, Express.js
- **Styling:** CSS, Flexbox
- **Database:** MongoDB

---

## **How to Run the Project** 

### **1. Clone the Repository**  
To get started, clone the repository to your local machine using the following command:  
```sh
git clone https://github.com/your-repo/gemini-intelligent-ide.git
cd gemini-intelligent-ide
```  

---

### **2. Install Dependencies**  
Navigate to the project directory and install all required dependencies:  
```sh
npm install
```  
This command will install all necessary libraries, including **React, Monaco Editor, and other dependencies**.  

---

### **3. Environment Variables**  
Create a **`.env`** file in the client directory:  
```sh
REACT_APP_GOOGLE_API_KEY=your-api-key-here
REACT_APP_BACKEND_URL=http://localhost:5000
MONGO_URI=your-mongo-db-connection-string
JWT_SECRET =""
```

---

### **4. Start the Application**  
Once dependencies are installed, start the development server using:  
```sh
npm start
```  
This will launch the application, and you can access the IDE at:  
 **`http://localhost:3000/`**  

---

### **6. Build for Production**  
To create an optimized build for deployment, run:  
```sh
npm run build
```  

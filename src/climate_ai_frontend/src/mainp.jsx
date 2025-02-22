import React, { useEffect, useState } from "react";
import { climate_ai_backend } from "declarations/climate_ai_backend";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "../loginlogout/auth";

function MainApp() {
  const [response, setResponse] = useState("");
  const [user, setUser] = useState("");
  const [his, setHis] = useState([]);
  const prompt = `explain the  climate change based on the following topic ${user} and should be less than 300 words`;
  //load
  const { isAuthenticated, login, principal, logout } = useAuth();
  useEffect(() => {
    climate_ai_backend.getChatHistory().then((result) => {
      
      setHis(result[0].history);
     
    });
  });
  //welcome the user
  climate_ai_backend.registeruser().then((result) => {
   
  });

  const genAi = new GoogleGenerativeAI(
   process.env.VITE_API_KEY
  );
 
 
  const handleLogout = () => {
    alert("You have been logged out!");
    // Add your logout logic here (e.g., redirect to login page)
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();
    try {
      const model = genAi.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response;

      if (!response) {
       alert("error")
        return;
      }
      const text = response.text();
      setResponse(text);

      await climate_ai_backend.add_message(user, text).then((result) => {
       
      });

      const history = await climate_ai_backend
        .getChatHistory()
        .then((result) => {
          setHis(result[0].history);
        });
      
    
    } catch (err) {
      
    }
  };
  const handleall=(req,resp)=>{
    setResponse(resp);
    setUser(req);
  }
  return (
    <div className="">
      {!isAuthenticated ? (
        <>
          <button onClick={login} className="ce">login in</button>
        </>
      ) : (
        <>
          <div className="main-page">
            {/* Sidebar */}
            <div className="sidebar">
              <h2>Chat History</h2>
              <ul className="chat-history">
                {his.map((chat) => (
                  <li key={chat.id} className="chat-item" onClick={()=>handleall(chat.user,chat.ai)}>
                    {chat.user}
                  </li>
                ))}
              </ul>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>

            {/* Main Content */}
            <div className="main-content">
              <h1>Climate AI Chatbot</h1>
              <div className="chat-window">
                <div className="chat-messages">
                  <p className="message bot-message">
                    Hello! How can I assist you today?
                  </p>
                  {response&&(
                      <>
                        <p className="message user-message">{user}</p>
                        <p className="message user-message">{response}</p>
                      </>
                    )}
                </div>
                <div >
                  <form onSubmit={handleSubmmit} className="chat-input">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                    <button type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainApp;

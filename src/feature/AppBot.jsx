import { useState } from "react";
import    "./AppBot.css";
function AppBot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      debugger;
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });
      const text = await res.text();

    console.log(text);

    const data = JSON.parse(text);
      if (data.reply) {
        setResponse(data.reply);
      } else if (data.error) {
        setResponse("Server error: " + data.error);
      } else {
        setResponse("Unknown server response");
      }
    } catch (err) {
      setResponse("Error connecting to server");
    }
  };

  return (
    


<div className="bot-page">
  <div className="bot-container">

    <div className="bot-header">
      <h1 className="bot-title">AI Assistant</h1>
      <div className="bot-subtitle">
        Smart conversation interface
      </div>
    </div>

    <div className="chat-area">

      {/* <div className="message user"> */}
        {/* <input placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: 300 }}
      /> */}
      {/* </div> */}

      <div className="message bot">
       <pre>{response}</pre>
      </div>

    </div>

    <div className="bot-footer">
      <input
        className="bot-input"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="send-btn"onClick={sendMessage}>
        Send
      </button>
    </div>

  </div>
</div>








     

   

      
  
  );
}

export default AppBot;
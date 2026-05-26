import { useEffect, useRef, useState } from "react";
import "./FloatingChat.css";

export default function FloatingChat() {

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: "bot", text: "איך אפשר לעזור?" }
    ]);
    const [input, setInput] = useState("");

    const boxRef = useRef(null);

    async function sendMessage() {

        if (!input.trim()) return;

        const text = input;
        setInput("");

        setMessages(prev => [...prev, { type: "user", text }]);

        try {

            const res = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text })
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { type: "bot", text: data.reply }
            ]);

        } catch {

            setMessages(prev => [
                ...prev,
                { type: "bot", text: "שגיאה בחיבור לשרת" }
            ]);
        }
    }

    useEffect(() => {

        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }

    }, [messages]);

    function onKeyDown(e) {
        if (e.key === "Enter") sendMessage();
    }

    return (
        <div className="floating-chat">

            {/* כפתור פתיחה */}
            <button
                className="chat-toggle"
                onClick={() => setOpen(!open)}
            >
                AI
            </button>

            {/* חלון */}
            {
                open && (
                    <div className="chat-window">

                        <div className="chat-header">
                            <span>AI Assistant</span>
                            <button onClick={() => setOpen(false)}>×</button>
                        </div>

                        <div className="chat-body" ref={boxRef}>

                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={m.type === "bot"
                                        ? "msg bot"
                                        : "msg user"}
                                >
                                    {m.text}
                                </div>
                            ))}

                        </div>

                        <div className="chat-input">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="כתוב הודעה..."
                            />

                            <button onClick={sendMessage}>➤</button>
                        </div>

                    </div>
                )
            }

        </div>
    );
}
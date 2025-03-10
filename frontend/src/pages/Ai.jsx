import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";

const Ai = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "patient" }]);
    setInput("");

    const response = await axios.post(
      `${import.meta.env.VITE_GEMINI_API_URL}?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      { contents: [{ role: "user", parts: [{ text: input }] }] }
    );
    
    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI couldn't generate a response.";
    setMessages((prev) => [...prev, { text: aiText, sender: "ai" }]);
  };

  return (
    <div
      className="max-w-lg w-full mx-auto p-4 border rounded-lg shadow-md relative mb-4"
      style={{
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backgroundImage: `url(${assets.ai_background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        ref={chatContainerRef}
        className="h-96 overflow-y-auto p-4 border-b flex flex-col rounded-lg relative sm:h-80 md:h-96"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 my-1 max-w-xs rounded-lg text-sm ${
              msg.sender === "patient"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center gap-2 mt-2 p-2 bg-gray-100 rounded-lg relative w-full sm:flex-row flex-col">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your doubt..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Ai;

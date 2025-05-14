// App.jsx
import React, { useState } from "react";
import WeatherCard from "./WeatherCard";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    // Simulate GPT response
    const mockResponse = {
      message: "Here's the weather in New York today!",
      render: "weather_card",
      data: {
        location: "New York",
        temperature: "22°C",
        condition: "Sunny",
        icon: "sun",
        forecast: [20, 21, 22, 23, 21, 20]
      }
    };

    const botMessage = { role: "bot", content: mockResponse };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md">
        <div className="h-96 overflow-y-auto mb-4">
          {messages.map((msg, i) => (
            <div key={i} className="mb-3">
              {msg.role === "user" ? (
                <div className="text-right text-blue-600">{msg.content}</div>
              ) : (
                <div className="text-left">
                  <p>{msg.content.message}</p>
                  {msg.content.render === "weather_card" && (
                    <WeatherCard data={msg.content.data} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="flex-1 border border-gray-300 rounded-l px-3 py-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
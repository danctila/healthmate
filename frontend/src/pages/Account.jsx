import React, { useState, useRef, useEffect } from "react";

const Account = () => {
  const [wellnessType, setWellnessType] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleWellnessSelection = (type) => {
    setWellnessType(type);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `You selected: ${type}`, sender: "bot" },
    ]);
  };

  const handleSymptomInput = () => {
    const response = `I see you're looking for advice on ${wellnessType}. You mentioned: ${symptoms}.`;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: symptoms, sender: "user" },
      { text: response, sender: "bot" },
    ]);
    setSymptoms(""); // Clear the input field after submitting
  };

  const handleButtonAction = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: "Connecting you with a healthcare professional nearby...",
        sender: "bot",
      },
    ]);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-5 m-5">
      {/* Chat container with smooth scroll */}
      <div
        ref={chatContainerRef}
        className="p-4 max-h-[400px] overflow-y-auto space-y-4 bg-gray-50 rounded-lg shadow-inner"
      >
        {/* Displaying messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-4 rounded-xl text-white shadow-lg ${
                message.sender === "user"
                  ? "bg-blue-500"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input and Actions */}
      {!wellnessType && (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            Welcome to Wellness Chat
          </h1>
          <p className="text-center mb-4">Please select your wellness type:</p>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
              onClick={() => handleWellnessSelection("Mental Wellness")}
            >
              Mental Wellness
            </button>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all"
              onClick={() => handleWellnessSelection("Physical Wellness")}
            >
              Physical Wellness
            </button>
          </div>
        </div>
      )}

      {wellnessType && (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Please describe any symptoms observed:
          </h2>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm"
            placeholder="Type your symptoms here..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full shadow-lg hover:bg-blue-600 transition-all"
            onClick={handleSymptomInput}
          >
            Submit
          </button>
        </div>
      )}

      {messages.length > 0 && wellnessType && (
        <div className="p-6 mt-4">
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full shadow-lg hover:bg-yellow-600 transition-all"
            onClick={handleButtonAction}
          >
            Connect me with HCPs nearby
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;

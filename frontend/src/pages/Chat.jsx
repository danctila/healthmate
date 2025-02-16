import React, { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    // Create a WebSocket connection to the Render-hosted backend
    const socket = new WebSocket("https://healthmate-29mv.onrender.com");

    // Handle the connection opening
    socket.onopen = () => {
      console.log("Connected to WebSocket server");

      // Send a message to the server
      socket.send(JSON.stringify({ message: "Hello, server!" }));
    };

    // Handle incoming messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from server:", data);
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle WebSocket connection closure
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  return <div>Chatbot</div>;
};

export default Chat;

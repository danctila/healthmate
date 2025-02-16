// import React, { useEffect } from "react";

// const Chatbot = ({ width = "100%", height = "100%" }) => {
//   useEffect(() => {
//     // Initialize Botpress Webchat
//     const initializeBotpress = () => {
//       window.botpress?.on("webchat:ready", () => {
//         window.botpress?.open();
//       });

//       window.botpress.init({
//         botId: "a1de2a94-bd9a-4b94-ac53-6dd6adf875b2",
//         configuration: {
//           botName: "HealthMate",
//           website: {},
//           email: {
//             title: "gohealthmate@gmail.com",
//             link: "gohealthmate@gmail.com",
//           },
//           phone: {},
//           termsOfService: {},
//           privacyPolicy: {},
//           color: "#3B82F6",
//           variant: "solid",
//           themeMode: "light",
//           fontFamily: "inter",
//           radius: 1,
//           additionalStylesheetUrl:
//             "https://files.bpcontent.cloud/2025/02/16/10/20250216105359-6T1V2SEE.css",
//         },
//         clientId: "54c7b5aa-686a-4c02-943d-888a807ba774",
//         containerMountSelector: "#webchat-container",
//       });
//     };

//     // Load Botpress script if not already loaded
//     if (!window.botpress) {
//       const script = document.createElement("script");
//       script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
//       script.async = true;
//       script.onload = initializeBotpress;
//       document.body.appendChild(script);
//     } else {
//       initializeBotpress();
//     }
//   }, []);

//   return (
//     <div id="webchat-container" style={{ width: "100%", height: "100%" }} />
//   );
// };

// export default Chatbot;

import React, { useState } from "react";
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";

// Build a theme using your preferred color (using your original #3B82F6)
const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#3B82F6",
  // You can add further theme customizations here if needed.
});

// Use your Botpress Client ID (from your old code)
const clientId = "54c7b5aa-686a-4c02-943d-888a807ba774";
const client = getClient({ clientId });

// Define your webchat configuration (mirroring your original settings)
const configuration = {
  botName: "HealthMate",
  website: {},
  email: {
    title: "gohealthmate@gmail.com",
    link: "mailto:gohealthmate@gmail.com",
  },
  phone: {},
  termsOfService: {},
  privacyPolicy: {},
  // If needed, you can pass additional configuration here.
};

const Chatbot = () => {
  // Toggle to control whether the webchat is visible or hidden
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const toggleWebchat = () => setIsWebchatOpen((prev) => !prev);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Inject the generated theme styles */}
      <style>{style}</style>
      <WebchatProvider
        theme={theme}
        client={client}
        configuration={configuration}
      >
        {/* Floating Action Button (FAB) to open/close the chat */}
        <Fab onClick={toggleWebchat} />
        {/* Conditionally render the chat container */}
        <div
          style={{
            display: isWebchatOpen ? "block" : "none",
            width: "100%",
            height: "100%",
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  );
};

export default Chatbot;

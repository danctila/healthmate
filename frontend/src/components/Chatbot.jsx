import React, { useEffect } from "react";

const Chatbot = ({ width = "100%", height = "100%" }) => {
  useEffect(() => {
    const initializeBotpress = () => {
      window.botpress?.on("webchat:ready", () => {
        window.botpress?.open();
      });

      window.botpress.init({
        botId: "a1de2a94-bd9a-4b94-ac53-6dd6adf875b2",
        configuration: {
          botName: "HealthMate",
          website: {},
          email: {
            title: "gohealthmate@gmail.com",
            link: "gohealthmate@gmail.com",
          },
          phone: {},
          termsOfService: {},
          privacyPolicy: {},
          color: "#3B82F6",
          variant: "solid",
          themeMode: "light",
          fontFamily: "inter",
          radius: 1,
          additionalStylesheetUrl:
            "https://files.bpcontent.cloud/2025/02/16/10/20250216105359-6T1V2SEE.css",
        },
        clientId: "54c7b5aa-686a-4c02-943d-888a807ba774",
        containerMountSelector: "#webchat-container",
      });
    };

    if (!window.botpress) {
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      script.async = true;
      script.onload = initializeBotpress;
      document.body.appendChild(script);
    } else {
      initializeBotpress();
    }
  }, []);

  return (
    <div id="webchat-container" style={{ width: "100%", height: "100%" }} />
  );
};

export default Chatbot;

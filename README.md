# HealthMate - All-in-One Health-Related App

HealthMate is a comprehensive health application designed to provide users with a wide range of health-related services, including doctor recommendations, health issue tracking, and more. By leveraging advanced AI and machine learning technologies, the app aims to create a seamless and personalized experience for users to address their health needs.

## Features

- **Doctor Search**: Find doctors based on symptoms, health issues, care type, and location.
- **AI-Powered Doctor Matching**: Leverage OpenAI embeddings to accurately match users with doctors based on medical concerns.
- **Health Issue Tracking**: Track symptoms and medical issues over time for better diagnosis and treatment suggestions.
- **Care Type Filtering**: Narrow down doctor search results based on specific care types (e.g., specialist care, urgent care).
- **Location-based Search**: Filter doctors and facilities by location (zip code, state).
- **User-Friendly UI**: Simple and intuitive interface to help users quickly find what they need.
- **Real-time Health Information**: Get real-time health tips, news, and insights.

## Demo

[**HealthMate Demo**](#) (link to live demo or screenshot)

## Tech Stack

- **Frontend**: ReactJS, TailwindCSS, Redux (for state management)
- **Backend**: NodeJS, ExpressJS
- **Database**: MongoDB
- **AI**: OpenAI's GPT for embeddings and similarity comparison
- **Deployment**: Render (for backend deployment)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB (if running locally)
- Render account (for backend deployment)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/healthmate.git
   cd healthmate
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and set the necessary environment variables:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=mongodb://localhost:27017/healthmate
   ```

4. Run the application locally:

   ```bash
   npm run dev
   ```

   This will start both the backend and frontend locally.

5. Visit `http://localhost:3000` to see the application in action.

### Run Tests

To run tests for your application, you can use:

```bash
npm test
```

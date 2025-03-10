﻿# Gambling-App
# Gambling App


https://github.com/user-attachments/assets/b8b029ee-c408-4111-b167-64b2d33781ee


## Overview
This is a gambling app built using Vite, React, and TypeScript with Firebase authentication. The app allows users to sign in securely and participate in gambling activities without requiring a backend server.

## Features
- Firebase Authentication (Google, Email/Password, etc.)
- User-friendly UI built with React and TypeScript
- Fast and optimized performance using Vite
- Secure authentication and user session management
- Client-side logic for handling gambling mechanics

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Authentication:** Firebase Authentication
- **State Management:** React Context API (for wallet management)
- **Styling:** CSS 

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.0)
- npm or yarn

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/gambling-app.git
   cd gambling-app
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Google, Email/Password, etc.).
   - Copy your Firebase configuration and add it to an `.env` file:
     ```sh
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```
4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Usage
- Sign up or log in using Firebase authentication.
- Access the gambling features and interact with the UI.
- Your authentication state is managed automatically by Firebase.


Then, follow the deployment instructions based on your preferred platform.

## License
This project is licensed under the MIT License. Feel free to modify and distribute.

## Acknowledgments
- [Firebase](https://firebase.google.com/) for authentication services.
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for frontend development.




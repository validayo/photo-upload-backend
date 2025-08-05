# Shoot For Arts - Photography Portfolio

A modern photography portfolio website for Shoot For Arts, built with React, Vite, and Firebase.

## Features

- Responsive masonry grid layout for photo showcase
- Category filtering (Urban, Portraits, B&W, Extras)
- Lightbox viewer for full-screen photo viewing
- Admin section for secure photo uploads
- Contact form with booking functionality
- About page with photographer information
- Firebase backend for photo storage and metadata

## Tech Stack

- **Frontend:**
  - React (TypeScript)
  - Vite
  - Tailwind CSS
  - Framer Motion for animations
  - react-masonry-css for the gallery grid
  - yet-another-react-lightbox for photo previews

- **Backend:**
  - Firebase Authentication for admin access
  - Firebase Firestore for photo metadata
  - Firebase Storage for photo files

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Firebase credentials
4. Start the development server:
   ```
   npm run dev
   ```

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Add a web app to your Firebase project
3. Enable Authentication, Firestore, and Storage services
4. Set up Firestore security rules to protect your data
5. Set up Storage security rules to allow public read access but restricted write access

## Deploy

1. Build the project:
   ```
   npm run build
   ```
2. Deploy to Firebase Hosting:
   ```
   firebase deploy
   ```

## License

All rights reserved. Copyright © 2023 Shoot For Arts.
# QMR Frontend - Quran Memorization Center Management System

A modern, responsive web application for managing administrators in the Quran Memorization Center (Qomar Qur'on Markazi). Built with React, Apollo Client, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development](#development)
- [Environment Variables](#environment-variables)

## ✨ Features

- 🔐 **Authentication System** - Secure login with JWT tokens
- 👥 **Admin Management** - CRUD operations for administrators
- 🌙 **Dark Mode** - Complete dark mode support
- 🌍 **Internationalization** - Multi-language support (Uzbek, English)
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - GraphQL mutations and queries
- 🎨 **Modern UI** - Clean, minimalist design with Tailwind CSS
- ♿ **Accessible** - WCAG compliant components

## 🛠 Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Utility-first CSS framework
- **i18next** - Internationalization framework
- **React DatePicker** - Date input component
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddAdmin/        # AddAdmin modal module
│   ├── Layout.jsx       # Main layout wrapper
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── RequireAuth.jsx  # Authentication guard
│   └── ...
├── contexts/            # React Context providers
│   └── DarkModeContext.jsx
├── pages/               # Page components
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── AdminPage.jsx
│   └── ...
├── utils/               # Utility functions
│   ├── validators.js    # Form validation
│   └── checkUser.jsx
├── App.jsx              # Root component
├── ApolloClient.js      # Apollo Client setup
├── i18n.js             # i18next configuration
└── main.jsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend server running on `http://localhost:4000`

### Installation

```bash
# Clone the repository
git clone https://github.com/rasuloff789/qmr-frontend.git

# Navigate to project directory
cd qmr-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage

See [USAGE.md](./USAGE.md) for detailed usage instructions.

## 🧑‍💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style

- Use functional components with hooks
- Follow React best practices
- Write clean, readable code with comments
- Use Tailwind CSS for styling
- Follow the established file structure

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## 📝 License

This project is proprietary software.

## 👥 Authors

- **Your Team** - Initial work

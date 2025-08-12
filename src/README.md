# NixCI - Source Code Structure

This document describes the folder structure and organization of the NixCI React Native application.

## Current Folder Structure

```
src/
├── assets/           # Static assets
│   ├── images/       # Image files
│   └── fonts/        # Font files
├── components/       # Reusable components
│   ├── screen/       # Screen-specific components
│   └── ui/           # Basic UI components (Button, etc.)
├── constants/        # App constants and configuration
├── hooks/            # Custom React hooks
├── locales/          # Internationalization
│   ├── de/           # German translations
│   ├── en/           # English translations
│   └── es/           # Spanish translations
├── modals/           # Modal components
├── navigations/      # Navigation configuration
├── screens/          # Screen components
│   ├── auth/         # Authentication screens
│   └── main/         # Main app screens
├── services/         # API services and external integrations
├── store/            # State management
├── themes/           # Theme configuration
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── WelcomeScreen.tsx # Main welcome screen
```

## Current Components

### WelcomeScreen
- **Location**: `src/WelcomeScreen.tsx`
- **Purpose**: First screen with Sign In and Register buttons
- **Features**: 
  - Clean, modern design
  - Two main action buttons
  - Responsive layout

### UI Components
- **Button**: Reusable button component with primary/secondary variants
  - **Location**: `src/components/ui/Button.tsx`
  - **Features**: Customizable variants, proper styling

### Utilities
- **Validation**: Email and password validation functions
- **String utilities**: Text formatting helpers

### Types
- **User**: User data interface
- **AuthState**: Authentication state interface
- **Credentials**: Login and registration interfaces

## Getting Started

1. The app starts with the `WelcomeScreen` showing Sign In and Register buttons
2. Both buttons currently show alert dialogs when pressed
3. The structure is ready for adding more screens and functionality

## Design System

The app uses a consistent design system with:
- Primary color: #007AFF (iOS blue)
- Background: #FFFFFF
- Text colors: #000000 (primary), #8E8E93 (secondary)
- Border radius: 12px for buttons and inputs

## Next Steps

1. Add authentication screens (Login, Register)
2. Implement navigation between screens
3. Add more UI components (Input, Card, etc.)
4. Implement actual authentication logic
5. Add more screens for the main app functionality

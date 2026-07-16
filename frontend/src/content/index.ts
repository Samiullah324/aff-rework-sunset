// Centralized Content Management System
// All text content for the webapp is controlled from this file

const appName = import.meta.env.VITE_APP_NAME || 'Application'

export const content = {
  // Application Info
  app: {
    name: appName,
    tagline: 'Sign in to manage your account',
    version: '1.0.0'
  },

  // Authentication Pages
  auth: {
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account to continue',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      loginButton: 'Sign In',
      noAccount: "Don't have an account?",
      signUpLink: 'Sign up here',
      loginError: 'Invalid email or password. Please try again.'
    },
    register: {
      title: 'Create Account',
      subtitle: `Join ${appName} today`,
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      registerButton: 'Create Account',
      hasAccount: 'Already have an account?',
      signInLink: 'Sign in here',
      registerError: 'Registration failed. Please try again.',
      passwordMismatch: 'Passwords do not match'
    }
  },

  // Dashboard
  dashboard: {
    welcome: {
      title: 'Welcome back',
      subtitle: 'Your dashboard is ready when you add data'
    },
    emptyState: {
      title: 'No data yet',
      description: 'Content will appear here once your application is configured with real data sources.'
    }
  },

  // Sidebar Navigation
  sidebar: {
    menuItems: {
      dashboard: 'Dashboard',
    },
    user: {
      logout: 'Logout'
    }
  },

  // Header
  header: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
    logout: 'Logout'
  },

  // Common UI Elements
  common: {
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      submit: 'Submit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous'
    },
    messages: {
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      success: 'Operation completed successfully',
      noData: 'No data available',
      unauthorized: 'You are not authorized to access this resource',
      networkError: 'Network error. Please check your connection.'
    },
    forms: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordsNoMatch: 'Passwords do not match'
    }
  },

  // Meta Information
  meta: {
    title: appName,
    description: `${appName} — authenticated web application`,
    keywords: 'web application'
  }
} as const

// Type for content keys (for TypeScript support)
export type ContentKey = keyof typeof content
export type AuthContentKey = keyof typeof content.auth
export type DashboardContentKey = keyof typeof content.dashboard

// Helper function to get nested content
export const getContent = (path: string): string => {
  const keys = path.split('.')
  let result: unknown = content

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      console.warn(`Content path "${path}" not found`)
      return path
    }
  }

  return typeof result === 'string' ? result : path
}

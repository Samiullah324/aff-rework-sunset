// Centralized Content Management System
// All text content for the webapp is controlled from this file

export const content = {
  app: {
    name: 'App',
    tagline: 'Your application',
    version: '1.0.0'
  },

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
      subtitle: 'Create your account to get started',
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

  dashboard: {
    welcome: {
      title: 'Welcome back',
      subtitle: 'Your dashboard is ready'
    },
    emptyState: {
      message: 'No data yet'
    }
  },

  sidebar: {
    menuItems: {
      dashboard: 'Dashboard',
    },
    user: {
      logout: 'Logout'
    }
  },

  header: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
    logout: 'Logout'
  },

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

  meta: {
    title: 'App',
    description: 'Application',
    keywords: ''
  }
} as const

export type ContentKey = keyof typeof content
export type AuthContentKey = keyof typeof content.auth
export type DashboardContentKey = keyof typeof content.dashboard

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

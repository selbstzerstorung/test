// Application constants
export const APP_NAME = 'Chimigancha Bank';
export const APP_VERSION = '1.0.0';
export const COMPANY_NAME = 'Chimigancha Bank LLC';
export const SUPPORT_EMAIL = 'support@chimigancha-bank.com';
export const SUPPORT_PHONE = '+994 12 555 55 55';
export const HEADQUARTERS = 'Baku, Azerbaijan';

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        PROFILE: '/auth/profile',
    },
    CARDS: {
        LIST: '/cards',
        CREATE: '/cards',
        DETAIL: '/cards/:id',
        UPDATE: '/cards/:id',
        DELETE: '/cards/:id',
        TRANSACTIONS: '/cards/:id/transactions',
        BLOCK: '/cards/:id/block',
        LIMITS: '/cards/:id/limits',
    },
    TRANSACTIONS: {
        LIST: '/transactions',
        CREATE: '/transactions',
        DETAIL: '/transactions/:id',
        EXPORT: '/transactions/export',
    },
    PAYMENTS: {
        UTILITIES: '/payments/utilities',
        BILLS: '/payments/bills',
        TRANSFER: '/payments/transfer',
    },
    USER: {
        PROFILE: '/user/profile',
        SETTINGS: '/user/settings',
        SECURITY: '/user/security',
        NOTIFICATIONS: '/user/notifications',
    },
};

// Card types
export const CARD_TYPES = {
    DEBIT: 'debit',
    CREDIT: 'credit',
    PREMIUM: 'premium',
};

// Card systems
export const CARD_SYSTEMS = {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    AMEX: 'amex',
};

// Currencies
export const CURRENCIES = {
    AZN: { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
    USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
    RUB: { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
};

// Transaction types
export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense',
    TRANSFER: 'transfer',
    PAYMENT: 'payment',
    REFUND: 'refund',
};

// Transaction categories
export const TRANSACTION_CATEGORIES = {
    SHOPPING: 'shopping',
    FOOD: 'food',
    TRANSPORT: 'transport',
    ENTERTAINMENT: 'entertainment',
    UTILITIES: 'utilities',
    HEALTH: 'health',
    EDUCATION: 'education',
    TRAVEL: 'travel',
    SALARY: 'salary',
    INVESTMENT: 'investment',
    OTHER: 'other',
};

// Utility services
export const UTILITY_SERVICES = {
    AZERQAZ: {
        id: 'azerqaz',
        name: 'Azerqaz',
        codeLength: 9,
        regex: /^\d{9}$/,
        color: '#3B82F6',
    },
    AZERSU: {
        id: 'azersu',
        name: 'Azersu',
        codeLength: 9,
        regex: /^\d{9}$/,
        color: '#10B981',
    },
    AZERISHIQ: {
        id: 'azerishiq',
        name: 'Azerishiq',
        codeLength: 10,
        regex: /^\d{10}$/,
        color: '#F59E0B',
    },
};

// Validation messages
export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    WEAK_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
    PASSWORDS_MATCH: 'Passwords do not match',
    MIN_AMOUNT: (min) => `Minimum amount is ${min}`,
    MAX_AMOUNT: (max) => `Maximum amount is ${max}`,
    INSUFFICIENT_BALANCE: 'Insufficient balance',
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Session expired. Please log in again.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    RATE_LIMIT: 'Too many requests. Please try again later.',
    DEFAULT: 'An error occurred. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful!',
    LOGOUT: 'Logout successful!',
    CARD_CREATED: 'Card created successfully!',
    PAYMENT_SUCCESS: 'Payment completed successfully!',
    TRANSFER_SUCCESS: 'Transfer completed successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    SETTINGS_SAVED: 'Settings saved successfully!',
};

// Local storage keys
export const STORAGE_KEYS = {
    USER: 'bank_user',
    TOKENS: 'bank_tokens',
    CARDS: 'user_cards',
    THEME: 'bank_theme',
    LANGUAGE: 'bank_language',
    SETTINGS: 'user_settings',
    RECENT_TRANSACTIONS: 'recent_transactions',
};

// Date formats
export const DATE_FORMATS = {
    DISPLAY: 'DD.MM.YYYY',
    API: 'YYYY-MM-DD',
    FULL: 'DD.MM.YYYY HH:mm',
    RELATIVE: 'relative',
};

// Limits
export const LIMITS = {
    CARD: {
        MIN_BALANCE: 0,
        MAX_BALANCE: 1000000,
        DAILY_LIMIT: 5000,
        MONTHLY_LIMIT: 20000,
        MIN_CREDIT_LIMIT: 100,
        MAX_CREDIT_LIMIT: 10000,
    },
    TRANSACTION: {
        MIN_AMOUNT: 0.01,
        MAX_AMOUNT: 10000,
        DAILY_COUNT: 50,
    },
    PAYMENT: {
        MIN_AMOUNT: 0.01,
        MAX_AMOUNT: 10000,
    },
};

// Regex patterns
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+994(50|51|55|70|77)\d{7}$/,
    CARD_NUMBER: /^\d{16}$/,
    CVV: /^\d{3,4}$/,
    EXPIRY_DATE: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
    IBAN: /^AZ\d{2}[A-Z]{4}\d{20}$/,
    AZERQAZ_CODE: /^\d{9}$/,
    AZERSU_CODE: /^\d{9}$/,
    AZERISHIQ_CODE: /^\d{10}$/,
};

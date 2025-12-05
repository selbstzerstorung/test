// Format currency
export const formatCurrency = (amount, currency = 'AZN', locale = 'az-AZ') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Format card number (•••• •••• •••• 1234)
export const formatCardNumber = (cardNumber, visibleDigits = 4) => {
    if (!cardNumber) return '•••• •••• •••• ••••';

    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length < 16) return cardNumber;

    const lastDigits = cleaned.slice(-visibleDigits);
    const masked = '•••• '.repeat(3).trim();
    return `${masked} ${lastDigits}`;
};

// Format phone number (+994 XX XXX XX XX)
export const formatPhoneNumber = (phone) => {
    if (!phone) return '';

    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('994')) {
        const match = cleaned.match(/^994(\d{2})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+994 ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
        }
    }

    // Fallback to original format
    return phone;
};

// Format date (DD.MM.YYYY)
export const formatDate = (dateString, format = 'DD.MM.YYYY') => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    switch (format) {
        case 'DD.MM.YYYY':
            return `${day}.${month}.${year}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'DD.MM.YYYY HH:mm':
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        case 'relative':
            return formatRelativeDate(date);
        default:
            return date.toLocaleDateString();
    }
};

// Format relative date (Today, Yesterday, 2 days ago)
const formatRelativeDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
        }
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

    return `${Math.floor(diffDays / 365)} years ago`;
};

// Format IBAN (AZ00 XXXX XXXX XXXX XXXX XXXX XXXX)
export const formatIBAN = (iban) => {
    if (!iban) return '';

    const cleaned = iban.replace(/\s/g, '').toUpperCase();
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

// Format amount with sign (+100.00 or -50.00)
export const formatAmountWithSign = (amount, currency = 'AZN') => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${formatCurrency(Math.abs(amount), currency)}`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

// Capitalize first letter
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generate random transaction ID
export const generateTransactionId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TXN-${timestamp}-${random}`.toUpperCase();
};

// Format file size
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

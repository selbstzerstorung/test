import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
    // Get stored value or use initial value
    const readValue = useCallback(() => {
        // Prevent SSR issues
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [key, initialValue]);

    // State to store value
    const [storedValue, setStoredValue] = useState(readValue);

    // Set value in localStorage and state
    const setValue = useCallback((value) => {
        try {
            // Allow value to be a function
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Save to state
            setStoredValue(valueToStore);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));

                // Dispatch storage event to sync between tabs
                window.dispatchEvent(new StorageEvent('storage', {
                    key,
                    newValue: JSON.stringify(valueToStore)
                }));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    // Remove value from localStorage
    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);

            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
                window.dispatchEvent(new StorageEvent('storage', { key, newValue: null }));
            }
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    // Listen for changes in other tabs
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key && event.newValue !== null) {
                try {
                    const newValue = JSON.parse(event.newValue);
                    if (JSON.stringify(storedValue) !== JSON.stringify(newValue)) {
                        setStoredValue(newValue);
                    }
                } catch (error) {
                    console.warn(`Error parsing storage change for key "${key}":`, error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, storedValue]);

    // Initialize from localStorage
    useEffect(() => {
        setStoredValue(readValue());
    }, [readValue]);

    return [storedValue, setValue, removeValue];
}

// Hook for session storage
export function useSessionStorage(key, initialValue) {
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading sessionStorage key "${key}":`, error);
            return initialValue;
        }
    }, [key, initialValue]);

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting sessionStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);

            if (typeof window !== 'undefined') {
                window.sessionStorage.removeItem(key);
            }
        } catch (error) {
            console.warn(`Error removing sessionStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    useEffect(() => {
        setStoredValue(readValue());
    }, [readValue]);

    return [storedValue, setValue, removeValue];
}

// Hook for secure storage (with encryption placeholder)
export function useSecureStorage(key, initialValue) {
    const [storedValue, setStoredValue, removeValue] = useLocalStorage(key, initialValue);

    // In a real application, you would encrypt/decrypt values here
    // This is a placeholder for secure storage implementation

    const secureSetValue = useCallback((value) => {
        // TODO: Encrypt value before storing
        setStoredValue(value);
    }, [setStoredValue]);

    const secureGetValue = useCallback(() => {
        // TODO: Decrypt value after retrieving
        return storedValue;
    }, [storedValue]);

    return [secureGetValue(), secureSetValue, removeValue];
}

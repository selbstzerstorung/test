import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved preference
        const savedTheme = localStorage.getItem('bank_theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }

        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark;
    });

    const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

    // Apply theme to CSS variables
    useEffect(() => {
        const root = document.documentElement;

        // Apply theme colors as CSS variables
        Object.entries(theme).forEach(([category, values]) => {
            if (typeof values === 'object') {
                Object.entries(values).forEach(([key, value]) => {
                    root.style.setProperty(`--${category}-${key}`, value);
                });
            } else {
                root.style.setProperty(`--${category}`, values);
            }
        });

        // Apply theme class to body for global styles
        document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';

        // Save theme preference
        localStorage.setItem('bank_theme', isDarkMode ? 'dark' : 'light');
    }, [theme, isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only change if user hasn't explicitly set a preference
            if (!localStorage.getItem('bank_theme')) {
                setIsDarkMode(e.matches);
                setTheme(e.matches ? darkTheme : lightTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            setTheme(newTheme ? darkTheme : lightTheme);
            return newTheme;
        });
    }, []);

    const setThemeMode = useCallback((mode) => {
        const isDark = mode === 'dark';
        setIsDarkMode(isDark);
        setTheme(isDark ? darkTheme : lightTheme);
    }, []);

    const value = useMemo(() => ({
        isDarkMode,
        theme,
        toggleTheme,
        setThemeMode,
        currentTheme: isDarkMode ? 'dark' : 'light'
    }), [isDarkMode, theme, toggleTheme, setThemeMode]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

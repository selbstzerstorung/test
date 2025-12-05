import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { mockApi } from '../api/api.auth';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const [userCards, setUserCards] = useLocalStorage('userCards', []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const newUser = await mockApi.register(userData);
            setUser(newUser);
            setUserCards([]);
            return { success: true, user: newUser };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, [setUser, setUserCards]);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const result = await mockApi.login(email, password);
            if (result.success) {
                setUser(result.user);
                setUserCards(result.cards || []);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, [setUser, setUserCards]);

    const logout = useCallback(() => {
        setUser(null);
        setUserCards([]);
        localStorage.removeItem('currentCardId');
        mockApi.logout();
    }, [setUser, setUserCards]);

    const addCard = useCallback(async (cardData) => {
        setLoading(true);
        try {
            const newCard = await mockApi.addCard(cardData);
            const updatedCards = [...userCards, newCard];
            setUserCards(updatedCards);
            return { success: true, card: newCard };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, [userCards, setUserCards]);

    const updateCurrentCard = useCallback((cardId) => {
        localStorage.setItem('currentCardId', cardId.toString());
    }, []);

    const getCurrentCard = useCallback(() => {
        const currentCardId = localStorage.getItem('currentCardId');
        return userCards.find(card => card.id.toString() === currentCardId) || userCards[0];
    }, [userCards]);

    const value = useMemo(() => ({
        user,
        userCards,
        loading,
        error,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        addCard,
        updateCurrentCard,
        getCurrentCard,
        clearError: () => setError(null)
    }), [user, userCards, loading, error, register, login, logout, addCard, updateCurrentCard, getCurrentCard]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

import api from './api.config';

export const cardsAPI = {
    // Получить все карты пользователя
    getCards: async () => {
        try {
            return await api.get('/cards');
        } catch (error) {
            console.error('Error fetching cards:', error);
            throw error;
        }
    },

    // Добавить новую карту
    addCard: async (cardData) => {
        try {
            return await api.post('/cards', cardData);
        } catch (error) {
            console.error('Error adding card:', error);
            throw error;
        }
    },

    // Обновить карту
    updateCard: async (cardId, updates) => {
        try {
            return await api.put(`/cards/${cardId}`, updates);
        } catch (error) {
            console.error('Error updating card:', error);
            throw error;
        }
    },

    // Удалить карту
    deleteCard: async (cardId) => {
        try {
            return await api.delete(`/cards/${cardId}`);
        } catch (error) {
            console.error('Error deleting card:', error);
            throw error;
        }
    },

    // Блокировать/разблокировать карту
    toggleCardBlock: async (cardId, blocked) => {
        try {
            return await api.patch(`/cards/${cardId}/block`, { blocked });
        } catch (error) {
            console.error('Error toggling card block:', error);
            throw error;
        }
    },

    // Установить лимиты карты
    setCardLimits: async (cardId, limits) => {
        try {
            return await api.patch(`/cards/${cardId}/limits`, limits);
        } catch (error) {
            console.error('Error setting card limits:', error);
            throw error;
        }
    },

    // Получить транзакции по карте
    getCardTransactions: async (cardId, params = {}) => {
        try {
            return await api.get(`/cards/${cardId}/transactions`, { params });
        } catch (error) {
            console.error('Error fetching card transactions:', error);
            throw error;
        }
    },

    // Mock данные для разработки
    mockCards: [
        {
            id: 1,
            type: 'debit',
            system: 'visa',
            currency: 'AZN',
            number: '4242 4242 4242 4242',
            balance: 1250.50,
            limit: null,
            name: 'John Doe',
            expiryDate: '12/25',
            cvv: '123',
            isActive: true,
            isBlocked: false,
            createdAt: '2024-01-15T10:30:00Z',
            dailyLimit: 5000,
            monthlyLimit: 20000
        },
        {
            id: 2,
            type: 'credit',
            system: 'mastercard',
            currency: 'USD',
            number: '5555 5555 5555 4444',
            balance: 0,
            limit: 5000,
            name: 'John Doe',
            expiryDate: '11/26',
            cvv: '456',
            isActive: true,
            isBlocked: false,
            createdAt: '2024-02-20T14:45:00Z',
            dailyLimit: 2000,
            monthlyLimit: 5000,
            availableCredit: 5000,
            usedCredit: 0
        }
    ],

    // Mock методы для разработки
    mockGetCards: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    cards: this.mockCards
                });
            }, 500);
        });
    },

    mockAddCard: async (cardData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCard = {
                    id: Date.now(),
                    ...cardData,
                    balance: cardData.type === 'credit' ? 0 : 0,
                    isActive: true,
                    isBlocked: false,
                    createdAt: new Date().toISOString()
                };

                this.mockCards.push(newCard);

                resolve({
                    success: true,
                    card: newCard
                });
            }, 500);
        });
    }
};

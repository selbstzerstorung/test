import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext(null);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        const id = uuidv4();
        const newNotification = {
            id,
            type: notification.type || 'info',
            title: notification.title,
            message: notification.message,
            duration: notification.duration || 5000,
            autoClose: notification.autoClose !== false,
        };

        setNotifications(prev => [...prev, newNotification]);

        if (newNotification.autoClose && newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
        }

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const success = useCallback((title, message, duration = 5000) => {
        return addNotification({ type: 'success', title, message, duration });
    }, [addNotification]);

    const error = useCallback((title, message, duration = 5000) => {
        return addNotification({ type: 'error', title, message, duration });
    }, [addNotification]);

    const warning = useCallback((title, message, duration = 5000) => {
        return addNotification({ type: 'warning', title, message, duration });
    }, [addNotification]);

    const info = useCallback((title, message, duration = 5000) => {
        return addNotification({ type: 'info', title, message, duration });
    }, [addNotification]);

    const value = useMemo(() => ({
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        success,
        error,
        warning,
        info,
    }), [notifications, addNotification, removeNotification, clearNotifications, success, error, warning, info]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Компонент для отображения уведомлений
export const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotifications();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '400px',
        }}>
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    style={{
                        padding: '16px',
                        background: getNotificationColor(notification.type),
                        color: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        animation: 'slideIn 0.3s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                            {notification.title}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                            {notification.message}
                        </div>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '4px',
                            opacity: 0.7,
                        }}
                    >
                        ✕
                    </button>
                </div>
            ))}

            <style jsx="true">{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

const getNotificationColor = (type) => {
    switch (type) {
        case 'success':
            return 'var(--status-success)';
        case 'error':
            return 'var(--status-error)';
        case 'warning':
            return 'var(--status-warning)';
        case 'info':
            return 'var(--status-info)';
        default:
            return 'var(--primary-500)';
    }
};

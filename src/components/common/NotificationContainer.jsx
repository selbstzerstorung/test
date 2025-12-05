import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainerWrapper = styled.div`
  position: fixed;
  top: 90px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    left: 16px;
    right: 16px;
    max-width: none;
  }
`;

const Notification = styled.div`
  background: var(--background-card);
  border-radius: var(--borders-radius-lg);
  padding: 16px;
  box-shadow: var(--shadows-lg);
  border-left: 4px solid ${({ $type }) => {
    switch ($type) {
        case 'success': return 'var(--status-success)';
        case 'error': return 'var(--status-error)';
        case 'warning': return 'var(--status-warning)';
        case 'info': return 'var(--status-info)';
        default: return 'var(--primary-500)';
    }
}};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: ${slideIn} 0.3s ease;
  
  &.exiting {
    animation: ${slideOut} 0.3s ease;
  }
`;

const NotificationIcon = styled.div`
  color: ${({ $type }) => {
    switch ($type) {
        case 'success': return 'var(--status-success)';
        case 'error': return 'var(--status-error)';
        case 'warning': return 'var(--status-warning)';
        case 'info': return 'var(--status-info)';
        default: return 'var(--primary-500)';
    }
}};
  flex-shrink: 0;
  margin-top: 2px;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

const NotificationMessage = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px;
  margin: -4px -4px -4px 0;
  border-radius: var(--borders-radius-sm);
  flex-shrink: 0;
  
  &:hover {
    background: var(--background-secondary);
    color: var(--text-primary);
  }
`;

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const id = Date.now();
        const newNotification = {
            id,
            type: notification.type || 'info',
            title: notification.title,
            message: notification.message,
            duration: notification.duration || 5000,
        };

        setNotifications(prev => [...prev, newNotification]);

        return id;
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const success = (title, message, duration) => {
        return addNotification({ type: 'success', title, message, duration });
    };

    const error = (title, message, duration) => {
        return addNotification({ type: 'error', title, message, duration });
    };

    const warning = (title, message, duration) => {
        return addNotification({ type: 'warning', title, message, duration });
    };

    const info = (title, message, duration) => {
        return addNotification({ type: 'info', title, message, duration });
    };

    return {
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info,
    };
};

const NotificationContainer = () => {
    const [notifications, setNotifications] = useState([]);
    const [exiting, setExiting] = useState({});

    // Get notifications from context or hook
    // This is a simplified version - you would connect to your notification context

    useEffect(() => {
        // This would come from a notification context
        const mockNotifications = [];
        setNotifications(mockNotifications);
    }, []);

    const handleClose = (id) => {
        setExiting(prev => ({ ...prev, [id]: true }));

        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
            setExiting(prev => {
                const newExiting = { ...prev };
                delete newExiting[id];
                return newExiting;
            });
        }, 300);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <AlertCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            case 'info':
            default:
                return <Info size={20} />;
        }
    };

    if (notifications.length === 0) {
        return null;
    }

    return (
        <NotificationContainerWrapper>
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    $type={notification.type}
                    className={exiting[notification.id] ? 'exiting' : ''}
                >
                    <NotificationIcon $type={notification.type}>
                        {getIcon(notification.type)}
                    </NotificationIcon>
                    <NotificationContent>
                        <NotificationTitle>
                            {notification.title}
                        </NotificationTitle>
                        <NotificationMessage>
                            {notification.message}
                        </NotificationMessage>
                    </NotificationContent>
                    <CloseButton onClick={() => handleClose(notification.id)}>
                        <X size={18} />
                    </CloseButton>
                </Notification>
            ))}
        </NotificationContainerWrapper>
    );
};

export { useNotifications };
export default NotificationContainer;

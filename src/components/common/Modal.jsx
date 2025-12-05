import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { X } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.background.card};
  border-radius: 24px;
  width: 100%;
  max-width: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '400px';
        case 'lg': return '800px';
        default: return '600px';
    }
}};
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.borders.color};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.text.primary};
  }
`;

const ModalContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px;
  }
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid ${({ theme }) => theme.borders.color};
  display: flex;
  justify-content: ${({ $align }) => $align};
  gap: 12px;
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px;
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   footer,
                   size = 'md',
                   closeOnOverlayClick = true,
                   showCloseButton = true,
                   footerAlign = 'flex-end',
                   className,
                   style
               }) => {
    // Закрытие на Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContainer $size={size} className={className} style={style}>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    {showCloseButton && (
                        <ModalCloseButton onClick={onClose} aria-label="Close modal">
                            <X size={24} />
                        </ModalCloseButton>
                    )}
                </ModalHeader>

                <ModalContent>
                    {children}
                </ModalContent>

                {footer && (
                    <ModalFooter $align={footerAlign}>
                        {footer}
                    </ModalFooter>
                )}
            </ModalContainer>
        </ModalOverlay>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    closeOnOverlayClick: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    footerAlign: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
    className: PropTypes.string,
    style: PropTypes.object
};

export default Modal;

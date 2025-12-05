import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ $fullscreen }) => $fullscreen ? '100vh' : '200px'};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ $overlay, theme }) =>
    $overlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  position: ${({ $overlay }) => $overlay ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ $overlay }) => $overlay ? 1000 : 'auto'};
`;

const Spinner = styled.div`
  width: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '24px';
        case 'lg': return '60px';
        default: return '40px';
    }
}};
  height: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '24px';
        case 'lg': return '60px';
        default: return '40px';
    }
}};
  border: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '2px';
        case 'lg': return '4px';
        default: return '3px';
    }
}} solid var(--background-secondary);
  border-top: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '2px';
        case 'lg': return '4px';
        default: return '3px';
    }
}} solid var(--primary-500);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  color: var(--text-secondary);
  font-size: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '0.875rem';
        case 'lg': return '1.125rem';
        default: return '1rem';
    }
}};
  text-align: center;
  max-width: 300px;
`;

const Dots = styled.span`
  &::after {
    content: '';
    animation: ellipsis 1.5s infinite;
  }

  @keyframes ellipsis {
    0% { content: ''; }
    33% { content: '.'; }
    66% { content: '..'; }
    100% { content: '...'; }
  }
`;

const LoadingSpinner = ({
                            size = 'md',
                            text = 'Loading',
                            fullscreen = false,
                            overlay = false
                        }) => {
    return (
        <LoadingContainer $fullscreen={fullscreen} $overlay={overlay}>
            <Spinner $size={size} />
            {text && (
                <LoadingText $size={size}>
                    {text}
                    <Dots />
                </LoadingText>
            )}
        </LoadingContainer>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    text: PropTypes.string,
    fullscreen: PropTypes.bool,
    overlay: PropTypes.bool
};

export default LoadingSpinner;

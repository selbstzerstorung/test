import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Loader } from 'lucide-react';

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ $size, theme }) => {
    switch ($size) {
        case 'sm': return `${theme.spacing.sm} ${theme.spacing.md}`;
        case 'lg': return `${theme.spacing.lg} ${theme.spacing.xl}`;
        default: return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
}};
  font-size: ${({ $size }) => {
    switch ($size) {
        case 'sm': return '0.875rem';
        case 'lg': return '1.125rem';
        default: return '1rem';
    }
}};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borders.radius.md};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  ${({ $variant, theme }) => {
    switch ($variant) {
        case 'secondary':
            return css`
          background: ${theme.background.secondary};
          color: ${theme.text.primary};
          border: 2px solid ${theme.borders.color};
          
          &:hover:not(:disabled) {
            background: ${theme.background.tertiary};
            border-color: ${theme.primary[300]};
          }
        `;
        case 'ghost':
            return css`
          background: transparent;
          color: ${theme.text.primary};
          border: 2px solid transparent;
          
          &:hover:not(:disabled) {
            background: ${theme.background.secondary};
          }
        `;
        case 'danger':
            return css`
          background: ${theme.status.error};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${theme.status.error}dd;
          }
        `;
        default:
            return css`
          background: ${theme.primary[500]};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${theme.primary[600]};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
    }
}}
  
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  ${({ $rounded }) => $rounded && css`
    border-radius: 9999px;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:focus:not(:disabled)::after {
    animation: ripple 1s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
`;

const Spinner = styled(Loader)`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({
                    children,
                    variant = 'primary',
                    size = 'md',
                    loading = false,
                    disabled = false,
                    fullWidth = false,
                    rounded = false,
                    icon,
                    iconPosition = 'left',
                    onClick,
                    type = 'button',
                    className,
                    style
                }) => {
    return (
        <ButtonWrapper
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            $rounded={rounded}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            className={className}
            style={style}
        >
            {loading ? (
                <Spinner size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <IconWrapper>{icon}</IconWrapper>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <IconWrapper>{icon}</IconWrapper>
                    )}
                </>
            )}
        </ButtonWrapper>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    rounded: PropTypes.bool,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

export default Button;

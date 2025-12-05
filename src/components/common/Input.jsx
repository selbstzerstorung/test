import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 4px;
  
  ${({ $required }) => $required && `
    &::after {
      content: '*';
      color: var(--status-error);
      margin-left: 2px;
    }
  `}
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ $hasIcon, $hasRightIcon }) => {
    let padding = '12px 16px';
    if ($hasIcon) padding = '12px 16px 12px 48px';
    if ($hasRightIcon) padding = '12px 48px 12px 16px';
    if ($hasIcon && $hasRightIcon) padding = '12px 48px 12px 48px';
    return padding;
}};
  border: 2px solid ${({ theme, $error, $success }) => {
    if ($error) return theme.status.error;
    if ($success) return theme.status.success;
    return theme.borders.color;
}};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  font-size: 1rem;
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary[100]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${({ theme }) => theme.background.secondary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text.tertiary};
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const RightIconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text.tertiary};
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.tertiary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: ${({ theme, $error, $success }) => {
    if ($error) return theme.status.error;
    if ($success) return theme.status.success;
    return theme.text.secondary;
}};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ErrorIcon = styled(AlertCircle)`
  color: ${({ theme }) => theme.status.error};
  flex-shrink: 0;
`;

const SuccessIcon = styled(CheckCircle)`
  color: ${({ theme }) => theme.status.success};
  flex-shrink: 0;
`;

const Input = forwardRef(({
                              label,
                              name,
                              type = 'text',
                              value,
                              onChange,
                              onBlur,
                              placeholder,
                              required = false,
                              disabled = false,
                              error,
                              success,
                              helperText,
                              icon,
                              showPasswordToggle = false,
                              className,
                              style,
                              ...props
                          }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle && type === 'password'
        ? (showPassword ? 'text' : 'password')
        : type;

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <InputContainer className={className} style={style}>
            {label && (
                <Label htmlFor={name} $required={required}>
                    {label}
                </Label>
            )}

            <InputWrapper>
                {icon && <IconWrapper>{icon}</IconWrapper>}

                <StyledInput
                    ref={ref}
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    $error={!!error}
                    $success={!!success}
                    $hasIcon={!!icon}
                    $hasRightIcon={showPasswordToggle && type === 'password'}
                    {...props}
                />

                {showPasswordToggle && type === 'password' && (
                    <RightIconWrapper>
                        <ToggleButton
                            type="button"
                            onClick={handleTogglePassword}
                            disabled={disabled}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </ToggleButton>
                    </RightIconWrapper>
                )}
            </InputWrapper>

            {(error || success || helperText) && (
                <HelperText $error={!!error} $success={!!success}>
                    {error && <ErrorIcon size={14} />}
                    {success && <SuccessIcon size={14} />}
                    {error || success || helperText}
                </HelperText>
            )}
        </InputContainer>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.string,
    helperText: PropTypes.string,
    icon: PropTypes.element,
    showPasswordToggle: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

export default Input;

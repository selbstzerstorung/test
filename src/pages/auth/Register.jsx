import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail, isStrongPassword, isValidPhone } from '../../utils/validators';
import styled, { keyframes } from 'styled-components';
import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    Briefcase,
    Check,
    X,
    AlertCircle
} from 'lucide-react';

// Animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const progress = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

// Styled Components
const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 40px;
  background: ${({ theme }) => theme.background.secondary};
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 800px;
  background: ${({ theme }) => theme.background.card};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  animation: ${({ $error }) => $error ? shake : 'none'} 0.5s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const LeftPanel = styled.div`
  padding: 48px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[500]}, 
    ${({ theme }) => theme.secondary[500]}
  );
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 32px;
  }
`;

const RightPanel = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 32px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  font-size: 1.5rem;
  font-weight: 700;
`;

const PanelTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const PanelSubtitle = styled.p`
  opacity: 0.9;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  font-size: 0.875rem;
  
  span {
    color: ${({ theme }) => theme.status.error};
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text.tertiary};
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid ${({ theme, $error, $success }) =>
    $error ? theme.status.error :
        $success ? theme.status.success :
            theme.borders.color};
  border-radius: 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary[100]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.tertiary};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.borders.color};
  background: ${({ theme }) => theme.background.primary};
  cursor: pointer;
  
  &:checked {
    background: ${({ theme }) => theme.primary[500]};
    border-color: ${({ theme }) => theme.primary[500]};
  }
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  user-select: none;
`;

const PasswordStrength = styled.div`
  margin-top: 8px;
`;

const StrengthBar = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const StrengthFill = styled.div`
  height: 100%;
  width: ${({ $strength }) => $strength}%;
  background: ${({ theme, $strength }) => {
    if ($strength < 30) return theme.status.error;
    if ($strength < 70) return theme.status.warning;
    return theme.status.success;
}};
  border-radius: 2px;
  animation: ${progress} 0.5s ease;
`;

const StrengthText = styled.div`
  font-size: 0.75rem;
  color: ${({ theme, $strength }) => {
    if ($strength < 30) return theme.status.error;
    if ($strength < 70) return theme.status.warning;
    return theme.status.success;
}};
  text-align: right;
`;

const ValidationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const ValidationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: ${({ theme, $valid }) =>
    $valid ? theme.status.success : theme.text.secondary};
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.status.error}20;
  border: 1px solid ${({ theme }) => theme.status.error};
  border-radius: 8px;
  color: ${({ theme }) => theme.status.error};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.primary[500]};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 0.875rem;
  
  a {
    color: ${({ theme }) => theme.primary[500]};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.background.secondary};
    z-index: 1;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, $active, $completed }) =>
    $completed ? theme.primary[500] :
        $active ? theme.primary[100] :
            theme.background.secondary};
  color: ${({ theme, $active, $completed }) =>
    $completed ? 'white' :
        $active ? theme.primary[500] :
            theme.text.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 8px;
  border: 2px solid ${({ theme, $active, $completed }) =>
    $completed ? theme.primary[500] :
        $active ? theme.primary[300] :
            theme.borders.color};
`;

const StepLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme, $active, $completed }) =>
    $active || $completed ? theme.text.primary : theme.text.tertiary};
  font-weight: ${({ $active, $completed }) =>
    $active || $completed ? 600 : 400};
`;

const Register = () => {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '+994',
        employment: false,
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handlePhoneChange = (e) => {
        let value = e.target.value;
        if (!value.startsWith('+994')) {
            value = '+994' + value.replace(/[^0-9]/g, '');
        } else {
            value = '+994' + value.substring(4).replace(/[^0-9]/g, '');
        }

        if (value.length <= 13) {
            setFormData(prev => ({ ...prev, phone: value }));

            // Clear phone error if format is correct
            if (isValidPhone(value)) {
                setFormErrors(prev => ({ ...prev, phone: undefined }));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }

        // Validate password strength in real-time
        if (name === 'password') {
            const strength = isStrongPassword(value);
            if (!strength.isValid && value.length > 0) {
                setFormErrors(prev => ({
                    ...prev,
                    password: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
                }));
            } else if (formErrors.password) {
                setFormErrors(prev => ({ ...prev, password: undefined }));
            }
        }

        // Validate confirm password
        if (name === 'confirmPassword' && value !== formData.password && value.length > 0) {
            setFormErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        } else if (formErrors.confirmPassword && value === formData.password) {
            setFormErrors(prev => ({ ...prev, confirmPassword: undefined }));
        }
    };

    const validateStep = (stepNumber) => {
        const errors = {};

        if (stepNumber === 1) {
            if (!formData.name.trim()) errors.name = 'Name is required';
            if (!formData.surname.trim()) errors.surname = 'Surname is required';
            if (!formData.email.trim()) {
                errors.email = 'Email is required';
            } else if (!isValidEmail(formData.email)) {
                errors.email = 'Please enter a valid email';
            }
            if (!formData.phone || formData.phone.length < 13) {
                errors.phone = 'Please enter a valid phone number';
            } else if (!isValidPhone(formData.phone)) {
                errors.phone = 'Please enter a valid Azerbaijani phone number';
            }
        }

        if (stepNumber === 2) {
            const passwordStrength = isStrongPassword(formData.password);
            if (!formData.password) {
                errors.password = 'Password is required';
            } else if (!passwordStrength.isValid) {
                errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
            }

            if (!formData.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        return errors;
    };

    const nextStep = () => {
        const errors = validateStep(step);
        if (Object.keys(errors).length === 0) {
            setStep(prev => Math.min(prev + 1, 3));
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
        setFormErrors({});
    };

    const calculatePasswordStrength = (password) => {
        if (!password) return 0;

        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;

        return strength;
    };

    const getStrengthText = (strength) => {
        if (strength < 30) return 'Weak';
        if (strength < 70) return 'Moderate';
        return 'Strong';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateStep(step);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const result = await register(formData);

        if (result.success) {
            navigate('/dashboard');
        }
    };

    const passwordStrength = calculatePasswordStrength(formData.password);
    const strengthText = getStrengthText(passwordStrength);

    return (
        <RegisterContainer>
            <RegisterCard $error={Object.keys(formErrors).length > 0}>
                <LeftPanel>
                    <Logo>
                        <Briefcase size={32} />
                        Chimigancha Bank
                    </Logo>
                    <PanelTitle>
                        Start Your Financial Journey
                    </PanelTitle>
                    <PanelSubtitle>
                        Join over 500,000 customers who trust us with their finances.
                        Get your first card in minutes with our streamlined registration process.
                    </PanelSubtitle>

                    <BenefitsList>
                        <BenefitItem>
                            <Check size={16} />
                            Instant account opening
                        </BenefitItem>
                        <BenefitItem>
                            <Check size={16} />
                            Free debit card with cashback
                        </BenefitItem>
                        <BenefitItem>
                            <Check size={16} />
                            24/7 customer support
                        </BenefitItem>
                        <BenefitItem>
                            <Check size={16} />
                            Military-grade security
                        </BenefitItem>
                        <BenefitItem>
                            <Check size={16} />
                            Competitive exchange rates
                        </BenefitItem>
                    </BenefitsList>
                </LeftPanel>

                <RightPanel>
                    <ProgressIndicator>
                        <Step>
                            <StepCircle $active={step >= 1} $completed={step > 1}>
                                {step > 1 ? <Check size={16} /> : '1'}
                            </StepCircle>
                            <StepLabel $active={step >= 1} $completed={step > 1}>
                                Personal Info
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepCircle $active={step >= 2} $completed={step > 2}>
                                {step > 2 ? <Check size={16} /> : '2'}
                            </StepCircle>
                            <StepLabel $active={step >= 2} $completed={step > 2}>
                                Security
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepCircle $active={step >= 3} $completed={false}>
                                3
                            </StepCircle>
                            <StepLabel $active={step >= 3}>
                                Review
                            </StepLabel>
                        </Step>
                    </ProgressIndicator>

                    {error && (
                        <ErrorMessage>
                            <AlertCircle size={16} />
                            {error}
                        </ErrorMessage>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <FormRow>
                                    <InputGroup>
                                        <InputLabel>
                                            First Name <span>*</span>
                                        </InputLabel>
                                        <InputWrapper>
                                            <InputIcon>
                                                <User size={18} />
                                            </InputIcon>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your first name"
                                                $error={!!formErrors.name}
                                                $success={formData.name && !formErrors.name}
                                                disabled={loading}
                                            />
                                        </InputWrapper>
                                    </InputGroup>

                                    <InputGroup>
                                        <InputLabel>
                                            Last Name <span>*</span>
                                        </InputLabel>
                                        <InputWrapper>
                                            <InputIcon>
                                                <User size={18} />
                                            </InputIcon>
                                            <Input
                                                type="text"
                                                name="surname"
                                                value={formData.surname}
                                                onChange={handleChange}
                                                placeholder="Enter your last name"
                                                $error={!!formErrors.surname}
                                                $success={formData.surname && !formErrors.surname}
                                                disabled={loading}
                                            />
                                        </InputWrapper>
                                    </InputGroup>
                                </FormRow>

                                <InputGroup>
                                    <InputLabel>
                                        Email Address <span>*</span>
                                    </InputLabel>
                                    <InputWrapper>
                                        <InputIcon>
                                            <Mail size={18} />
                                        </InputIcon>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email address"
                                            $error={!!formErrors.email}
                                            $success={formData.email && !formErrors.email && isValidEmail(formData.email)}
                                            disabled={loading}
                                        />
                                    </InputWrapper>
                                </InputGroup>

                                <InputGroup>
                                    <InputLabel>
                                        Phone Number <span>*</span>
                                    </InputLabel>
                                    <InputWrapper>
                                        <InputIcon>
                                            <Phone size={18} />
                                        </InputIcon>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            placeholder="+994 ___ ___ __ __"
                                            $error={!!formErrors.phone}
                                            $success={formData.phone && !formErrors.phone && isValidPhone(formData.phone)}
                                            disabled={loading}
                                            maxLength="13"
                                        />
                                    </InputWrapper>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--text-tertiary)',
                                        marginTop: '4px'
                                    }}>
                                        Format: +994 XX XXX XX XX
                                    </div>
                                </InputGroup>

                                <CheckboxContainer>
                                    <Checkbox
                                        type="checkbox"
                                        id="employment"
                                        name="employment"
                                        checked={formData.employment}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <CheckboxLabel htmlFor="employment">
                                        I am currently employed (required for credit card eligibility)
                                    </CheckboxLabel>
                                </CheckboxContainer>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <InputGroup>
                                    <InputLabel>
                                        Password <span>*</span>
                                    </InputLabel>
                                    <InputWrapper>
                                        <InputIcon>
                                            <Lock size={18} />
                                        </InputIcon>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a strong password"
                                            $error={!!formErrors.password}
                                            $success={formData.password && !formErrors.password}
                                            disabled={loading}
                                        />
                                        <ToggleButton
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={loading}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </ToggleButton>
                                    </InputWrapper>

                                    {formData.password && (
                                        <PasswordStrength>
                                            <StrengthBar>
                                                <StrengthFill $strength={passwordStrength} />
                                            </StrengthBar>
                                            <StrengthText $strength={passwordStrength}>
                                                {strengthText}
                                            </StrengthText>

                                            <ValidationList>
                                                <ValidationItem $valid={formData.password.length >= 8}>
                                                    {formData.password.length >= 8 ? <Check size={12} /> : <X size={12} />}
                                                    At least 8 characters
                                                </ValidationItem>
                                                <ValidationItem $valid={/[A-Z]/.test(formData.password)}>
                                                    {/[A-Z]/.test(formData.password) ? <Check size={12} /> : <X size={12} />}
                                                    Uppercase letter
                                                </ValidationItem>
                                                <ValidationItem $valid={/[a-z]/.test(formData.password)}>
                                                    {/[a-z]/.test(formData.password) ? <Check size={12} /> : <X size={12} />}
                                                    Lowercase letter
                                                </ValidationItem>
                                                <ValidationItem $valid={/\d/.test(formData.password)}>
                                                    {/\d/.test(formData.password) ? <Check size={12} /> : <X size={12} />}
                                                    Number
                                                </ValidationItem>
                                            </ValidationList>
                                        </PasswordStrength>
                                    )}
                                </InputGroup>

                                <InputGroup>
                                    <InputLabel>
                                        Confirm Password <span>*</span>
                                    </InputLabel>
                                    <InputWrapper>
                                        <InputIcon>
                                            <Lock size={18} />
                                        </InputIcon>
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            $error={!!formErrors.confirmPassword}
                                            $success={formData.confirmPassword && !formErrors.confirmPassword && formData.password === formData.confirmPassword}
                                            disabled={loading}
                                        />
                                        <ToggleButton
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={loading}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </ToggleButton>
                                    </InputWrapper>
                                </InputGroup>
                            </>
                        )}

                        {step === 3 && (
                            <div style={{ padding: '16px 0' }}>
                                <div style={{
                                    background: 'var(--background-secondary)',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    marginBottom: '24px'
                                }}>
                                    <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
                                        Review Your Information
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Name:</span>
                                            <span style={{ fontWeight: 600 }}>
                        {formData.name} {formData.surname}
                      </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Email:</span>
                                            <span style={{ fontWeight: 600 }}>{formData.email}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Phone:</span>
                                            <span style={{ fontWeight: 600 }}>{formData.phone}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Employment Status:</span>
                                            <span style={{
                                                fontWeight: 600,
                                                color: formData.employment ? 'var(--success)' : 'var(--warning)'
                                            }}>
                        {formData.employment ? 'Employed' : 'Not Employed'}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
                                </div>
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginTop: '24px'
                        }}>
                            {step > 1 && (
                                <SubmitButton
                                    type="button"
                                    onClick={prevStep}
                                    disabled={loading}
                                    style={{
                                        background: 'transparent',
                                        color: 'var(--text-primary)',
                                        border: '2px solid var(--borders-color)'
                                    }}
                                >
                                    Back
                                </SubmitButton>
                            )}

                            {step < 3 ? (
                                <SubmitButton
                                    type="button"
                                    onClick={nextStep}
                                    disabled={loading}
                                    style={{ flex: 1 }}
                                >
                                    Continue
                                </SubmitButton>
                            ) : (
                                <SubmitButton
                                    type="submit"
                                    disabled={loading}
                                    style={{ flex: 1 }}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </SubmitButton>
                            )}
                        </div>
                    </Form>

                    <LoginLink>
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </LoginLink>
                </RightPanel>
            </RegisterCard>
        </RegisterContainer>
    );
};

export default Register;

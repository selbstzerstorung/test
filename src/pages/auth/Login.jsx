import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail } from '../../utils/validators';
import styled, { keyframes } from 'styled-components';
import {
    Lock,
    Mail,
    Eye,
    EyeOff,
    LogIn,
    AlertCircle,
    CreditCard,
    Shield,
    Zap,
    ChevronRight
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 40px;
  background: ${({ theme }) => theme.background.secondary};
`;

const LoginWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.6s ease;
`;

const LoginCard = styled.div`
  background: ${({ theme }) => theme.background.card};
  border-radius: 24px;
  padding: 48px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.primary[500]};
  font-size: 1.5rem;
  font-weight: 700;
  
  svg {
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text.primary};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  border: 2px solid ${({ theme, $error }) =>
    $error ? theme.status.error : theme.borders.color};
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
  margin-top: 8px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
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

const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 16px;
  
  a {
    color: ${({ theme }) => theme.primary[500]};
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  color: ${({ theme }) => theme.text.tertiary};
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.borders.color};
  }
  
  span {
    padding: 0 16px;
    font-size: 0.875rem;
  }
`;

const RegisterPrompt = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 0.875rem;
  
  a {
    color: ${({ theme }) => theme.primary[500]};
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.borders.color};
`;

const Benefit = styled.div`
  text-align: center;
  padding: 16px;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 12px;
`;

const BenefitIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  background: ${({ theme }) => theme.primary[100]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary[500]};
`;

const BenefitText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
`;

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setValidationError('');
    };

    const validateForm = () => {
        if (!formData.email) {
            setValidationError('Email is required');
            return false;
        }

        if (!isValidEmail(formData.email)) {
            setValidationError('Please enter a valid email address');
            return false;
        }

        if (!formData.password) {
            setValidationError('Password is required');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/dashboard');
        }
    };

    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginCard>
                    <Logo>
                        <CreditCard size={32} />
                        Chimigancha Bank
                    </Logo>

                    <Title>Welcome Back</Title>
                    <Subtitle>
                        Login to manage your cards, make payments, and track your finances
                    </Subtitle>

                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <InputLabel>Email Address</InputLabel>
                            <InputWrapper>
                                <InputIcon>
                                    <Mail size={20} />
                                </InputIcon>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    disabled={loading}
                                    $error={!!validationError}
                                    required
                                />
                            </InputWrapper>
                        </InputGroup>

                        <InputGroup>
                            <InputLabel>Password</InputLabel>
                            <InputWrapper>
                                <InputIcon>
                                    <Lock size={20} />
                                </InputIcon>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    disabled={loading}
                                    $error={!!validationError}
                                    required
                                />
                                <ToggleButton
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </ToggleButton>
                            </InputWrapper>
                        </InputGroup>

                        {(validationError || error) && (
                            <ErrorMessage>
                                <AlertCircle size={16} />
                                {validationError || error}
                            </ErrorMessage>
                        )}

                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                            <LogIn size={20} />
                        </SubmitButton>
                    </Form>

                    <ForgotPassword>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </ForgotPassword>

                    <Divider>
                        <span>or</span>
                    </Divider>

                    <RegisterPrompt>
                        Don't have an account?{' '}
                        <Link to="/register">
                            Create account
                            <ChevronRight size={16} />
                        </Link>
                    </RegisterPrompt>

                    <Benefits>
                        <Benefit>
                            <BenefitIcon>
                                <Shield size={24} />
                            </BenefitIcon>
                            <BenefitText>Bank-level security</BenefitText>
                        </Benefit>
                        <Benefit>
                            <BenefitIcon>
                                <Zap size={24} />
                            </BenefitIcon>
                            <BenefitText>Instant transfers</BenefitText>
                        </Benefit>
                        <Benefit>
                            <BenefitIcon>
                                <CreditCard size={24} />
                            </BenefitIcon>
                            <BenefitText>Free debit card</BenefitText>
                        </Benefit>
                    </Benefits>
                </LoginCard>
            </LoginWrapper>
        </LoginContainer>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled, { keyframes } from 'styled-components';
import {
    CreditCard,
    DollarSign,
    TrendingUp,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    Zap,
    Percent,
    Globe,
    Smartphone
} from 'lucide-react';

// Animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled Components
const AddCardContainer = styled.div`
  padding: 100px 24px 40px;
  background: ${({ theme }) => theme.background.secondary};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${slideIn} 0.6s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[500]}, 
    ${({ theme }) => theme.secondary[500]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.background.card};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const PreviewCard = styled.div`
  background: linear-gradient(135deg, 
    ${({ theme, $type }) =>
    $type === 'credit'
        ? 'linear-gradient(135deg, #667eea, #764ba2)'
        : 'linear-gradient(135deg, #f093fb, #f5576c)'};
  border-radius: 24px;
  padding: 32px;
  color: white;
  position: sticky;
  top: 100px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.3;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 16px;
  border: 2px solid ${({ theme, $error }) =>
    $error ? theme.status.error : theme.borders.color};
  border-radius: 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.2s;
  cursor: pointer;
  
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

const Option = styled.option`
  padding: 16px;
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
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

const CreditInfo = styled.div`
  background: ${({ theme }) => theme.primary[50]};
  border: 2px solid ${({ theme }) => theme.primary[200]};
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
  animation: ${slideIn} 0.3s ease;
`;

const CreditInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary[600]};
`;

const CreditInfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ theme, $variant }) =>
    $variant === 'secondary'
        ? theme.background.secondary
        : theme.primary[500]};
  color: ${({ theme, $variant }) =>
    $variant === 'secondary'
        ? theme.text.primary
        : 'white'};
  border: ${({ theme, $variant }) =>
    $variant === 'secondary'
        ? `2px solid ${theme.borders.color}`
        : 'none'};
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
    background: ${({ theme, $variant }) =>
    $variant === 'secondary'
        ? theme.background.tertiary
        : theme.primary[600]};
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

const ResultCard = styled.div`
  background: ${({ theme, $type }) =>
    $type === 'approved'
        ? theme.status.success + '20'
        : $type === 'adjusted'
            ? theme.status.warning + '20'
            : theme.status.error + '20'};
  border: 2px solid ${({ theme, $type }) =>
    $type === 'approved'
        ? theme.status.success
        : $type === 'adjusted'
            ? theme.status.warning
            : theme.status.error};
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: ${slideIn} 0.3s ease;
`;

const ResultIcon = styled.div`
  color: ${({ theme, $type }) =>
    $type === 'approved'
        ? theme.status.success
        : $type === 'adjusted'
            ? theme.status.warning
            : theme.status.error};
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme, $type }) =>
    $type === 'approved'
        ? theme.status.success
        : $type === 'adjusted'
            ? theme.status.warning
            : theme.status.error};
`;

const ResultDescription = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
`;

const CardChip = styled.div`
  width: 60px;
  height: 45px;
  background: linear-gradient(45deg, gold, #ffd700);
  border-radius: 8px;
  margin-bottom: 24px;
`;

const CardNumber = styled.div`
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-bottom: 24px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
`;

const CardHolder = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const CardType = styled.div`
  font-size: 0.875rem;
  background: rgba(255,255,255,0.2);
  padding: 4px 12px;
  border-radius: 12px;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.9);
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const AddCard = () => {
    const navigate = useNavigate();
    const { user, addCard, loading } = useAuth();

    const [cardType, setCardType] = useState('debit');
    const [paymentSystem, setPaymentSystem] = useState('visa');
    const [currency, setCurrency] = useState('AZN');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [desiredLimit, setDesiredLimit] = useState('');
    const [creditResult, setCreditResult] = useState(null);
    const [approvedLimit, setApprovedLimit] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const validateCreditInfo = () => {
        const newErrors = {};

        if (cardType === 'credit') {
            const income = parseFloat(monthlyIncome);
            const limit = parseFloat(desiredLimit);

            if (!income || income <= 0) {
                newErrors.monthlyIncome = 'Please enter your monthly income';
            } else if (income < 300) {
                newErrors.monthlyIncome = 'Minimum monthly income is 300 AZN';
            }

            if (!limit || limit < 100) {
                newErrors.desiredLimit = 'Minimum credit limit is 100 AZN';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkEligibility = () => {
        if (!validateCreditInfo()) {
            return;
        }

        const income = parseFloat(monthlyIncome);
        const limit = parseFloat(desiredLimit);

        const maxPossibleLimit = income * 3;
        let result;

        if (limit <= maxPossibleLimit) {
            result = {
                type: 'approved',
                title: 'Credit Approved!',
                message: `Your credit limit has been approved: ${limit.toLocaleString()} AZN`,
                limit: limit
            };
        } else {
            result = {
                type: 'adjusted',
                title: 'Limit Adjusted',
                message: `Maximum credit limit based on your income: ${maxPossibleLimit.toLocaleString()} AZN`,
                limit: maxPossibleLimit
            };
        }

        setCreditResult(result);
        setApprovedLimit(result.limit);
    };

    const generateCardNumber = () => {
        let number = '';
        for (let i = 0; i < 16; i++) {
            number += Math.floor(Math.random() * 10);
            if ((i + 1) % 4 === 0 && i < 15) number += ' ';
        }
        return number;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cardType === 'credit') {
            if (!creditResult) {
                setErrors(prev => ({
                    ...prev,
                    eligibility: 'Please check credit eligibility first'
                }));
                return;
            }

            if (!validateCreditInfo()) {
                return;
            }
        }

        const cardData = {
            type: cardType,
            system: paymentSystem,
            currency: currency,
            number: generateCardNumber(),
            balance: cardType === 'credit' ? approvedLimit : 0,
            limit: cardType === 'credit' ? approvedLimit : null,
            name: `${user?.name} ${user?.surname}`,
            createdAt: new Date().toISOString()
        };

        const result = await addCard(cardData);

        if (result.success) {
            navigate('/dashboard');
        }
    };

    if (!user) {
        return null;
    }

    const canCreateCreditCard = user.employment;
    const cardBenefits = {
        debit: [
            'No annual fees',
            'Cashback up to 5%',
            'Contactless payments',
            'Mobile wallet support',
            'Free online banking',
            'Instant transaction alerts'
        ],
        credit: [
            'Credit limit up to 10,000 AZN',
            'Grace period up to 55 days',
            'Travel insurance included',
            'Airport lounge access',
            '24/7 concierge service',
            'Fraud protection'
        ]
    };

    return (
        <>
            {loading && (
                <LoadingOverlay>
                    <LoadingSpinner />
                </LoadingOverlay>
            )}

            <AddCardContainer>
                <Container>
                    <Header>
                        <Title>Create New Card</Title>
                        <Subtitle>
                            Choose your card type and customize it to fit your financial needs.
                            Get instant approval and start using your card right away.
                        </Subtitle>
                    </Header>

                    <CardGrid>
                        <FormCard>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>
                                        <CreditCard size={20} />
                                        Card Type
                                    </Label>
                                    <Select
                                        value={cardType}
                                        onChange={(e) => setCardType(e.target.value)}
                                        disabled={!canCreateCreditCard}
                                        $error={errors.type}
                                    >
                                        <Option value="debit">Debit Card</Option>
                                        {canCreateCreditCard && (
                                            <Option value="credit">Credit Card</Option>
                                        )}
                                    </Select>
                                    {!canCreateCreditCard && (
                                        <div style={{
                                            fontSize: '0.875rem',
                                            color: 'var(--warning)',
                                            marginTop: '8px'
                                        }}>
                                            Only debit cards available for unemployed users
                                        </div>
                                    )}
                                </FormGroup>

                                <FormGroup>
                                    <Label>
                                        <Globe size={20} />
                                        Payment System
                                    </Label>
                                    <Select
                                        value={paymentSystem}
                                        onChange={(e) => setPaymentSystem(e.target.value)}
                                    >
                                        <Option value="visa">VISA</Option>
                                        <Option value="mastercard">MasterCard</Option>
                                    </Select>
                                </FormGroup>

                                <FormGroup>
                                    <Label>
                                        <DollarSign size={20} />
                                        Currency
                                    </Label>
                                    <Select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    >
                                        <Option value="AZN">AZN - Azerbaijani Manat</Option>
                                        <Option value="USD">USD - US Dollar</Option>
                                        <Option value="EUR">EUR - Euro</Option>
                                    </Select>
                                </FormGroup>

                                {cardType === 'credit' && (
                                    <CreditInfo>
                                        <CreditInfoHeader>
                                            <TrendingUp size={24} />
                                            <CreditInfoTitle>Credit Card Application</CreditInfoTitle>
                                        </CreditInfoHeader>

                                        <FormGroup>
                                            <Label>
                                                Monthly Income (AZN)
                                                <span style={{ color: 'var(--error)' }}>*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                value={monthlyIncome}
                                                onChange={(e) => {
                                                    setMonthlyIncome(e.target.value);
                                                    setErrors(prev => ({ ...prev, monthlyIncome: undefined }));
                                                }}
                                                placeholder="Enter your monthly income"
                                                min="0"
                                                step="50"
                                                $error={errors.monthlyIncome}
                                            />
                                            {errors.monthlyIncome && (
                                                <div style={{
                                                    fontSize: '0.875rem',
                                                    color: 'var(--error)',
                                                    marginTop: '4px'
                                                }}>
                                                    {errors.monthlyIncome}
                                                </div>
                                            )}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>
                                                Desired Credit Limit (AZN)
                                                <span style={{ color: 'var(--error)' }}>*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                value={desiredLimit}
                                                onChange={(e) => {
                                                    setDesiredLimit(e.target.value);
                                                    setErrors(prev => ({ ...prev, desiredLimit: undefined }));
                                                }}
                                                placeholder="Enter desired credit limit"
                                                min="100"
                                                step="50"
                                                $error={errors.desiredLimit}
                                            />
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                marginTop: '4px'
                                            }}>
                                                Minimum: 100 AZN, Maximum: Based on your income
                                            </div>
                                        </FormGroup>

                                        <Button
                                            type="button"
                                            $variant="secondary"
                                            onClick={checkEligibility}
                                            disabled={loading}
                                            style={{ marginTop: '16px' }}
                                        >
                                            <Percent size={20} />
                                            Check Credit Eligibility
                                        </Button>

                                        {creditResult && (
                                            <ResultCard $type={creditResult.type}>
                                                <ResultIcon>
                                                    {creditResult.type === 'approved' ? (
                                                        <CheckCircle size={24} />
                                                    ) : (
                                                        <AlertCircle size={24} />
                                                    )}
                                                </ResultIcon>
                                                <ResultContent>
                                                    <ResultTitle $type={creditResult.type}>
                                                        {creditResult.title}
                                                    </ResultTitle>
                                                    <ResultDescription>
                                                        {creditResult.message}
                                                    </ResultDescription>
                                                </ResultContent>
                                            </ResultCard>
                                        )}

                                        {errors.eligibility && (
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--error)',
                                                marginTop: '16px',
                                                textAlign: 'center'
                                            }}>
                                                {errors.eligibility}
                                            </div>
                                        )}
                                    </CreditInfo>
                                )}

                                <div style={{ marginTop: '32px' }}>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Creating Card...' : 'Create Card'}
                                        <ChevronRight size={20} />
                                    </Button>
                                </div>
                            </Form>
                        </FormCard>

                        <PreviewCard $type={cardType}>
                            <div>
                                <CardChip />
                                <CardNumber>
                                    {cardType === 'credit' ? '•••• •••• •••• 3782' : '•••• •••• •••• 4242'}
                                </CardNumber>
                                <CardDetails>
                                    <div>
                                        <CardHolder>
                                            {user?.name} {user?.surname}
                                        </CardHolder>
                                        <div style={{ fontSize: '1rem', marginTop: '8px' }}>
                                            {cardType === 'credit' ? `Limit: ${approvedLimit.toLocaleString()} ${currency}` : `Balance: 0 ${currency}`}
                                        </div>
                                    </div>
                                    <CardType>
                                        {paymentSystem.toUpperCase()}
                                    </CardType>
                                </CardDetails>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    marginBottom: '16px'
                                }}>
                                    {cardType === 'credit' ? 'Credit Card Benefits' : 'Debit Card Benefits'}
                                </div>
                                <BenefitsList>
                                    {cardBenefits[cardType].slice(0, 4).map((benefit, index) => (
                                        <BenefitItem key={index}>
                                            <Zap size={16} />
                                            {benefit}
                                        </BenefitItem>
                                    ))}
                                </BenefitsList>
                            </div>
                        </PreviewCard>
                    </CardGrid>
                </Container>
            </AddCardContainer>
        </>
    );
};

export default AddCard;

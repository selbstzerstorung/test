import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import {
    Zap,
    Droplets,
    CreditCard,
    DollarSign,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    Receipt,
    Loader,
    Building
} from 'lucide-react';

// Styled Components
const UtilitiesContainer = styled.div`
    padding: 100px 24px 40px;
    background: ${({ theme }) => theme.background.secondary};
    min-height: 100vh;
`;

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
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

const TabsContainer = styled.div`
    display: flex;
    gap: 8px;
    background: ${({ theme }) => theme.background.card};
    border-radius: 16px;
    padding: 8px;
    margin-bottom: 32px;
    box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Tab = styled.button`
    flex: 1;
    padding: 20px;
    background: ${({ active, theme }) =>
            active ? theme.primary[500] : 'transparent'};
    border: none;
    border-radius: 12px;
    color: ${({ active, theme }) =>
            active ? 'white' : theme.text.secondary};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    &:hover {
        background: ${({ active, theme }) =>
                active ? theme.primary[600] : theme.background.tertiary};
    }
`;

const PaymentCard = styled.div`
    background: ${({ theme }) => theme.background.card};
    border-radius: 24px;
    padding: 32px;
    box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const ServiceHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.borders.color};
`;

const ServiceIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: ${({ color }) => color};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
`;

const ServiceInfo = styled.div`
    flex: 1;
`;

const ServiceTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text.primary};
`;

const ServiceDescription = styled.p`
    color: ${({ theme }) => theme.text.secondary};
    font-size: 0.875rem;
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

const FormLabel = styled.label`
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
`;

const FormInput = styled.input`
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
`;

const FormSelect = styled.select`
    padding: 16px;
    border: 2px solid ${({ theme, $error }) =>
            $error ? theme.status.error : theme.borders.color};
    border-radius: 12px;
    font-size: 1rem;
    background: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
    cursor: pointer;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary[500]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.primary[100]};
    }
`;

const FormOption = styled.option`
    padding: 16px;
    background: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 18px;
    background: ${({ theme }) => theme.primary[500]};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.primary[600]};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Alert = styled.div`
    padding: 16px;
    background: ${({ theme, $type }) =>
            $type === 'success'
                    ? theme.status.success + '20'
                    : theme.status.error + '20'};
    border: 1px solid ${({ theme, $type }) =>
            $type === 'success'
                    ? theme.status.success
                    : theme.status.error};
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
`;

const utilities = [
    {
        id: 'azerqaz',
        name: 'Azerqaz',
        icon: <Droplets size={32} />,
        color: '#3B82F6',
        description: 'Gas bill payment',
        placeholder: 'Enter customer code (9 digits)'
    },
    {
        id: 'azersu',
        name: 'Azersu',
        icon: <Droplets size={32} />,
        color: '#10B981',
        description: 'Water bill payment',
        placeholder: 'Enter subscriber number (9 digits)'
    },
    {
        id: 'azerishiq',
        name: 'Azerishiq',
        icon: <Zap size={32} />,
        color: '#F59E0B',
        description: 'Electricity bill payment',
        placeholder: 'Enter account number (10 digits)'
    }
];

const Utilities = () => {
    const { cards } = useAuth();
    const [activeTab, setActiveTab] = useState('azerqaz');
    const [formData, setFormData] = useState({
        code: '',
        cardId: '',
        amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const currentUtility = utilities.find(util => util.id === activeTab);
    const selectedCard = cards.find(card => card.id === formData.cardId);

    useEffect(() => {
        if (cards.length > 0 && !formData.cardId) {
            setFormData(prev => ({ ...prev, cardId: cards[0].id }));
        }
    }, [cards, formData.cardId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (success || error) {
            setSuccess('');
            setError('');
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.code.trim()) {
            errors.code = 'Please enter your customer code';
        } else if (!/^\d+$/.test(formData.code)) {
            errors.code = 'Code must contain only numbers';
        }

        if (!formData.cardId) {
            errors.cardId = 'Please select a payment card';
        }

        const amount = parseFloat(formData.amount);
        if (!formData.amount || isNaN(amount)) {
            errors.amount = 'Please enter a valid amount';
        } else if (amount <= 0) {
            errors.amount = 'Amount must be greater than 0';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccess(`Payment of ${formData.amount} AZN to ${currentUtility?.name} completed!`);

            // Reset form
            setFormData({
                code: '',
                cardId: cards.length > 0 ? cards[0].id : '',
                amount: ''
            });
            setValidationErrors({});

        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!cards || cards.length === 0) {
        return (
            <UtilitiesContainer>
                <Container>
                    <Header>
                        <Title>Utility Payments</Title>
                        <Subtitle>
                            Pay your utility bills quickly and securely
                        </Subtitle>
                    </Header>

                    <Alert $type="error">
                        <AlertCircle size={20} />
                        You need to have at least one card to make payments.
                    </Alert>
                </Container>
            </UtilitiesContainer>
        );
    }

    return (
        <UtilitiesContainer>
            <Container>
                <Header>
                    <Title>Utility Payments</Title>
                    <Subtitle>
                        Pay your utility bills. Select a service below to proceed.
                    </Subtitle>
                </Header>

                {success && (
                    <Alert $type="success">
                        <CheckCircle size={20} />
                        {success}
                    </Alert>
                )}

                {error && (
                    <Alert $type="error">
                        <AlertCircle size={20} />
                        {error}
                    </Alert>
                )}

                <TabsContainer>
                    {utilities.map((utility) => (
                        <Tab
                            key={utility.id}
                            active={activeTab === utility.id}
                            onClick={() => {
                                setActiveTab(utility.id);
                                setFormData(prev => ({ ...prev, code: '' }));
                                setSuccess('');
                                setError('');
                                setValidationErrors({});
                            }}
                        >
                            {utility.icon}
                            {utility.name}
                        </Tab>
                    ))}
                </TabsContainer>

                <PaymentCard>
                    {currentUtility && (
                        <ServiceHeader>
                            <ServiceIcon color={currentUtility.color}>
                                {currentUtility.icon}
                            </ServiceIcon>
                            <ServiceInfo>
                                <ServiceTitle>{currentUtility.name}</ServiceTitle>
                                <ServiceDescription>
                                    {currentUtility.description}
                                </ServiceDescription>
                            </ServiceInfo>
                        </ServiceHeader>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {/* Line 1: Code Input */}
                        <FormGroup>
                            <FormLabel>
                                <Building size={18} />
                                Customer Code
                            </FormLabel>
                            <FormInput
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                                placeholder={currentUtility?.placeholder}
                                $error={!!validationErrors.code}
                            />
                            {validationErrors.code && (
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--status-error)',
                                    marginTop: '4px'
                                }}>
                                    {validationErrors.code}
                                </div>
                            )}
                        </FormGroup>

                        {/* Line 2: Card Selection */}
                        <FormGroup>
                            <FormLabel>
                                <CreditCard size={18} />
                                Select Payment Card
                            </FormLabel>
                            <FormSelect
                                name="cardId"
                                value={formData.cardId}
                                onChange={handleInputChange}
                                $error={!!validationErrors.cardId}
                            >
                                {cards.map(card => (
                                    <FormOption key={card.id} value={card.id}>
                                        {card.type} •••• {card.number?.slice(-4)} - {card.balance} {card.currency}
                                    </FormOption>
                                ))}
                            </FormSelect>
                            {validationErrors.cardId && (
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--status-error)',
                                    marginTop: '4px'
                                }}>
                                    {validationErrors.cardId}
                                </div>
                            )}
                        </FormGroup>

                        {/* Line 3: Amount Input */}
                        <FormGroup>
                            <FormLabel>
                                <DollarSign size={18} />
                                Payment Amount (AZN)
                            </FormLabel>
                            <FormInput
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Enter amount"
                                min="0.01"
                                step="0.01"
                                $error={!!validationErrors.amount}
                            />
                            {validationErrors.amount && (
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--status-error)',
                                    marginTop: '4px'
                                }}>
                                    {validationErrors.amount}
                                </div>
                            )}
                        </FormGroup>

                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader size={20} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Receipt size={20} />
                                    Pay {formData.amount ? `${formData.amount} AZN` : 'Bill'}
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </SubmitButton>
                    </Form>
                </PaymentCard>
            </Container>
        </UtilitiesContainer>
    );
};

export default Utilities;

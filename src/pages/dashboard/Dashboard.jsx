import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import {
    CreditCard,
    TrendingUp,
    DollarSign,
    Settings,
    User,
    Shield,
    Bell,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    RefreshCw,
    Send,
    Receipt,
    Eye,
    EyeOff,
    Edit,
    Lock,
    MoreVertical
} from 'lucide-react';

// Styled Components
const DashboardContainer = styled.div`
    padding: 100px 24px 40px;
    background: ${({ theme }) => theme.background.secondary};
    min-height: 100vh;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: 80px 16px 24px;
    }
`;

const DashboardHeader = styled.div`
    max-width: 1400px;
    margin: 0 auto 32px;
`;

const WelcomeSection = styled.div`
    background: linear-gradient(135deg,
    ${({ theme }) => theme.primary[500]},
    ${({ theme }) => theme.secondary[500]}
    );
    color: white;
    padding: 32px;
    border-radius: 24px;
    margin-bottom: 32px;
    box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const WelcomeTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
`;

const WelcomeSubtitle = styled.p`
    opacity: 0.9;
    font-size: 1rem;
`;

const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 24px;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        grid-template-columns: 1fr;
    }
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Card = styled.div`
    background: ${({ theme }) => theme.background.card};
    border-radius: 20px;
    padding: 24px;
    box-shadow: ${({ theme }) => theme.shadows.md};

    &:hover {
        box-shadow: ${({ theme }) => theme.shadows.lg};
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const CardTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CardActions = styled.div`
    display: flex;
    gap: 8px;
`;

const IconButton = styled.button`
    background: ${({ theme }) => theme.background.secondary};
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.text.secondary};
    transition: all 0.2s;

    &:hover {
        background: ${({ theme }) => theme.background.tertiary};
        color: ${({ theme }) => theme.text.primary};
    }
`;

const CurrentCardDisplay = styled.div`
    position: relative;
    padding: 32px;
    background: linear-gradient(135deg,
    ${({ theme }) => theme.primary[600]},
    ${({ theme }) => theme.primary[800]}
    );
    border-radius: 20px;
    color: white;
    min-height: 220px;
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

const CardChip = styled.div`
    width: 50px;
    height: 40px;
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    border-radius: 8px;
    margin-bottom: 24px;
`;

const CardNumber = styled.div`
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 1.5rem;
    letter-spacing: 3px;
    margin-bottom: 24px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 32px;
`;

const CardHolder = styled.div`
    font-size: 0.875rem;
    opacity: 0.9;
`;

const CardBalance = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`;

const SettingsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SettingItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: ${({ theme }) => theme.background.secondary};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;

    &:hover {
        background: ${({ theme }) => theme.background.tertiary};
    }
`;

const SettingInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const SettingIcon = styled.div`
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.primary[100]};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary[500]};
`;

const SettingLabel = styled.div`
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};
`;

const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 16px;
`;

const SmallCard = styled.div`
    padding: 20px;
    background: ${({ theme, $type }) =>
            $type === 'credit'
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'linear-gradient(135deg, #f093fb, #f5576c)'};
    border-radius: 16px;
    color: white;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-4px);
    }

    ${({ $active, theme }) => $active && `
    box-shadow: 0 0 0 2px ${theme.primary[500]};
  `}
`;

const SmallCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const SmallCardChip = styled.div`
    width: 30px;
    height: 24px;
    background: rgba(255,255,255,0.3);
    border-radius: 4px;
`;

const SmallCardNumber = styled.div`
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 0.875rem;
    letter-spacing: 1px;
    margin-bottom: 8px;
`;

const SmallCardBalance = styled.div`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 8px;
`;

const SmallCardType = styled.div`
    font-size: 0.75rem;
    opacity: 0.9;
    background: rgba(255,255,255,0.2);
    padding: 2px 8px;
    border-radius: 12px;
    display: inline-block;
`;

const OperationsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
    margin-top: 16px;
`;

const OperationButton = styled.button`
    padding: 20px;
    background: ${({ theme }) => theme.background.secondary};
    border: none;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${({ theme }) => theme.background.tertiary};
        transform: translateY(-2px);
    }
`;

const OperationIcon = styled.div`
    width: 48px;
    height: 48px;
    background: ${({ theme }) => theme.primary[100]};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary[500]};
`;

const OperationLabel = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    font-size: 0.875rem;
    text-align: center;
`;

const TransactionsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TransactionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: ${({ theme }) => theme.background.secondary};
    border-radius: 12px;
    transition: background 0.2s;

    &:hover {
        background: ${({ theme }) => theme.background.tertiary};
    }
`;

const TransactionInfo = styled.div`
    flex: 1;
`;

const TransactionName = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 4px;
`;

const TransactionDate = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text.secondary};
`;

const TransactionAmount = styled.div`
    font-weight: 600;
    color: ${({ theme, $positive }) =>
            $positive ? theme.status.success : theme.status.error};
`;

const QuickStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const StatItem = styled.div`
    padding: 20px;
    background: ${({ theme }) => theme.background.secondary};
    border-radius: 16px;
    text-align: center;
`;

const StatValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 4px;
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text.secondary};
`;

const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    gap: 16px;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 48px 24px;
    color: ${({ theme }) => theme.text.secondary};
`;

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, cards, loading, logout } = useAuth();

    const [currentCard, setCurrentCard] = useState(null);
    const [showBalance, setShowBalance] = useState(true);

    const transactions = [
        { id: 1, name: 'Grocery Store', date: 'Today, 14:30', amount: -45.60, positive: false },
        { id: 2, name: 'Salary Deposit', date: 'Yesterday', amount: 2500.00, positive: true },
        { id: 3, name: 'Online Shopping', date: 'May 15', amount: -120.00, positive: false },
    ];

    useEffect(() => {
        if (cards.length > 0) {
            setCurrentCard(cards[0]);
        }
    }, [cards]);

    const handleCardSelect = (card) => {
        setCurrentCard(card);
    };

    const handleOperation = (operation) => {
        switch (operation) {
            case 'transfer':
                navigate('/transfer');
                break;
            case 'utilities':
                navigate('/payments/utilities');
                break;
            case 'card-settings':
                // Simple card settings action
                alert('Card settings functionality');
                break;
            case 'profile':
                navigate('/profile');
                break;
            default:
                alert(`${operation} functionality`);
        }
    };

    if (loading) {
        return (
            <DashboardContainer>
                <LoadingSpinner>
                    <RefreshCw size={40} />
                    <div>Loading your dashboard...</div>
                </LoadingSpinner>
            </DashboardContainer>
        );
    }

    if (!user) {
        return (
            <DashboardContainer>
                <EmptyState>
                    <h2>Please log in to view your dashboard</h2>
                    <Link to="/login">Go to Login</Link>
                </EmptyState>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            <DashboardHeader>
                <WelcomeSection>
                    <WelcomeTitle>
                        Welcome back, {user.name} {user.surname}!
                    </WelcomeTitle>
                    <WelcomeSubtitle>
                        Here's an overview of your finances
                    </WelcomeSubtitle>
                </WelcomeSection>
            </DashboardHeader>

            <DashboardGrid>
                <MainSection>
                    {/* Current Card Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <CreditCard size={20} />
                                Current Card
                            </CardTitle>
                            <CardActions>
                                <IconButton onClick={() => setShowBalance(!showBalance)}>
                                    {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                                </IconButton>
                            </CardActions>
                        </CardHeader>

                        {currentCard ? (
                            <CurrentCardDisplay>
                                <CardChip />
                                <CardNumber>
                                    {currentCard.number || '•••• •••• •••• 4242'}
                                </CardNumber>
                                <CardFooter>
                                    <div>
                                        <CardHolder>
                                            {user.name} {user.surname}
                                        </CardHolder>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                                            {currentCard.type?.toUpperCase()} • {currentCard.system?.toUpperCase()}
                                        </div>
                                    </div>
                                    <CardBalance>
                                        {showBalance ? `${currentCard.balance || '0.00'} ${currentCard.currency || 'AZN'}` : '••••• AZN'}
                                    </CardBalance>
                                </CardFooter>
                            </CurrentCardDisplay>
                        ) : (
                            <EmptyState>
                                <p>No cards found. Create your first card!</p>
                                <Link to="/add-card">
                                    <IconButton style={{ marginTop: '16px' }}>
                                        <Plus size={18} />
                                        Create First Card
                                    </IconButton>
                                </Link>
                            </EmptyState>
                        )}
                    </Card>

                    {/* Cards Grid */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <CreditCard size={20} />
                                Your Cards
                            </CardTitle>
                            <CardActions>
                                <Link to="/add-card">
                                    <IconButton>
                                        <Plus size={18} />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </CardHeader>

                        {cards.length === 0 ? (
                            <EmptyState>
                                <p>No cards yet. Create your first card to start.</p>
                                <Link to="/add-card">
                                    <IconButton style={{ marginTop: '16px' }}>
                                        <Plus size={18} />
                                        Create First Card
                                    </IconButton>
                                </Link>
                            </EmptyState>
                        ) : (
                            <CardsGrid>
                                {cards.map((card, index) => (
                                    <SmallCard
                                        key={index}
                                        $type={card.type}
                                        $active={currentCard?.id === card.id}
                                        onClick={() => handleCardSelect(card)}
                                    >
                                        <SmallCardHeader>
                                            <SmallCardChip />
                                            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                                                {card.system?.toUpperCase()}
                                            </div>
                                        </SmallCardHeader>
                                        <SmallCardNumber>
                                            •••• •••• •••• {card.number?.slice(-4) || '4242'}
                                        </SmallCardNumber>
                                        <SmallCardBalance>
                                            {showBalance ? `${card.balance || '0.00'} ${card.currency || 'AZN'}` : '•••••'}
                                        </SmallCardBalance>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <SmallCardType>
                                                {card.type?.charAt(0).toUpperCase() + card.type?.slice(1)}
                                            </SmallCardType>
                                            {card.limit && (
                                                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                                                    Limit: {showBalance ? card.limit : '••••'}
                                                </div>
                                            )}
                                        </div>
                                    </SmallCard>
                                ))}
                            </CardsGrid>
                        )}
                    </Card>

                    {/* Quick Operations */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Settings size={20} />
                                Quick Operations
                            </CardTitle>
                        </CardHeader>

                        <OperationsGrid>
                            <OperationButton onClick={() => handleOperation('transfer')}>
                                <OperationIcon>
                                    <Send size={24} />
                                </OperationIcon>
                                <OperationLabel>Transfer Money</OperationLabel>
                            </OperationButton>

                            <OperationButton onClick={() => handleOperation('utilities')}>
                                <OperationIcon>
                                    <Receipt size={24} />
                                </OperationIcon>
                                <OperationLabel>Utility Bills</OperationLabel>
                            </OperationButton>

                            <OperationButton onClick={() => handleOperation('card-settings')}>
                                <OperationIcon>
                                    <CreditCard size={24} />
                                </OperationIcon>
                                <OperationLabel>Card Settings</OperationLabel>
                            </OperationButton>
                        </OperationsGrid>
                    </Card>
                </MainSection>

                <Sidebar>
                    {/* User Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <User size={20} />
                                Account Information
                            </CardTitle>
                            <CardActions>
                                <IconButton onClick={() => handleOperation('profile')}>
                                    <Edit size={18} />
                                </IconButton>
                            </CardActions>
                        </CardHeader>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                                    display: flex,
                                    alignItems: 'center',
                                    justifyontent: 'center',
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold'
                                }}>
                                    {user.name?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>
                                        {user.name} {user.surname}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <SettingsList>
                                <SettingItem onClick={() => handleOperation('profile')}>
                                    <SettingInfo>
                                        <SettingIcon>
                                            <User size={20} />
                                        </SettingIcon>
                                        <SettingLabel>Profile Settings</SettingLabel>
                                    </SettingInfo>
                                </SettingItem>

                                <SettingItem onClick={() => logout()}>
                                    <SettingInfo>
                                        <SettingIcon>
                                            <Lock size={20} />
                                        </SettingIcon>
                                        <SettingLabel>Logout</SettingLabel>
                                    </SettingInfo>
                                </SettingItem>
                            </SettingsList>
                        </div>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <TrendingUp size={20} />
                                Quick Stats
                            </CardTitle>
                        </CardHeader>

                        <QuickStats>
                            <StatItem>
                                <StatValue>
                                    {cards.length}
                                </StatValue>
                                <StatLabel>Total Cards</StatLabel>
                            </StatItem>

                            <StatItem>
                                <StatValue>
                                    {cards.reduce((sum, card) => sum + (card.balance || 0), 0).toFixed(2)}
                                </StatValue>
                                <StatLabel>Total Balance</StatLabel>
                            </StatItem>
                        </QuickStats>
                    </Card>

                    {/* Recent Transactions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Clock size={20} />
                                Recent Transactions
                            </CardTitle>
                        </CardHeader>

                        <TransactionsList>
                            {transactions.map(transaction => (
                                <TransactionItem key={transaction.id}>
                                    <TransactionInfo>
                                        <TransactionName>
                                            {transaction.name}
                                        </TransactionName>
                                        <TransactionDate>
                                            {transaction.date}
                                        </TransactionDate>
                                    </TransactionInfo>
                                    <TransactionAmount $positive={transaction.positive}>
                                        {transaction.positive ? '+' : ''}{transaction.amount.toFixed(2)} AZN
                                        {transaction.positive ? (
                                            <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                                        ) : (
                                            <ArrowDownRight size={14} style={{ marginLeft: '4px' }} />
                                        )}
                                    </TransactionAmount>
                                </TransactionItem>
                            ))}
                        </TransactionsList>
                    </Card>
                </Sidebar>
            </DashboardGrid>
        </DashboardContainer>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import {
    Filter,
    Download,
    Search,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    ShoppingBag,
    Coffee,
    Home,
    Car,
    Gift,
    TrendingUp
} from 'lucide-react';

// Styled Components
const TransactionsContainer = styled.div`
    padding: 100px 24px 40px;
    background: ${({ theme }) => theme.background.secondary};
    min-height: 100vh;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    margin-bottom: 32px;
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
    line-height: 1.6;
`;

const Filters = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
    flex-wrap: wrap;
`;

const SearchInput = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
  
  input {
    width: 100%;
    padding: 12px 16px 12px 48px;
    border: 2px solid ${({ theme }) => theme.borders.color};
    border-radius: 12px;
    font-size: 1rem;
    background: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary[500]};
    }
  }
  
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

const FilterButton = styled.button`
    padding: 12px 24px;
    background: ${({ theme, $active }) =>
            $active ? theme.primary[500] : theme.background.card};
    color: ${({ theme, $active }) =>
            $active ? 'white' : theme.text.primary};
    border: none;
    border-radius: 12px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;

    &:hover {
        background: ${({ theme, $active }) =>
                $active ? theme.primary[600] : theme.background.tertiary};
    }
`;

const TransactionsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

const TransactionCard = styled.div`
    background: ${({ theme }) => theme.background.card};
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s;

    &:hover {
        box-shadow: ${({ theme }) => theme.shadows.md};
        transform: translateY(-2px);
    }
`;

const TransactionInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
`;

const TransactionIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: ${({ theme }) => theme.background.secondary};
    color: ${({ theme, $positive }) =>
            $positive ? theme.status.success : theme.status.error};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TransactionDetails = styled.div`
    flex: 1;
`;

const TransactionTitle = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.text.primary};
`;

const TransactionMeta = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text.secondary};
`;

const TransactionAmount = styled.div`
    font-weight: 600;
    font-size: 1.125rem;
    color: ${({ theme, $positive }) =>
            $positive ? theme.status.success : theme.status.error};
    display: flex;
    align-items: center;
    gap: 8px;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 80px 24px;
    color: ${({ theme }) => theme.text.secondary};
`;

const Transactions = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const transactionTypes = [
        { id: 'all', label: 'All Transactions' },
        { id: 'income', label: 'Income' },
        { id: 'expense', label: 'Expenses' },
    ];

    const mockTransactions = [
        {
            id: 1,
            title: 'Grocery Store',
            type: 'expense',
            amount: -45.60,
            positive: false,
            date: 'Today, 14:30',
            card: '•••• 4242',
            icon: <ShoppingBag size={24} />
        },
        {
            id: 2,
            title: 'Salary Deposit',
            type: 'income',
            amount: 2500.00,
            positive: true,
            date: 'Yesterday',
            card: 'Bank Transfer',
            icon: <TrendingUp size={24} />
        },
        {
            id: 3,
            title: 'Online Shopping',
            type: 'expense',
            amount: -120.00,
            positive: false,
            date: 'May 15',
            card: '•••• 4242',
            icon: <ShoppingBag size={24} />
        },
        {
            id: 4,
            title: 'Restaurant',
            type: 'expense',
            amount: -75.30,
            positive: false,
            date: 'May 14',
            card: '•••• 4242',
            icon: <Coffee size={24} />
        },
        {
            id: 5,
            title: 'Interest Earned',
            type: 'income',
            amount: 12.50,
            positive: true,
            date: 'May 13',
            card: 'Savings',
            icon: <TrendingUp size={24} />
        }
    ];

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setTransactions(mockTransactions);
            setLoading(false);
        }, 500);
    }, []);

    const filteredTransactions = transactions.filter(transaction => {
        if (filter !== 'all') {
            if (filter === 'income' && !transaction.positive) return false;
            if (filter === 'expense' && transaction.positive) return false;
        }

        if (search) {
            const searchLower = search.toLowerCase();
            return transaction.title.toLowerCase().includes(searchLower);
        }

        return true;
    });

    const handleExport = () => {
        // Simple export functionality
        const csvContent = [
            ['Date', 'Description', 'Amount', 'Card', 'Type'],
            ...filteredTransactions.map(t => [
                t.date,
                t.title,
                `${t.positive ? '+' : ''}${t.amount}`,
                t.card,
                t.type
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
    };

    if (loading) {
        return (
            <TransactionsContainer>
                <Container>
                    <EmptyState>Loading transactions...</EmptyState>
                </Container>
            </TransactionsContainer>
        );
    }

    return (
        <TransactionsContainer>
            <Container>
                <Header>
                    <Title>Transactions</Title>
                    <Subtitle>
                        View your transaction history and filter by type
                    </Subtitle>
                </Header>

                <Filters>
                    <SearchInput>
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </SearchInput>

                    {transactionTypes.map(type => (
                        <FilterButton
                            key={type.id}
                            $active={filter === type.id}
                            onClick={() => setFilter(type.id)}
                        >
                            {type.label}
                        </FilterButton>
                    ))}

                    <FilterButton onClick={handleExport}>
                        <Download size={20} />
                        Export CSV
                    </FilterButton>
                </Filters>

                {filteredTransactions.length === 0 ? (
                    <EmptyState>
                        <h3>No transactions found</h3>
                        <p>Try adjusting your filters or search terms</p>
                    </EmptyState>
                ) : (
                    <TransactionsGrid>
                        {filteredTransactions.map(transaction => (
                            <TransactionCard key={transaction.id}>
                                <TransactionInfo>
                                    <TransactionIcon $positive={transaction.positive}>
                                        {transaction.icon}
                                    </TransactionIcon>
                                    <TransactionDetails>
                                        <TransactionTitle>{transaction.title}</TransactionTitle>
                                        <TransactionMeta>
                                            {transaction.date} • {transaction.card}
                                        </TransactionMeta>
                                    </TransactionDetails>
                                </TransactionInfo>

                                <TransactionAmount $positive={transaction.positive}>
                                    {transaction.positive ? '+' : ''}{transaction.amount.toFixed(2)} AZN
                                    {transaction.positive ? (
                                        <ArrowUpRight size={20} />
                                    ) : (
                                        <ArrowDownRight size={20} />
                                    )}
                                </TransactionAmount>
                            </TransactionCard>
                        ))}
                    </TransactionsGrid>
                )}
            </Container>
        </TransactionsContainer>
    );
};

export default Transactions;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Home, CreditCard, Search } from 'lucide-react';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 24px;
  background: ${({ theme }) => theme.background.secondary};
  text-align: center;
`;

const ErrorCode = styled.div`
  font-size: 8rem;
  font-weight: 800;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[500]}, 
    ${({ theme }) => theme.secondary[500]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 6rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 4rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text.secondary};
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled(Link)`
  padding: 16px 32px;
  background: ${({ theme, $primary }) =>
    $primary ? theme.primary[500] : theme.background.card};
  color: ${({ theme, $primary }) =>
    $primary ? 'white' : theme.text.primary};
  border: ${({ theme, $primary }) =>
    $primary ? 'none' : `2px solid ${theme.borders.color}`};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background: ${({ theme, $primary }) =>
    $primary ? theme.primary[600] : theme.background.tertiary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const SearchSuggestions = styled.div`
  background: ${({ theme }) => theme.background.card};
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  margin-top: 48px;
  text-align: left;
`;

const SuggestionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SuggestionItem = styled.li`
  color: ${({ theme }) => theme.text.secondary};
  
  a {
    color: ${({ theme }) => theme.primary[500]};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NotFound = () => {
    const popularPages = [
        { path: '/', label: 'Home', icon: <Home size={16} /> },
        { path: '/dashboard', label: 'Dashboard', icon: <CreditCard size={16} /> },
        { path: '/cards', label: 'Cards', icon: <CreditCard size={16} /> },
        { path: '/transactions', label: 'Transactions', icon: <CreditCard size={16} /> },
        { path: '/payments/utilities', label: 'Utility Bills', icon: <CreditCard size={16} /> },
    ];

    return (
        <NotFoundContainer>
            <ErrorCode>404</ErrorCode>
            <Title>Page Not Found</Title>
            <Description>
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable. Please check the URL or navigate back to our homepage.
            </Description>

            <Actions>
                <ActionButton $primary to="/">
                    <Home size={20} />
                    Back to Home
                </ActionButton>

                <ActionButton to="/dashboard">
                    <CreditCard size={20} />
                    Go to Dashboard
                </ActionButton>
            </Actions>

            <SearchSuggestions>
                <SuggestionTitle>
                    <Search size={20} />
                    Popular Pages
                </SuggestionTitle>
                <SuggestionList>
                    {popularPages.map((page, index) => (
                        <SuggestionItem key={index}>
                            {page.icon}
                            <a href={page.path}>{page.label}</a>
                        </SuggestionItem>
                    ))}
                </SuggestionList>
            </SearchSuggestions>
        </NotFoundContainer>
    );
};

export default NotFound;

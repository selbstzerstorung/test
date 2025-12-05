import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
    CreditCard,
    TrendingUp,
    Shield,
    Zap,
    DollarSign,
    Smartphone,
    Globe,
    Users,
    Award,
    ChevronRight,
    ArrowRight
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
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const HomeContainer = styled.div`
  padding-top: 80px;
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[50]} 0%, 
    ${({ theme }) => theme.background.primary} 100%
  );
  text-align: center;
  animation: ${fadeIn} 0.8s ease;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[600]}, 
    ${({ theme }) => theme.secondary[500]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.text.secondary};
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.primary[500]};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borders.radius.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    background: ${({ theme }) => theme.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  background: transparent;
  color: ${({ theme }) => theme.primary[500]};
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.primary[500]};
  border-radius: ${({ theme }) => theme.borders.radius.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.primary[50]};
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.background.card};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  animation: ${fadeIn} 0.6s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.primary[50]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary[500]};
  font-size: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, $alternate }) =>
    $alternate ? theme.background.secondary : theme.background.primary};
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.text.primary};
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.text.secondary};
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const CardPreview = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[500]}, 
    ${({ theme }) => theme.secondary[500]}
  );
  border-radius: ${({ theme }) => theme.borders.radius.xl};
  color: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
    animation: ${float} 20s linear infinite;
  }
`;

const CardChip = styled.div`
  width: 50px;
  height: 40px;
  background: linear-gradient(45deg, gold, #ffd700);
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  letter-spacing: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
`;

const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.background.card};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  text-align: center;
  animation: ${fadeIn} 0.6s ease;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.primary[500]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.background.card};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const FAQQuestion = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.text.primary};
`;

const FAQAnswer = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.6;
`;

const ExchangeTable = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.background.card};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.primary[500]};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.borders.color};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${({ theme }) => theme.background.secondary};
  }
`;

const CurrencyCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Flag = styled.span`
  font-size: 1.5rem;
`;

const Home = () => {
    const [exchangeRates] = useState([
        { currency: 'USD/AZN', flag: '🇺🇸', buy: '1.6980', sell: '1.7020' },
        { currency: 'EUR/AZN', flag: '🇪🇺', buy: '1.9680', sell: '1.9720' },
        { currency: 'GBP/AZN', flag: '🇬🇧', buy: '2.2580', sell: '2.2620' },
        { currency: 'RUB/AZN', flag: '🇷🇺', buy: '0.0208', sell: '0.0212' },
        { currency: 'TRY/AZN', flag: '🇹🇷', buy: '0.0580', sell: '0.0620' },
    ]);

    const [stats] = useState([
        { number: '500K+', label: 'Active Customers' },
        { number: '€2.5B+', label: 'Assets Under Management' },
        { number: '24/7', label: 'Customer Support' },
        { number: '99.9%', label: 'Uptime' },
    ]);

    const features = [
        {
            icon: <CreditCard size={32} />,
            title: 'Smart Cards',
            description: 'Debit, credit, and premium cards with cashback and travel benefits.'
        },
        {
            icon: <TrendingUp size={32} />,
            title: 'Investment Plans',
            description: 'Grow your savings with our competitive investment opportunities.'
        },
        {
            icon: <Shield size={32} />,
            title: 'Bank-Level Security',
            description: 'Military-grade encryption and fraud protection for your peace of mind.'
        },
        {
            icon: <Zap size={32} />,
            title: 'Instant Transfers',
            description: 'Send money locally and internationally in seconds.'
        },
        {
            icon: <Smartphone size={32} />,
            title: 'Mobile Banking',
            description: 'Full banking services available 24/7 on your smartphone.'
        },
        {
            icon: <Globe size={32} />,
            title: 'Global Access',
            description: 'Use your cards worldwide with competitive exchange rates.'
        },
    ];

    const faqs = [
        {
            question: 'How do I open an account?',
            answer: 'Open an account online in 5 minutes or visit any branch with your ID. Online registration requires email verification.'
        },
        {
            question: 'What documents are needed?',
            answer: 'For individuals: ID or passport. For businesses: registration documents and director identification.'
        },
        {
            question: 'Are my funds secure?',
            answer: 'Yes, deposits are insured up to €100,000 per depositor with 256-bit encryption and multi-factor authentication.'
        },
        {
            question: 'How can I reset my password?',
            answer: 'Use "Forgot Password" on login page or contact support for a reset link via email or SMS.'
        },
        {
            question: 'What are your working hours?',
            answer: 'Branches: Mon-Fri 9-18, Sat 10-16. Online banking: 24/7. Phone support: 8-22 daily.'
        },
        {
            question: 'Do you have a mobile app?',
            answer: 'Yes, available for iOS and Android with biometric login, card controls, and investment management.'
        },
    ];

    return (
        <HomeContainer>
            {/* Hero Section */}
            <HeroSection>
                <HeroTitle>
                    Smart Banking for<br />Modern Life
                </HeroTitle>
                <HeroSubtitle>
                    Experience banking reimagined. Quick transfers, secure cards, and 24/7 mobile access—all in one place.
                    Join over 500,000 satisfied customers who trust us with their finances.
                </HeroSubtitle>
                <CTAButtons>
                    <PrimaryButton to="/register">
                        Open Free Account
                        <ArrowRight size={20} />
                    </PrimaryButton>
                    <SecondaryButton to="/login">
                        Sign In
                        <ChevronRight size={20} />
                    </SecondaryButton>
                </CTAButtons>
            </HeroSection>

            {/* Stats Section */}
            <Section>
                <StatsGrid>
                    {stats.map((stat, index) => (
                        <StatCard key={index}>
                            <StatNumber>{stat.number}</StatNumber>
                            <StatLabel>{stat.label}</StatLabel>
                        </StatCard>
                    ))}
                </StatsGrid>
            </Section>

            {/* Features Section */}
            <Section $alternate>
                <SectionTitle>Why Choose Chimigancha Bank?</SectionTitle>
                <SectionSubtitle>
                    We combine cutting-edge technology with exceptional service to deliver the best banking experience.
                </SectionSubtitle>
                <FeaturesGrid>
                    {features.map((feature, index) => (
                        <FeatureCard key={index}>
                            <FeatureIcon>
                                {feature.icon}
                            </FeatureIcon>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>
            </Section>

            {/* Cards Section */}
            <Section id="cards">
                <SectionTitle>Bank Cards</SectionTitle>
                <SectionSubtitle>
                    Choose the card that fits your lifestyle and financial goals.
                </SectionSubtitle>
                <CardsGrid>
                    <CardPreview>
                        <CardChip />
                        <CardNumber>•••• •••• •••• 4242</CardNumber>
                        <CardInfo>
                            <div>
                                <div>John Appleseed</div>
                                <div>Balance: €1,250.00</div>
                            </div>
                            <div>VISA</div>
                        </CardInfo>
                    </CardPreview>
                    <div>
                        <FeatureCard>
                            <FeatureIcon>
                                <CreditCard size={32} />
                            </FeatureIcon>
                            <FeatureTitle>Debit Cards</FeatureTitle>
                            <FeatureDescription>
                                Spend your own money with our secure debit cards. Perfect for everyday purchases with no interest charges.
                            </FeatureDescription>
                            <PrimaryButton to="/register" style={{ marginTop: '16px' }}>
                                Get Debit Card
                            </PrimaryButton>
                        </FeatureCard>
                    </div>
                </CardsGrid>
            </Section>

            {/* Deposits Section */}
            <Section id="deposits" $alternate>
                <SectionTitle>Deposits & Savings</SectionTitle>
                <SectionSubtitle>
                    Grow your money with our competitive investment solutions.
                </SectionSubtitle>
                <CardsGrid>
                    <FeatureCard>
                        <FeatureIcon>
                            <DollarSign size={32} />
                        </FeatureIcon>
                        <FeatureTitle>Term Deposits</FeatureTitle>
                        <FeatureDescription>
                            Fixed-term deposits with guaranteed returns. Choose from 3, 6, 12, or 24 months.
                        </FeatureDescription>
                        <div style={{ color: 'var(--success)', fontWeight: '600', margin: '16px 0' }}>
                            Up to 5% annual return
                        </div>
                        <PrimaryButton to="/register" style={{ marginTop: '16px' }}>
                            Open Deposit
                        </PrimaryButton>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureIcon>
                            <TrendingUp size={32} />
                        </FeatureIcon>
                        <FeatureTitle>Savings Accounts</FeatureTitle>
                        <FeatureDescription>
                            Flexible savings with easy access to your funds. Perfect for building your emergency fund.
                        </FeatureDescription>
                        <div style={{ color: 'var(--success)', fontWeight: '600', margin: '16px 0' }}>
                            Up to 3% annual interest
                        </div>
                        <PrimaryButton to="/register" style={{ marginTop: '16px' }}>
                            Open Savings
                        </PrimaryButton>
                    </FeatureCard>
                </CardsGrid>
            </Section>

            {/* FAQ Section */}
            <Section id="faq">
                <SectionTitle>Frequently Asked Questions</SectionTitle>
                <SectionSubtitle>
                    Find answers to common questions about our services.
                </SectionSubtitle>
                <FAQGrid>
                    {faqs.map((faq, index) => (
                        <FAQItem key={index}>
                            <FAQQuestion>{faq.question}</FAQQuestion>
                            <FAQAnswer>{faq.answer}</FAQAnswer>
                        </FAQItem>
                    ))}
                </FAQGrid>
            </Section>

            {/* Exchange Rates Section */}
            <Section id="exchange" $alternate>
                <SectionTitle>Exchange Rates</SectionTitle>
                <SectionSubtitle>
                    Current currency exchange rates (updated daily)
                </SectionSubtitle>
                <ExchangeTable>
                    <TableHeader>
                        <div>Currency</div>
                        <div>Buy</div>
                        <div>Sell</div>
                    </TableHeader>
                    {exchangeRates.map((rate, index) => (
                        <TableRow key={index}>
                            <CurrencyCell>
                                <Flag>{rate.flag}</Flag>
                                <span>{rate.currency}</span>
                            </CurrencyCell>
                            <div>{rate.buy}</div>
                            <div>{rate.sell}</div>
                        </TableRow>
                    ))}
                </ExchangeTable>
                <div style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    color: 'var(--text-tertiary)',
                    fontSize: '0.875rem'
                }}>
                    Rates are for informational purposes only. Actual rates may vary.
                </div>
            </Section>
        </HomeContainer>
    );
};

export default Home;

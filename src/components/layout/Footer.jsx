import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    CreditCard,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Shield,
    Lock,
    Globe
} from 'lucide-react';

const FooterContainer = styled.footer`
  background: var(--background-tertiary);
  border-top: 1px solid var(--borders-color);
  padding: 64px 0 32px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: var(--grid-container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 32px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--primary-500);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const FooterDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
`;

const FooterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: var(--primary-500);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: var(--borders-radius-full);
  background: var(--background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s;
  
  &:hover {
    background: var(--primary-500);
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  padding-top: 32px;
  border-top: 1px solid var(--borders-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

const Copyright = styled.p`
  color: var(--text-tertiary);
  font-size: 0.875rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const LegalLink = styled(Link)`
  color: var(--text-tertiary);
  font-size: 0.75rem;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-500);
    text-decoration: underline;
  }
`;

const SecurityBadges = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--background-secondary);
  border-radius: var(--borders-radius-full);
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            <FooterContent>
                <FooterGrid>
                    {/* Company Info */}
                    <FooterSection>
                        <FooterLogo>
                            <CreditCard size={28} />
                            Chimigancha Bank
                        </FooterLogo>
                        <FooterDescription>
                            Your trusted partner in financial services since 2010.
                            We provide innovative banking solutions for individuals and businesses.
                        </FooterDescription>
                        <SocialLinks>
                            <SocialLink href="#" aria-label="Facebook">
                                <Facebook size={20} />
                            </SocialLink>
                            <SocialLink href="#" aria-label="Twitter">
                                <Twitter size={20} />
                            </SocialLink>
                            <SocialLink href="#" aria-label="Instagram">
                                <Instagram size={20} />
                            </SocialLink>
                            <SocialLink href="#" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </SocialLink>
                        </SocialLinks>
                    </FooterSection>

                    {/* Quick Links */}
                    <FooterSection>
                        <FooterTitle>Quick Links</FooterTitle>
                        <FooterLinks>
                            <FooterLink to="/">
                                <CreditCard size={16} />
                                Home
                            </FooterLink>
                            <FooterLink to="/dashboard">
                                Dashboard
                            </FooterLink>
                            <FooterLink to="/cards">
                                Cards
                            </FooterLink>
                            <FooterLink to="/transactions">
                                Transactions
                            </FooterLink>
                            <FooterLink to="/profile">
                                Profile
                            </FooterLink>
                        </FooterLinks>
                    </FooterSection>

                    {/* Services */}
                    <FooterSection>
                        <FooterTitle>Services</FooterTitle>
                        <FooterLinks>
                            <FooterLink to="/cards/add">
                                Add New Card
                            </FooterLink>
                            <FooterLink to="#">
                                Money Transfer
                            </FooterLink>
                            <FooterLink to="#">
                                Bill Payments
                            </FooterLink>
                            <FooterLink to="#">
                                Investments
                            </FooterLink>
                            <FooterLink to="#">
                                Loans
                            </FooterLink>
                        </FooterLinks>
                    </FooterSection>

                    {/* Contact */}
                    <FooterSection>
                        <FooterTitle>Contact Us</FooterTitle>
                        <ContactInfo>
                            <ContactItem>
                                <Phone size={16} />
                                <span>+994 12 555 55 55</span>
                            </ContactItem>
                            <ContactItem>
                                <Mail size={16} />
                                <span>support@chimigancha-bank.com</span>
                            </ContactItem>
                            <ContactItem>
                                <MapPin size={16} />
                                <span>Baku, Azerbaijan</span>
                            </ContactItem>
                            <ContactItem>
                                <Globe size={16} />
                                <span>24/7 Online Support</span>
                            </ContactItem>
                        </ContactInfo>
                    </FooterSection>
                </FooterGrid>

                <FooterBottom>
                    <SecurityBadges>
                        <SecurityBadge>
                            <Shield size={14} />
                            SSL Secured
                        </SecurityBadge>
                        <SecurityBadge>
                            <Lock size={14} />
                            PCI DSS Compliant
                        </SecurityBadge>
                    </SecurityBadges>

                    <Copyright>
                        © {currentYear} Chimigancha Bank. All rights reserved.
                    </Copyright>

                    <LegalLinks>
                        <LegalLink to="/privacy-policy">
                            Privacy Policy
                        </LegalLink>
                        <LegalLink to="/terms-of-service">
                            Terms of Service
                        </LegalLink>
                        <LegalLink to="/cookie-policy">
                            Cookie Policy
                        </LegalLink>
                        <LegalLink to="/security">
                            Security
                        </LegalLink>
                        <LegalLink to="/compliance">
                            Compliance
                        </LegalLink>
                    </LegalLinks>

                    <Copyright style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                        This website is for demonstration purposes only.
                        Licensed by the Central Bank of Azerbaijan.
                    </Copyright>
                </FooterBottom>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;

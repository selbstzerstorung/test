import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Shield,
    Bell,
    Lock,
    Camera,
    Save,
    X,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const ProfileContainer = styled.div`
  padding: 100px 24px 40px;
  background: ${({ theme }) => theme.background.secondary};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
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

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MenuItem = styled.button`
  padding: 16px;
  background: ${({ active, theme }) =>
    active ? theme.primary[100] : theme.background.card};
  border: none;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ active, theme }) =>
    active ? theme.primary[600] : theme.text.primary};
  font-weight: ${({ active }) => active ? 600 : 400};
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.primary[50]};
  }
`;

const MainContent = styled.div`
  background: ${({ theme }) => theme.background.card};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
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

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary[500]}, 
    ${({ theme }) => theme.secondary[500]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  position: relative;
`;

const AvatarUpload = styled.label`
  padding: 10px 20px;
  background: ${({ theme }) => theme.background.secondary};
  border: 2px solid ${({ theme }) => theme.borders.color};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.background.tertiary};
  }
  
  input {
    display: none;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
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
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) =>
    $variant === 'secondary'
        ? theme.background.tertiary
        : theme.primary[600]};
    transform: translateY(-2px);
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

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        employment: false,
        birthDate: '',
        notifications: true,
        twoFactor: false
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                surname: user.surname || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                employment: user.employment || false,
                birthDate: user.birthDate || '',
                notifications: user.notifications !== false,
                twoFactor: user.twoFactor || false
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In real app: await api.updateProfile(formData);
            localStorage.setItem('user', JSON.stringify({
                ...JSON.parse(localStorage.getItem('user') || '{}'),
                ...formData
            }));

            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Handle avatar upload
            console.log('Avatar upload:', file);
        }
    };

    const menuItems = [
        { id: 'personal', label: 'Personal Info', icon: <User size={20} /> },
        { id: 'security', label: 'Security', icon: <Shield size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { id: 'privacy', label: 'Privacy', icon: <Lock size={20} /> },
    ];

    const renderPersonalInfo = () => (
        <Section>
            <SectionTitle>
                <User size={24} />
                Personal Information
            </SectionTitle>

            <AvatarSection>
                <Avatar>
                    {user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <div>
                    <AvatarUpload>
                        <Camera size={20} />
                        Change Photo
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                    </AvatarUpload>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                        Recommended: Square JPG, PNG up to 5MB
                    </p>
                </div>
            </AvatarSection>

            <Form onSubmit={handleSubmit}>
                <FormRow>
                    <FormGroup>
                        <Label>
                            <User size={16} />
                            First Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            <User size={16} />
                            Last Name
                        </Label>
                        <Input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </FormRow>

                <FormRow>
                    <FormGroup>
                        <Label>
                            <Mail size={16} />
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            <Phone size={16} />
                            Phone Number
                        </Label>
                        <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </FormRow>

                <FormGroup>
                    <Label>
                        <MapPin size={16} />
                        Address
                    </Label>
                    <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormRow>
                    <FormGroup>
                        <Label>
                            <Briefcase size={16} />
                            Employment Status
                        </Label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                                type="checkbox"
                                id="employment"
                                name="employment"
                                checked={formData.employment}
                                onChange={handleChange}
                                style={{ width: '20px', height: '20px' }}
                            />
                            <label htmlFor="employment" style={{ color: 'var(--text-secondary)' }}>
                                I am currently employed
                            </label>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            <Calendar size={16} />
                            Birth Date
                        </Label>
                        <Input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </FormRow>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <Button type="submit" disabled={loading}>
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button type="button" $variant="secondary">
                        <X size={20} />
                        Cancel
                    </Button>
                </div>
            </Form>
        </Section>
    );

    const renderSecurity = () => (
        <Section>
            <SectionTitle>
                <Shield size={24} />
                Security Settings
            </SectionTitle>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Two-Factor Authentication</Label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>2FA Protection</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Add an extra layer of security to your account
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{
                                width: '44px',
                                height: '24px',
                                background: formData.twoFactor ? 'var(--primary-500)' : 'var(--background-tertiary)',
                                borderRadius: '12px',
                                position: 'relative',
                                transition: 'all 0.2s',
                                marginRight: '12px'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '2px',
                                    left: formData.twoFactor ? '22px' : '2px',
                                    transition: 'all 0.2s'
                                }} />
                            </div>
                            <input
                                type="checkbox"
                                name="twoFactor"
                                checked={formData.twoFactor}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <span style={{ fontWeight: 500 }}>
                {formData.twoFactor ? 'Enabled' : 'Disabled'}
              </span>
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label>Change Password</Label>
                    <Button type="button" $variant="secondary" style={{ width: 'fit-content' }}>
                        <Lock size={20} />
                        Change Password
                    </Button>
                </FormGroup>

                <FormGroup>
                    <Label>Active Sessions</Label>
                    <div style={{
                        background: 'var(--background-secondary)',
                        padding: '16px',
                        borderRadius: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 500 }}>Current Session</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    Chrome • Windows • Baku, Azerbaijan
                                </div>
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--status-success)' }}>
                                Active now
                            </div>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </Section>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalInfo();
            case 'security':
                return renderSecurity();
            case 'notifications':
                return (
                    <Section>
                        <SectionTitle>
                            <Bell size={24} />
                            Notification Preferences
                        </SectionTitle>
                        {/* Add notification settings */}
                    </Section>
                );
            case 'privacy':
                return (
                    <Section>
                        <SectionTitle>
                            <Lock size={24} />
                            Privacy Settings
                        </SectionTitle>
                        {/* Add privacy settings */}
                    </Section>
                );
            default:
                return renderPersonalInfo();
        }
    };

    if (!user) {
        return null;
    }

    return (
        <ProfileContainer>
            <Container>
                <Header>
                    <Title>Profile Settings</Title>
                    <Subtitle>
                        Manage your personal information, security settings, and notification preferences
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

                <ProfileGrid>
                    <Sidebar>
                        {menuItems.map(item => (
                            <MenuItem
                                key={item.id}
                                active={activeTab === item.id}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.icon}
                                {item.label}
                            </MenuItem>
                        ))}
                    </Sidebar>

                    <MainContent>
                        {renderContent()}
                    </MainContent>
                </ProfileGrid>
            </Container>
        </ProfileContainer>
    );
};

export default Profile;

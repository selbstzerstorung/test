import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import NotificationContainer from '../common/NotificationContainer';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    padding-top: ${({ $hideHeader }) => $hideHeader ? '0' : '80px'};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-top: ${({ $hideHeader }) => $hideHeader ? '0' : '70px'};
    }
`;

const Layout = ({ children, hideHeader = false, hideFooter = false }) => {
    return (
        <LayoutContainer>
            <NotificationContainer />

            {!hideHeader && <Header />}

            <Main $hideHeader={hideHeader}>
                {children}
            </Main>

            {!hideFooter && <Footer />}
        </LayoutContainer>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool
};

export default Layout;

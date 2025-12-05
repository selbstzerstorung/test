import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--typography-fontFamily-primary);
    font-size: var(--typography-fontSize-base);
    font-weight: var(--typography-fontWeight-normal);
    line-height: var(--typography-lineHeight-normal);
    color: var(--text-primary);
    background-color: var(--background-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }

  /* Theme-specific styles */
  .light-theme {
    color-scheme: light;
  }

  .dark-theme {
    color-scheme: dark;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--typography-fontWeight-bold);
    line-height: var(--typography-lineHeight-tight);
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    margin-bottom: var(--spacing-md);
    color: var(--text-secondary);
  }

  a {
    color: var(--primary-500);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--primary-600);
      text-decoration: underline;
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Forms */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: var(--background-primary);
    border: 2px solid var(--borders-color);
    border-radius: var(--borders-radius-md);
    padding: var(--spacing-md) var(--spacing-lg);
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px var(--primary-100);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-secondary);
    border-radius: var(--borders-radius-full);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-500);
    border-radius: var(--borders-radius-full);
    
    &:hover {
      background: var(--primary-600);
    }
  }

  /* Selection */
  ::selection {
    background-color: var(--primary-100);
    color: var(--primary-900);
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100%;
    max-width: var(--grid-container-xl);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 var(--spacing-md);
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Card styles */
  .card {
    background: var(--background-card);
    border-radius: var(--borders-radius-lg);
    box-shadow: var(--shadows-md);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: var(--shadows-lg);
      transform: translateY(-2px);
    }
  }

  /* Status colors */
  .status-success {
    color: var(--status-success);
  }

  .status-warning {
    color: var(--status-warning);
  }

  .status-error {
    color: var(--status-error);
  }

  .status-info {
    color: var(--status-info);
  }

  /* Loading spinner */
  .spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid var(--background-secondary);
    border-radius: 50%;
    border-top-color: var(--primary-500);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Grid utilities */
  .grid {
    display: grid;
    gap: var(--spacing-lg);
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  /* Flex utilities */
  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  /* Spacing utilities */
  .mt-1 { margin-top: var(--spacing-xs); }
  .mt-2 { margin-top: var(--spacing-sm); }
  .mt-3 { margin-top: var(--spacing-md); }
  .mt-4 { margin-top: var(--spacing-lg); }
  .mt-5 { margin-top: var(--spacing-xl); }

  .mb-1 { margin-bottom: var(--spacing-xs); }
  .mb-2 { margin-bottom: var(--spacing-sm); }
  .mb-3 { margin-bottom: var(--spacing-md); }
  .mb-4 { margin-bottom: var(--spacing-lg); }
  .mb-5 { margin-bottom: var(--spacing-xl); }

  .p-1 { padding: var(--spacing-xs); }
  .p-2 { padding: var(--spacing-sm); }
  .p-3 { padding: var(--spacing-md); }
  .p-4 { padding: var(--spacing-lg); }
  .p-5 { padding: var(--spacing-xl); }

  /* Text utilities */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .text-primary { color: var(--text-primary); }
  .text-secondary { color: var(--text-secondary); }
  .text-tertiary { color: var(--text-tertiary); }

  .text-xs { font-size: var(--typography-fontSize-xs); }
  .text-sm { font-size: var(--typography-fontSize-sm); }
  .text-base { font-size: var(--typography-fontSize-base); }
  .text-lg { font-size: var(--typography-fontSize-lg); }
  .text-xl { font-size: var(--typography-fontSize-xl); }

  .font-light { font-weight: var(--typography-fontWeight-light); }
  .font-normal { font-weight: var(--typography-fontWeight-normal); }
  .font-medium { font-weight: var(--typography-fontWeight-medium); }
  .font-semibold { font-weight: var(--typography-fontWeight-semibold); }
  .font-bold { font-weight: var(--typography-fontWeight-bold); }

  /* Border utilities */
  .rounded-sm { border-radius: var(--borders-radius-sm); }
  .rounded-md { border-radius: var(--borders-radius-md); }
  .rounded-lg { border-radius: var(--borders-radius-lg); }
  .rounded-xl { border-radius: var(--borders-radius-xl); }
  .rounded-full { border-radius: var(--borders-radius-full); }

  /* Shadow utilities */
  .shadow-sm { box-shadow: var(--shadows-sm); }
  .shadow-md { box-shadow: var(--shadows-md); }
  .shadow-lg { box-shadow: var(--shadows-lg); }
  .shadow-xl { box-shadow: var(--shadows-xl); }

  /* Responsive utilities */
  .mobile-only {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .desktop-only {
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }
`;

export default GlobalStyles;

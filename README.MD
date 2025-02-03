# Crypto Portfolio Risk Analyzer

A simple JavaScript library to analyze and assess the risk of cryptocurrency portfolios. It provides important risk metrics including:

- **Volatility**
- **Sharpe Ratio**
- **Value at Risk (VaR)**
- **Conditional Value at Risk (CVaR)**
- **Max Drawdown**
- **Sortino Ratio**

---

## Features

- **Risk Analysis**: Quickly analyze the risk metrics of your crypto portfolio.
- **Easy Integration**: Install with npm or yarn and use it directly in your JavaScript projects.
- **Modular Design**: Functions are neatly organized into different modules for better maintainability and extensibility.

---

## Installation

You can install the `crypto-portfolio-risk-analyzer` library via npm or yarn:

### Using npm:

```bash
npm install crypto-portfolio-risk-analyzer

### Using yarn:

```bash
yarn add crypto-portfolio-risk-analyzer

---

## Usage

After installation, you can use the library to analyze your crypto portfolio by passing a list of assets, including the coin ID and other parameters.

### Example Code:

```javascript
const { analyzePortfolio } = require('crypto-portfolio-risk-analyzer');

// Define your portfolio (coinId, allocation, etc.)
const portfolio = [
  { coinId: 'bitcoin', allocation: 50, days: 10, varConfidence: 0.99 },
  { coinId: 'ethereum', allocation: 30, days: 10, cvarConfidence: 0.80 },
  { coinId: 'litecoin', allocation: 20, days: 10 }
];

// Analyze the portfolio
analyzePortfolio(portfolio)
  .then(result => {
    if (result.success) {
      console.log('Portfolio Analysis:', result.data);
    } else {
      console.log('Failed to analyze portfolio');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

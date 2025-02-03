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
```

### Using yarn:

```bash
yarn add crypto-portfolio-risk-analyzer
```

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
```

### Expected output:

```json
{
  "success": true,
  "data": [
    {
      "asset": "bitcoin",
      "volatility": "2.35%",
      "sharpeRatio": "1.32",
      "allocation": "50%",
      "var95": "3.12%",
      "cvar95": "4.25%",
      "maxDrawdown": "12.54%",
      "sortinoRatio": "1.67",
      "riskSummary": "Risk Analysis for BITCOIN....."
    },
  ]
}
```

## Functions

`analyzePortfolio(portfolio)`

This function performs the risk analysis for each asset in your portfolio.

### Parameters:

- `portfolio` (Array): An array of portfolio objects, where each object contains:
    - `coinId` (String): The coin’s ID (e.g., 'bitcoin', 'ethereum').
    - `allocation` (Number): The percentage of the total portfolio allocated to this coin.
    - `days` (Number, optional): The number of days to fetch historical data for risk calculations (default is 30).
    - `varConfidence` (Number, optional): The confidence level for Value at Risk (default is 0.95).
    - `cvarConfidence` (Number, optional): The confidence level for Conditional VaR (default is 0.95).

### Returns:

- A Promise that resolves to an object with a `success` field and `data` field containing the risk analysis results.

## Explain Risk Metrics

- `Volatility` measures how much an asset's price fluctuates over a given period. It is calculated as the standard deviation of daily returns.
- `Sharpe Ratio` measures the risk-adjusted return of an asset. It is calculated as the ratio of the asset's excess return over the risk-free rate to its volatility.
- `Value at Risk (VaR)` estimates the maximum potential loss of an asset at a given confidence level over a specified time horizon.
- `Conditional Value at Risk (CVaR)` estimates the expected loss of an asset beyond the VaR at a given confidence level.
- `Max Drawdown` measures the maximum loss from a peak to a trough of an asset's value.
- `Sortino Ratio` measures the risk-adjusted return of an asset using downside risk (volatility of negative returns) instead of total volatility.

## Contributing

If you’d like to contribute to this project, feel free to fork the repository, create a feature branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

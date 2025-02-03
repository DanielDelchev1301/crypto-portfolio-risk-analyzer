const math = require('mathjs');

// Value at Risk (VaR)
const calculateVaR = (returns, confidenceLevel = 0.95) => {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  return sortedReturns[index];
};

// Conditional Value at Risk (CVaR)
const calculateCVaR = (returns, confidenceLevel = 0.95) => {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  const tailReturns = sortedReturns.slice(0, index);
  return math.mean(tailReturns);
};

// Max Drawdown (MDD)
const calculateMaxDrawdown = (prices) => {
  let peak = prices[0][1];
  let maxDrawdown = 0;
  prices.forEach(([_, price]) => {
    peak = Math.max(peak, price);
    maxDrawdown = Math.max(maxDrawdown, (peak - price) / peak);
  });
  return maxDrawdown;
};

// Beta Coefficient
const calculateBeta = (portfolioReturns, marketReturns) => {
  const covariance = math.variance(portfolioReturns, marketReturns);
  const variance = math.variance(marketReturns);
  return covariance / variance;
};

// Sortino Ratio
const calculateSortinoRatio = (returns, riskFreeRate = 0.01) => {
  const negativeReturns = returns.filter((r) => r < 0);
  const downsideDeviation = Math.sqrt(math.variance(negativeReturns));
  const avgReturn = math.mean(returns);
  return (avgReturn - riskFreeRate / 252) / downsideDeviation;
};

// Daily Returns
const calculateDailyReturns = (prices) => {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    const dailyReturn = (prices[i][1] - prices[i - 1][1]) / prices[i - 1][1];
    returns.push(dailyReturn);
  }
  return returns;
};
  
// Volatility
const calculateVolatility = (returns) => {
  const variance = math.variance(returns);
  return Math.sqrt(variance);
};


// Sharpe Ratio
const calculateSharpeRatio = (returns, riskFreeRate = 0.01) => {
  const avgReturn = math.mean(returns);
  const volatility = calculateVolatility(returns);
  return (avgReturn - riskFreeRate / 252) / volatility;
};

module.exports = { 
  calculateVaR, 
  calculateCVaR, 
  calculateMaxDrawdown, 
  calculateBeta, 
  calculateSortinoRatio, 
  calculateDailyReturns, 
  calculateVolatility, 
  calculateSharpeRatio
};

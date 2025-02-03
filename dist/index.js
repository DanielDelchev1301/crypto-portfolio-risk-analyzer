const math = require('mathjs');
const { generateRiskSummary } = require('./generateRiskSummary');
const { fetchHistoricalData } = require('./dataFetcher');
const { 
  calculateDailyReturns, 
  calculateVolatility, 
  calculateSharpeRatio, 
  calculateVaR, 
  calculateCVaR, 
  calculateMaxDrawdown, 
  calculateSortinoRatio 
} = require('./riskAnalyzer');

const analyzePortfolio = async (portfolio) => {
  const analizedPortfolio = [];
  for (const asset of portfolio) {
    const { coinId, allocation, days, varConfidence, cvarConfidence } = asset;

    const prices = await fetchHistoricalData(coinId, days);
    const dailyReturns = calculateDailyReturns(prices);
    const volatility = calculateVolatility(dailyReturns);
    const sharpeRatio = calculateSharpeRatio(dailyReturns);
    const var95 = calculateVaR(dailyReturns, varConfidence);
    const cvar95 = calculateCVaR(dailyReturns, cvarConfidence); 
    const maxDrawdown = calculateMaxDrawdown(prices);
    const sortinoRatio = calculateSortinoRatio(dailyReturns);
    const riskSummary = generateRiskSummary(coinId, volatility, sharpeRatio, allocation, var95, cvar95, maxDrawdown, sortinoRatio, varConfidence, cvarConfidence);

    analizedPortfolio.push({
      asset: coinId,
      volatility: (volatility * 100).toFixed(2) + '%',
      sharpeRatio: sharpeRatio.toFixed(2),
      allocation: allocation + '%',
      var95: (var95 * 100).toFixed(2) + '%',
      cvar95: (cvar95 * 100).toFixed(2) + '%',
      maxDrawdown: (maxDrawdown * 100).toFixed(2) + '%',
      sortinoRatio: sortinoRatio.toFixed(2),
      riskSummary,
    });
  }
  return { success: true, data: analizedPortfolio };
};

const portfolio = [
  { coinId: 'bitcoin', allocation: 50, days: 10 },
  { coinId: 'ethereum', allocation: 30, varConfidence: 0.99 },
  { coinId: 'litecoin', allocation: 20, cvarConfidence: 0.80 },
];

analyzePortfolio(portfolio).then((result) => console.log(result));
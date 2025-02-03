const generateRiskSummary = (
  coinId,
  volatility,
  sharpeRatio,
  allocation,
  var95,
  cvar95,
  maxDrawdown,
  sortinoRatio,
  varConfidence,
  cvarConfidence
) => {
  let summary = `🔍 **Risk Analysis for ${coinId.toUpperCase()}**\n\n`;

  // Volatility assessment
  summary += `📉 **Volatility**: ${(volatility * 100).toFixed(2)}% - `;
  if (volatility < 0.5) {
    summary += "Low volatility, relatively stable asset.\n";
  } else if (volatility < 1.0) {
    summary += "Moderate volatility, some price fluctuations.\n";
  } else {
    summary += "High volatility, significant price swings.\n";
  }

  // Sharpe Ratio assessment
  summary += `📊 **Sharpe Ratio**: ${sharpeRatio.toFixed(2)} - `;
  if (sharpeRatio > 1.0) {
    summary += "Good risk-adjusted returns.\n";
  } else if (sharpeRatio > 0) {
    summary += "Acceptable returns for the risk taken.\n";
  } else {
    summary += "Poor risk-adjusted returns, consider reducing exposure.\n";
  }

  // Sortino Ratio assessment
  summary += `📈 **Sortino Ratio**: ${sortinoRatio.toFixed(2)} - `;
  if (sortinoRatio > 1.0) {
    summary += "Strong return relative to downside risk.\n";
  } else if (sortinoRatio > 0) {
    summary += "Moderate downside risk, but returns are still acceptable.\n";
  } else {
    summary += "High downside risk, returns do not justify the risk.\n";
  }

  // Value at Risk (VaR) assessment
  summary += `⚠️ **VaR (${(varConfidence * 100) || 95}%)**: ${(var95 * 100).toFixed(2)}% - `;
  summary += `In a bad market, you might lose this much in a single day.\n`;

  // Conditional Value at Risk (CVaR) assessment
  summary += `🚨 **CVaR (${(cvarConfidence * 100) || 95}%)**: ${(cvar95 * 100).toFixed(2)}% - `;
  summary += "Potential losses in extreme downturns.\n";

  // Maximum Drawdown assessment
  summary += `📉 **Max Drawdown**: ${(maxDrawdown * 100).toFixed(2)}% - `;
  if (maxDrawdown < 0.2) {
    summary += "Controlled historical losses.\n";
  } else if (maxDrawdown < 0.4) {
    summary += "Moderate drawdowns, should be watched.\n";
  } else {
    summary += "High drawdowns, significant past losses.\n";
  }

  // Portfolio allocation check
  summary += `💰 **Allocation**: ${allocation.toFixed(2)}% - `;
  if (allocation > 50) {
    summary += "High allocation; ensure this aligns with risk tolerance.\n";
  } else {
    summary += "Diversified allocation.\n";
  }

  // Overall risk classification
  summary += "\n🧐 **Overall Risk Level:** ";
  if (volatility < 0.5 && maxDrawdown < 0.2) {
    summary += "🟢 Low Risk - Suitable for conservative investors.\n";
  } else if (volatility < 1.0 && maxDrawdown < 0.4) {
    summary += "🟡 Moderate Risk - Balanced approach needed.\n";
  } else {
    summary += "🔴 High Risk - Expect significant fluctuations and potential losses.\n";
  }

  summary += "\n🔹 **Suggestions:**\n";
  if (sharpeRatio < 0) {
    summary += "  - Consider reducing exposure or diversifying into lower-risk assets.\n";
  }
  if (sortinoRatio < 0) {
    summary += "  - Focus on assets with better downside protection.\n";
  }
  if (maxDrawdown > 0.3) {
    summary += "  - Review risk tolerance and consider hedging strategies.\n";
  }
  if (allocation > 50) {
    summary += "  - Rebalance portfolio if overexposed to a single asset.\n";
  }

  return summary;
}

module.exports = { generateRiskSummary };

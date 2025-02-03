const axios = require('axios');
const moment = require('moment');

const fetchHistoricalData = async (coinId, days = 30) => {
  const endDate = moment().unix();
  const startDate = moment().subtract(days, 'days').unix();
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}`;

  try {
    const response = await axios.get(url, {accept: 'application/json', 'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY});
    return response.data.prices; // [timestamp, price]
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    return [];
  }
};

module.exports = { fetchHistoricalData };

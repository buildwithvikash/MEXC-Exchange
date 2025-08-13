import axios from 'axios';

export const getExchangeInfo = async (req, res) => {
  try {
    const response = await axios.get('https://api.mexc.com/api/v3/exchangeInfo');
    res.json(response.data); // Send data to frontend
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching exchange info',
      error: error.message,
    });
  }
};

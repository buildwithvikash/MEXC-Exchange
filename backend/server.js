import express from 'express';
import cors from 'cors';
import exchangeRoutes from './routes/exchangeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', exchangeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

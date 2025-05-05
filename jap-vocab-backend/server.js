const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const vocabRoutes = require('./routes/vocabRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection 
mongoose.connect('mongodb://localhost:27017/jap_vocab', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/vocab', vocabRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const databaseConfig = require('./config/databaseConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos
mongoose.connect(databaseConfig.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

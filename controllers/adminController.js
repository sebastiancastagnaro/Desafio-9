const adminDao = require('../dao/adminDao');
const bcrypt = require('bcrypt');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminDao.getAdminByEmailAndPassword(email, password);

    if (admin) {
      // Aquí puedes generar un token de autenticación si es necesario
      res.status(200).json({ message: 'Admin login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

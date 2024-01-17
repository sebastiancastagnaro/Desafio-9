const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Admin = require('../models/adminModel');

beforeAll(async () => {
  // Conectar a la base de datos de prueba o utilizar una instancia en memoria
  await mongoose.connect('mongodb://localhost:27017/your-test-database', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Desconectar después de las pruebas
  await mongoose.connection.close();
});

describe('Admin Authentication', () => {
  it('should login admin with correct credentials', async () => {
    // Crear un admin de prueba en la base de datos de prueba
    const testAdmin = new Admin({
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpassword', 10),
    });
    await testAdmin.save();

    // Realizar la solicitud de inicio de sesión con las credenciales correctas
    const response = await request(app)
      .post('/api/admins/login')
      .send({ email: 'admin@example.com', password: 'adminpassword' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin login successful');
  });

  it('should not login admin with incorrect credentials', async () => {
    // Realizar la solicitud de inicio de sesión con credenciales incorrectas
    const response = await request(app)
      .post('/api/admins/login')
      .send({ email: 'admin@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });
});

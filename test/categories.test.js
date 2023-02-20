const request = require('supertest');
const expect = require('chai').expect;

const sequelize = require('../configs/database');
const { configs } = require('../configs/configs');
const app = require('../src/app');

beforeEach( async function () {
  await sequelize.sync({force: true});
});

describe('Create category', function () {
  it('Name field is required', async function () {
    const response = await request(app).post(`${configs.pathInitial}/categories`).send({description: 'This is example description'}).set('Accept', 'application/json').expect('Content-Type', /json/);
    expect(response.status).to.eql(400);
  });
});

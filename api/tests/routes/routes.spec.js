/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipes, DietTypes, conn } = require('../../src/db.js');

const agent = session(app);

const diet = {
  name: 'qwe'
}

describe('Api routes test', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Recipes.sync({ force: true }));

  describe('GET /recipes?name=(...) ', () => {

    it('should return 400 if no query is sent', () =>
        agent.get('/recipes').expect(400)
    );

    it('should return 400 if nothing is found with the received query', async () =>{
        const response = await agent.get('/recipes?name=asdasdasdasd');
        expect(response.statusCode).to.equal(400);
    });

    it('should return 200 otherwise',  () =>{
        agent.get('/recipes?name=pasta').expect(200)
    });

  });

  describe('GET /recipes/:id', () => {

    it('should return 400 if no id is provided', async () => {
        const response = await agent.get('/recipes');
        expect(response.statusCode).to.equal(400);
      });

    it('should return 400 if nothing is found with the given id', async () => {
      const response = await agent.get('/recipes/asdhjaskdjasdk');
      expect(response.statusCode).to.equal(400);
    });

    it('should return 200 otherwhise', async () => {
        const response = await agent.get('/recipes/1');
        expect(response.statusCode).to.equal(200);
      });

  })
  
  beforeEach(() => DietTypes.sync({ force: true })
    .then(() => DietTypes.create(diet)));    
  describe('GET /types', () => {    
    it('should return 200 on request', () =>
      agent.get('/types').expect(200)
    );
  });
  
  describe('POST /api/recipe', () => {  
    it('should return 400 if required any of the fields are null', async () => {
      const res = await agent.post('/recipe').send({});
      expect(res.statusCode).to.equal(400);
      const res1 = await agent.post('/recipe').send({name: 'a'});
      expect(res1.statusCode).to.equal(400);
    });  
    it('should otherwise', async () => {
      const res2 = await agent.post('/recipe').send({name: 'a', resume: 'abc', steps:['123'], dietTypes: ['vegan']});
      expect(res2.statusCode).to.equal(200);
    })  
  });
});

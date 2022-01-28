const { Recipes, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipes model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    //beforeEach(() => Recipes.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if any of the required fields is null', (done) => {

        Recipes.sync({ force: true })
          .then(() => Recipes.create({name:'pasta', resume:'axcv'}))
          .catch((err)=>{
            done()
          });

      });

      it('should work when no required fields are missing', (done) => {

        Recipes.sync({ force: true })
          .then(() => {
            Recipes.create({name:'pasta', resume:'axcv', steps:['123']})
            done()})
          .catch((err)=>{});
          
        });
    });
  });
});

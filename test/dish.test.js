const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const client = require('../config/redisconfig');

const app = require("../server")

beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI);
  });

//Wrong API
    describe('/GET API Not found', () => {
        it('it should get API NOT found error', async () => {
            const res = await request(app).get("/safasdc").set({"Authorization":"Sugam"});
            expect(res.statusCode).toBe(200);
            expect(res.body.error).toBe("API Not Found");
        });
    });

//GET API
    describe('/GET Dishes', () => {
        it('it should get all dishes', async () => {
            const res = await request(app).get("/getDishes").set({"Authorization":"Sugam"});
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            
        });
    });

//ADD DISHES
    describe("/POST Dish", () =>{
      it("it should add a dish ", async() => {
          const res = await request(app).post("/addDish").set({"Authorization":"Sugam"})
            .send({
              "dishName":"ulta",
              "servesPeople":"10",
              "availableQuantity":"20",
              "pricePerItem": 10,
              "dishType": "Starter"
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("Dish added successfully");
            expect(res.body.dish.dishName).toBe("ulta")
            expect(res.body.dish.dishType).toBe("Starter")
            expect(res.body.dish.availableQuantity).toBe(20)
            expect(res.body.dish.servesPeople).toBe(10)
            expect(res.body.dish.pricePerItem).toBe(10)
      });
    })

//UPDATE DISHES
    describe('/UPDATE Dish', () => {
      it('it should change the dish price and increase available quantity by 5', async () => {
          const res = await request(app).put('/updateDish').set({"Authorization":"Sugam"})
            .send({
              "dishName":"Roti", 
              "pricePerItem":20,
              "availableQuantity":5
          });
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("Dish Updated Successfully");
          expect(res.body.dish.dishName).toBe('Roti');
          expect(res.body.dish.pricePerItem).toBe(20);
          expect(res.body.dish.availableQuantity).toBeGreaterThan(5);
      });

      it('it should say dish does not exists', async () => {
        const res = await request(app).put('/updateDish').set({"Authorization":"Sugam"})
        .send({
          "dishName":"scssdv", 
          "pricePerItem":20,
          "availableQuantity":5
        });
        expect(res.statusCode).toBe(412);
        expect(res.body.message).toBe("Dish does not exists");
      });

      it('it should say dish dishname,price and quantity required', async () => {
        const res = await request(app).put('/updateDish').set({"Authorization":"Sugam"})
        .send({});
        expect(res.statusCode).toBe(412);
        expect(res.body.message).toBe('DishName, Quantity and Price are required');
      })
    })
    
//DELETE APIs
    describe('/Delete Dish', () => {
      it('it should delete a dish', async () => {
        const res = await request(app).delete("/deleteDish").set({"Authorization":"Sugam"})
        .send({'dishName':"ulta"})
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("Dish Deleted successfully");
      });

      it('it should get should say enter a dish name to delete', async () => {
        const res = await request(app).delete("/deleteDish").set({"Authorization":"Sugam"})
        .send({})
          expect(res.statusCode).toBe(412);
          expect(res.body.message).toBe("Dish Name required");
      });

      it('it should get should say dish does not exist', async () => {
          const res = await request(app).delete("/deleteDish").set({"Authorization":"Sugam"})
                        .send({'dishName':"acbac"});
          expect(res.statusCode).toBe(412);
          expect(res.body.message).toBe("Dish does not exists");
      });
    });

afterAll((done) => {
     mongoose.connection.close();
     client.disconnect()
     done()
  });
const app = require("./index");
const request = require("supertest");

describe("Testing /item route", () => {
  test("It should return data if the request is correct", done => {
    request(app)
      .post("/item")
      .send({ search_item: "Bandos boots" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("It should return with a 404 for an empty request", done => {
    request(app)
      .post("/item")
      .send({ search_item: "" })
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  test("It should return with a 404 for an item that does not exist", done => {
    request(app)
      .post("/item")
      .send({ search_item: "afa,sf" })
      .then(response => {
        expect(response.status).toBe(404);
        done();
      });
  });
});

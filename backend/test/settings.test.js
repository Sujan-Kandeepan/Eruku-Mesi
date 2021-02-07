/**
 * The following script tests the settings page
 * Please ensure that the MongoDB settings database has not been created before this script runs.
 */

const request = require("supertest");
const app = require("../setup.js");

let Settings = require("../model/settings.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async () => {
  const sample = {
    receiveNotifications: false,
    preferredTheme: "light",
  };
  const settings = new Settings(sample);
  await settings.save();
  documentId = settings._id;
});

/**
 * This runs after each test case
 */
afterEach(async () => {
  Settings.collection.drop();
});

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /settings endpoint
 * MATCHES TO: FR - 30
 */
it("GET /settings", async (done) => {
  const response = await request(app).get("/settings");
  expect(response.status).toBe(200);
  const responseArrayLength = response.body.length;
  const document = response.body[0];
  expect(responseArrayLength).toBe(1);
  expect(document.receiveNotifications).toBe(false);
  expect(document.preferredTheme).toBe("light");
  done();
});

// /**
//  * UNIT TEST - checks to see if POST for the /settings/add endpoint will succeed and set the non-mandatory fields to default values
//  */
it("POST /settings/add", async (done) => {
  const response = await request(app).post("/settings/add").send({});
  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("setting successfully added");
  done();
});

// /**
//  * ACCEPTANCE TEST - checks to see if we are able to POST for the /settings/add endpoint
//  * MATCHES TO: FR - 30
//  */
it("POST /settings/add", async (done) => {
  const response = await request(app).post("/settings/add").send({
    receiveNotifications: false,
    preferredTheme: "light",
  });
  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("setting successfully added");
  expect(responseObj.setting.preferredTheme).toBe("light");
  done();
});

// /**
//  * ACCEPTANCE TEST - GET with a specific ID
//  * MATCHES TO: FR - 30
//  */
it("GET /settings/:id", async (done) => {
  const response = await request(app).get("/settings/" + documentId);
  expect(response.status).toBe(200);
  const document = response.body.setting;

  expect(document.receiveNotifications).toBe(false);
  expect(document.preferredTheme).toBe("light");
  done();
});

// /**
//  * ACCEPTANCE TEST - checks if we are able to edit an settings with a specific ID
//  * MATCHES TO: FR-10
//  */
it("EDIT /settings/:id", async (done) => {
  const response = await request(app)
    .post("/settings/edit/" + documentId)
    .send({
        receiveNotifications: true
    });
  const responseObj = JSON.parse(response.text);
  expect(responseObj.msg).toBe("setting successfully updated");

  done();
});

// /**
//  * UNIT TEST - checks to see if POST for the /settings/edit/:id endpoint will fail due to missing info
//  */
it("EDIT /settings/:id EXPECT ERROR", async (done) => {
  const response = await request(app)
    .post("/settings/edit/" + documentId)
    .send({});
  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(400);
  expect(responseObj.status).toBe("error");
  expect(responseObj.message).toBe("No field to update with");
  done();
});

// /**
//  * ACCEPTANCE TEST - checks if we are able to delete an settings with a specific ID
//  * MATCHES TO: FR-30
//  */
it("DELETE /settings/:id", async (done) => {
  const response = await request(app).delete("/settings/" + documentId);
  const responseObj = response.body;
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("setting deleted successfully!");
  done();
});

/**
 * The following script tests the notification page
 * Please ensure that the MongoDB notification database has not been created before this script runs.
 */

const request = require("supertest");
const app = require("../setup.js");
const mongoose = require("mongoose");

let Notification = require("../model/notification.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async () => {
  const sample = {
    receiver: [mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    body: "You're invited to 2021 Reunion in Maryland",
  };
  const notification = new Notification(sample);
  await notification.save();
  documentId = notification._id;
});
/**
 * This runs after each test case
 */
afterEach(async () => {
  Notification.collection.drop();
});

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /notifications endpoint
 */
it("GET /notifications", async (done) => {
  const response = await request(app).get("/notifications");

  expect(response.status).toBe(200);
  const responseArrayLength = response.body.length;
  const document = response.body[0];
  expect(responseArrayLength).toBe(1);

  expect(document.receiver).toEqual(["507f1f77bcf86cd799439011"]);
  expect(document.body).toBe("You're invited to 2021 Reunion in Maryland");
  done();
});

/**
 * UNIT TEST - checks to see if POST for the /notifications/add endpoint will fail due to missing arguments
 */
it("POST /notifications/add EXPECT ERROR", async (done) => {
  const response = await request(app).post("/notifications/add").send({
    body: "You're invited to 2021 Reunion in Maryland",
  });

  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(400);
  expect(responseObj.status).toBe("error");
  expect(responseObj.message).toBe("Mandatory field is not set");
  done();
});

/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /notifications/add endpoint
 */
it("POST /notifications/add", async (done) => {
  const response = await request(app)
    .post("/notifications/add")
    .send({
      receiver: [mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      body: "You're invited to 2021 Reunion in Maryland",
    });

  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("notification successfully added");
  done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 */
it("GET /notifications/:id", async (done) => {
  const response = await request(app).get("/notifications/" + documentId);
  expect(response.status).toBe(200);
  const document = response.body.notification;
  expect(document.receiver).toEqual(["507f1f77bcf86cd799439011"]);
  expect(document.body).toBe("You're invited to 2021 Reunion in Maryland");

  done();
});

/**
 * ACCEPTANCE TEST - checks if we are able to edit a notification with a specific ID
 */
it("EDIT /notifications/edit/:id", async (done) => {
  const response = await request(app)
    .post("/notifications/edit/" + documentId)
    .send({
      body: "You're invited to 2021 Reunion In Toronto",
    });
  const responseObj = JSON.parse(response.text);
  expect(responseObj.message).toBe('notification successfully updated');
  done();
});

/**
 * UNIT TEST - checks to see if POST for the /notifications/edit/:id endpoint will fail due to missing info
 */
it("EDIT /notifications/edit/:id EXPECT ERROR", async (done) => {
  const response = await request(app)
    .post("/notifications/edit/" + documentId)
    .send({});
  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(400);
  expect(responseObj.status).toBe("error");
  expect(responseObj.message).toBe("No field to update with");
  done();
});

/**
 * ACCEPTANCE TEST - checks if we are able to delete an notification with a specific ID
 */
it("DELETE /notifications/:id", async (done) => {
  const response = await request(app).delete("/notifications/" + documentId);
  const responseObj = response.body;
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("notification deleted successfully!");
  done();
});

/**
 * The following script tests the information page
 * Please ensure that the MongoDB information database has not been created before this script runs.
 */

const request = require("supertest");
const app = require("../setup.js");

let Information = require("../model/information.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async () => {
  const sample = {
    title: "History of Eruku Mesi",
    content:
      "Eruku is an Ekiti village, seventy-seven miles east of Ilorin which is its provincial headquarters and it is the eastern boundary of the Ilorin province. The common belief is that the people originated from Oyo which in turn, originated from Ile- Ife.",
  };
  const information = new Information(sample);
  await information.save();
  documentId = information._id;
});

/**
 * This runs after each test case
 */
afterEach(async () => {
  Information.collection.drop();
});

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /information endpoint
 */
it("GET /information", async (done) => {
  const response = await request(app).get("/information");
  expect(response.status).toBe(200);
  const responseArrayLength = response.body.length;
  const document = response.body[0];
  expect(responseArrayLength).toBe(1);
  expect(document.title).toBe("History of Eruku Mesi");
  expect(document.content).toBe(
    "Eruku is an Ekiti village, seventy-seven miles east of Ilorin which is its provincial headquarters and it is the eastern boundary of the Ilorin province. The common belief is that the people originated from Oyo which in turn, originated from Ile- Ife."
  );
  done();
});

// /**
//  * UNIT TEST - checks to see if POST for the /information/add endpoint will fail due to missing arguments
it("POST /information/add", async (done) => {
  const response = await request(app).post("/information/add").send({
    title: "History of Eruku Mesi",
  });
  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(400);
  expect(responseObj.status).toBe("error");
  expect(responseObj.message).toBe("Mandatory field is not set");
  done();
});

// /**
//  * ACCEPTANCE TEST - checks to see if we are able to POST for the /information/add endpoint
//  */
it("POST /information/add", async (done) => {
  const response = await request(app).post("/information/add").send({
    title: "History of Eruku Mesi",
    content:
      "Eruku is an Ekiti village, seventy-seven miles east of Ilorin which is its provincial headquarters and it is the eastern boundary of the Ilorin province. The common belief is that the people originated from Oyo which in turn, originated from Ile- Ife.",
  });
  const responseObj = JSON.parse(response.text);
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("Information successfully added");
  done();
});

// /**
//  * ACCEPTANCE TEST - GET with a specific ID
//  */
it("GET /information/:id", async (done) => {
  const response = await request(app).get("/information/" + documentId);
  expect(response.status).toBe(200);
  const document = response.body.information;

  expect(document.title).toBe("History of Eruku Mesi");
  expect(document.content).toBe(
    "Eruku is an Ekiti village, seventy-seven miles east of Ilorin which is its provincial headquarters and it is the eastern boundary of the Ilorin province. The common belief is that the people originated from Oyo which in turn, originated from Ile- Ife."
  );
  done();
});

// /**
//  * ACCEPTANCE TEST - checks if we are able to edit an information with a specific ID
//  */
// it("EDIT /information/:id", async (done) => {
//   const response = await request(app)
//     .post("/information/edit/" + documentId)
//     .send({
//       title: "History of Eruku Mesi Community",
//     });
//   const responseObj = JSON.parse(response.text);
//   expect(responseObj.msg).toBe("information successfully updated");

//   done();
// });

// /**
//  * UNIT TEST - checks to see if POST for the /information/edit/:id endpoint will fail due to missing info
//  */
// it("EDIT /information/:id EXPECT ERROR", async (done) => {
//   const response = await request(app)
//     .post("/information/edit/" + documentId)
//     .send({});
//   const responseObj = JSON.parse(response.text);
//   expect(response.status).toBe(400);
//   expect(responseObj.status).toBe("error");
//   expect(responseObj.message).toBe("No field to update with");
//   done();
// });

// /**
//  * ACCEPTANCE TEST - checks if we are able to delete an information with a specific ID
//  */
it("DELETE /information/:id", async (done) => {
  const response = await request(app).delete("/information/" + documentId);
  const responseObj = response.body;
  expect(response.status).toBe(200);
  expect(responseObj.message).toBe("information deleted successfully!");
  done();
});

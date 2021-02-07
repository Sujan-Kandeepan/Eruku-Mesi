/**
 * The following script tests the feedback page
 * Please ensure that the MongoDB feedback database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let Feedback = require("../model/feedback.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "text": "2021 Feedback"
    }
    const feedback = new Feedback(sample);
    await feedback.save();
    documentId = feedback._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Feedback.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /feedback endpoint
 * MATCHES TO: FR - 30
 */
it("GET /feedback", async (done) => {
    const response = await request(app).get('/feedback');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    expect(document.text).toBe('2021 Feedback')
    done();
});

// /**
//  * UNIT TEST - checks to see if POST for the /feedback/add endpoint will fail due to missing arguments
//  */
it("POST /feedback/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/feedback/add').send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
    
  });


// /**
//  * ACCEPTANCE TEST - checks to see if we are able to POST for the /feedback/add endpoint
//  * MATCHES TO: FR - 30
//  */
  it("POST /feedback/add", async (done) => {
 
    const response = await request(app).post('/feedback/add').send({
        text: "Added feedback",
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("feedback successfully added")
    expect(responseObj.feedback.text).toBe("Added feedback")
    done();
});

// /**
//  * ACCEPTANCE TEST - GET with a specific ID
//  * MATCHES TO: FR - 30
//  */
it("GET /feedback/:id", async (done) => {
    const response = await request(app).get('/feedback/' + documentId);
    expect(response.status).toBe(200);
    const document = response.body.feedback;
    expect(document.text).toBe('2021 Feedback')
    done();
  });


// /**
//  * ACCEPTANCE TEST - checks if we are able to edit an feedback with a specific ID
//  * MATCHES TO: FR-10
//  */
it("EDIT /feedback/:id", async (done) => {
    const response = await request(app).post('/feedback/edit/' + documentId).send({
        "text": "2021 editted feedback"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.msg).toBe('feedback successfully updated')
    done();
});

// /**
//  * UNIT TEST - checks to see if POST for the /feedback/edit/:id endpoint will fail due to missing info
//  */
it("EDIT /feedback/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/feedback/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});


// /**
//  * ACCEPTANCE TEST - checks if we are able to delete an feedback with a specific ID
//  * MATCHES TO: FR-30
//  */
it("DELETE /feedback/:id", async (done) => {
    const response = await request(app).delete('/feedback/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("feedback deleted successfully!")
    done();
});

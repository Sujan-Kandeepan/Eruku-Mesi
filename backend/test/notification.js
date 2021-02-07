/**
 * The following script tests the notification page
 * Please ensure that the MongoDB notification database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let Notification = require("../model/notification.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "receiver": "sample receiver",
        "body": "sample body"
    }
    const notification = new Notification(sample);
    await notification.save();
    documentId = notification._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Notification.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /notifications endpoint
 * MATCHES TO: FR - 1, FR - 8
 */
it("GET /notifications", async (done) => {
    const response = await request(app).get('/notifications');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    expect(document.title).toBe('2021 Reunion In Maryland')
    expect(document.date).toBe('2021-01-10T19:39:21.903Z')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /notifications/add endpoint will fail due to missing arguments
 */
it("POST /notifications/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/notifications/add').send({
        title: "2021 Reunion In Maryland"
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
    
  });


/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /notifications/add endpoint
 * MATCHES TO: FR - 9
 */
  it("POST /notifications/add", async (done) => {
 
    const response = await request(app).post('/notifications/add').send({
        title: "2021 Reunion In Maryland",
        date: "2021-01-10T19:39:21.903Z"
    });
    
    const responseObj = JSON.parse(response.text);
    // console.log('message', responseObj);
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("notification successfully added")
    expect(responseObj.notification.title).toBe("2021 Reunion In Maryland")
    expect(responseObj.notification.date).toBe("2021-01-10T19:39:21.903Z")

    done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 * MATCHES TO: FR - 8
 */
it("GET /notifications/:id", async (done) => {
    const response = await request(app).get('/notifications/' + documentId);
    expect(response.status).toBe(200);
    const document = response.body.notification;
    expect(document.title).toBe('2021 Reunion In Maryland')
    expect(document.date).toBe('2021-01-10T19:39:21.903Z')

    done();
    
  });


/**
 * ACCEPTANCE TEST - checks if we are able to edit an event with a specific ID
 * MATCHES TO: FR-10
 */
it("EDIT /notifications/:id", async (done) => {
    const response = await request(app).post('/notifications/edit/' + documentId).send({
        "title": "2021 Reunion In Toronto"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.msg).toBe('notification successfully updated')
    console.log("responseObj",responseObj)
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /notifications/edit/:id endpoint will fail due to missing info
 */
it("EDIT /notifications/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/notifications/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});


/**
 * ACCEPTANCE TEST - checks if we are able to delete an notification with a specific ID
 * MATCHES TO: FR-11
 */
it("DELETE /notifications/:id", async (done) => {
    const response = await request(app).delete('/notifications/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("notification deleted successfully!")
    done();
});
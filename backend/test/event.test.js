/**
 * The following script tests the events page
 * Please ensure that the MongoDB events database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let Event = require("../model/event.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "media": [],
        "title": "2021 Reunion In Maryland",
        "type": "reunion",
        "desc": "2021 Reunion In Maryland by EPU North America, INC",
        "date": "2021-01-10T19:39:21.903Z"
    }
    const event = new Event(sample);
    await event.save();
    documentId = event._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Event.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /events endpoint
 */
it("GET /events", async (done) => {
    const response = await request(app).get('/events');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    expect(document.title).toBe('2021 Reunion In Maryland')
    expect(document.date).toBe('2021-01-10T19:39:21.903Z')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /events/add endpoint will fail due to missing arguments
 */
it("POST /events/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/events/add').send({
        title: "2021 Reunion In Maryland"
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
    
  });


/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /events/add endpoint
 */
  it("POST /events/add", async (done) => {
 
    const response = await request(app).post('/events/add').send({
        title: "2021 Reunion In Maryland",
        date: "2021-01-10T19:39:21.903Z"
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("event successfully added")
    expect(responseObj.event.title).toBe("2021 Reunion In Maryland")
    expect(responseObj.event.date).toBe("2021-01-10T19:39:21.903Z")

    done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 */
it("GET /events/:id", async (done) => {
    const response = await request(app).get('/events/' + documentId);
    expect(response.status).toBe(200);
    const document = response.body.event;
    expect(document.title).toBe('2021 Reunion In Maryland')
    expect(document.date).toBe('2021-01-10T19:39:21.903Z')

    done();
    
  });


/**
 * ACCEPTANCE TEST - checks if we are able to edit an event with a specific ID
 */
it("EDIT /events/:id", async (done) => {
    const response = await request(app).post('/events/edit/' + documentId).send({
        "title": "2021 Reunion In Toronto"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.msg).toBe('event successfully updated')
    console.log("responseObj",responseObj)
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /events/edit/:id endpoint will fail due to missing info
 */
it("EDIT /events/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/events/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});


/**
 * ACCEPTANCE TEST - checks if we are able to delete an event with a specific ID
 */
it("DELETE /events/:id", async (done) => {
    const response = await request(app).delete('/events/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("event deleted successfully!")
    done();
});

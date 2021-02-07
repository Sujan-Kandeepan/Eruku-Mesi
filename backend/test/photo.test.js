/**
 * The following script tests the events page
 * Please ensure that the MongoDB events database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let Photo = require("../model/photo.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "title": "Sample photo",
        "description": "Sample photo description",
        "image": "http://example.com"
    }
    const photo = new Photo(sample);
    await photo.save();
    documentId = photo._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Photo.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /photos endpoint
 * MATCHES TO: FR - 1, FR - 8
 */
it("GET /photos", async (done) => {
    const response = await request(app).get('/photos');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    expect(document.title).toBe('Sample photo')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /photos/add endpoint will fail due to missing arguments
 */
it("POST /photos/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/photos/add').send({
        name: "Sample photo",
        
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
    
  });


/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /photos/add endpoint
 * MATCHES TO: FR - 9
 */
  it("POST /photos/add", async (done) => {
 
    const response = await request(app).post('/photos/add').send({
        title: "Sample photo",
        image: "http://example.com"
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("photo successfully added")

    done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 * MATCHES TO: FR - 8
 */
it("GET /photos/:id", async (done) => {
    const response = await request(app).get('/photos/' + documentId);
    expect(response.status).toBe(200);
    const document = response.body.photo;
    expect(document.title).toBe('Sample photo')

    done();
    
  });


/**
 * ACCEPTANCE TEST - checks if we are able to edit an photo with a specific ID
 * MATCHES TO: FR-10
 */
it("EDIT /photos/:id", async (done) => {
    const response = await request(app).post('/photos/edit/' + documentId).send({
        "title": "Sample title 2"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.message).toBe('photo successfully updated')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /photos/edit/:id endpoint will fail due to missing info
 */
it("EDIT /photos/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/photos/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});


/**
 * ACCEPTANCE TEST - checks if we are able to delete an photo with a specific ID
 * MATCHES TO: FR-11
 */
it("DELETE /photos/:id", async (done) => {
    const response = await request(app).delete('/photos/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("photo deleted successfully!")
    done();
});
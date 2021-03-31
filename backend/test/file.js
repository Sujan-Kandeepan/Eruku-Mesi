/**
 * The following script tests the files page
 * Please ensure that the MongoDB files database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let File = require("../model/file.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "title": "Sample file",
        "url": "Sample file description"
    }
    const file = new File(sample);
    await file.save();
    documentId = file._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    File.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /files endpoint
 */
it("GET /files", async (done) => {
    const response = await request(app).get('/files');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    expect(document.title).toBe('Sample file')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /files/add endpoint will fail due to missing arguments
 */
it("POST /files/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/files/add').send({
        name: "Sample file",
        
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
    
  });


/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /files/add endpoint
 */
  it("POST /files/add", async (done) => {
 
    const response = await request(app).post('/files/add').send({
        title: "Sample file",
        url: "http://example.com"
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("file successfully added")

    done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 */
it("GET /files/:id", async (done) => {
    const response = await request(app).get('/files/' + documentId);
    expect(response.status).toBe(200);
    const document = response.body.file;
    expect(document.title).toBe('Sample file')

    done();
    
  });


/**
 * ACCEPTANCE TEST - checks if we are able to edit an file with a specific ID
 */
it("EDIT /files/:id", async (done) => {
    const response = await request(app).post('/files/edit/' + documentId).send({
        "title": "Sample title 2"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.msg).toBe('file successfully updated')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /files/edit/:id endpoint will fail due to missing info
 */
it("EDIT /files/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/files/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});


/**
 * ACCEPTANCE TEST - checks if we are able to delete an file with a specific ID
 */
it("DELETE /files/:id", async (done) => {
    const response = await request(app).delete('/files/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("file deleted successfully!")
    done();
});
/**
 * Please ensure that the MongoDB accounts database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let Account = require("../model/account.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "username": "SampleUser",
        "firstName": "SampleName",
        "lastName": "SampleLast",
        "phone": "123 123 1111",
        "hash": "samplesdas24525344334534erew@#@#",
        "salt": "samplesalt",
        "email": "sample@email.com"

    }
    const account = new Account(sample);
    await account.save();
    documentId = account._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Account.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /accounts endpoint
 */
it("GET /accounts", async (done) => {
    const response = await request(app).get('/accounts');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    
    expect(document.username).toBe('SampleUser')
    expect(document.firstName).toBe('SampleName')
    expect(document.lastName).toBe('SampleLast')
    expect(document.phone).toBe("123 123 1111")
    
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /accounts/add endpoint will fail due to missing arguments
 */
it("POST /accounts/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/accounts/add').send({
        username: "SAMPLETEST"
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
  });


/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /accounts/add endpoint
 */
  it("POST /accounts/add", async (done) => {
 
    const response = await request(app).post('/accounts/add').send({
        "username": "SampleUser2",
        "firstName": "SampleName2",
        "lastName": "SampleLast2",
        "phone": "123 123 1112",
        "hash": "samplesdas24525344334534erew@#@2",
        "salt": "samplesalt2",
        "email": "sample2@email.com"
    });

    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(200);
    done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 */
it("GET /accounts/:id", async (done) => {
    const response = await request(app).get('/accounts/' + documentId);

    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body.user;
    expect(document.username).toBe('SampleUser')
    expect(document.firstName).toBe('SampleName')
    expect(document.lastName).toBe('SampleLast')
    expect(document.phone).toBe("123 123 1111")
    done();   
  });


/**
 * ACCEPTANCE TEST - checks if we are able to edit an account with a specific ID
 */
it("EDIT /accounts/:id", async (done) => {
    const response = await request(app).post('/accounts/edit/' + documentId).send({
        "username": "Edited Username"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.msg).toBe('account successfully updated')
    done();
});


/**
 * UNIT TEST - checks to see if POST for the /accounts/edit/:id endpoint will fail due to missing info
 */
it("EDIT /accounts/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/accounts/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});


/**
 * ACCEPTANCE TEST - checks if we are able to delete an account with a specific ID
 */
it("DELETE /accounts/:id", async (done) => {
    const response = await request(app).delete('/accounts/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("account deleted successfully!")
    done();
});
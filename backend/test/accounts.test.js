/**
 * Please ensure that the MongoDB events database has not been created before this script runs.
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
        "salt": "samplesalt"

    }
    const account = new Account(sample);
    await account.save();
    documentId = account._id;
    // console.log('account', account)
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Account.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /events endpoint
 * MATCHES TO: FR - 1
 */
it("GET /accounts", async (done) => {
    const response = await request(app).get('/accounts');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    // console.log(document)
    expect(responseArrayLength).toBe(1);
    expect(document.username).toBe('SampleUser')
    expect(document.firstName).toBe('SampleName')
    expect(document.lastName).toBe('SampleLast')
    expect(document.phone).toBe("123 123 1111")
    expect(document.hash).toBe("samplesdas24525344334534erew@#@#")
    expect(document.salt).toBe("samplesalt")
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
 * MATCHES TO: FR - 9
 */
  it("POST /accounts/add", async (done) => {
 
    const response = await request(app).post('/accounts/add').send({
        "username": "SampleUser2",
        "firstName": "SampleName2",
        "lastName": "SampleLast2",
        "phone": "123 123 1112",
        "hash": "samplesdas24525344334534erew@#@2",
        "salt": "samplesalt2"
    });
    
    const responseObj = JSON.parse(response.text);
    // console.log('message', responseObj);
    expect(response.status).toBe(200);
    expect(responseObj.account.username).toBe("SampleUser2")
    expect(responseObj.account.firstName).toBe("SampleName2")
    expect(responseObj.account.lastName).toBe("SampleLast2")
    expect(responseObj.account.phone).toBe("123 123 1112")
    expect(responseObj.account.hash).toBe("samplesdas24525344334534erew@#@2")
    expect(responseObj.account.salt).toBe("samplesalt2")
    done();
});

/**
 * ACCEPTANCE TEST
 * GET with a specific ID
 */
it("GET /accounts/:id", async (done) => {
    const response = await request(app).get('/accounts/' + documentId);
    // console.log(documentId)
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body.account;
    // console.log(response.body)    
    // expect(responseArrayLength).toBe(1);
    expect(document.username).toBe('SampleUser')
    expect(document.firstName).toBe('SampleName')
    expect(document.lastName).toBe('SampleLast')
    expect(document.phone).toBe("123 123 1111")
    expect(document.hash).toBe("samplesdas24525344334534erew@#@#")
    expect(document.salt).toBe("samplesalt")
    done();   
  });


/**
 * TODO
 * Event.keys is not a function ??!?!?!?
 */
// it("EDIT /accounts/:id EXPECT ERROR", async (done) => {
//     // const response = await request(app).post('/accounts/edit/' + documentId).send({
//     // });

//     done();
// });


/**
 * Still needs to be worked on
 */
it("DELETE /accounts/:id", async (done) => {
    const response = await request(app).delete('/accounts/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("account deleted successfully!")
    done();
});

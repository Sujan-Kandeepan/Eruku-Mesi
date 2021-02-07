/**
 * Please ensure that the MongoDB accounts database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');

let NewsStory = require("../model/newsStory.js");
let documentId;

/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "title": "SampleTitle",
        "content": "SampleContent",
        "description": "TESTdesc",
    }
    const newsStory = new NewsStory(sample);
    await newsStory.save();
    documentId = newsStory._id;
    // console.log('account', account)
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    NewsStory.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /accounts endpoint
 * MATCHES TO: FR - 1
 */
it("GET /newsStories", async (done) => {
    const response = await request(app).get('/newsStories');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    // console.log(document)
    expect(responseArrayLength).toBe(1);
    expect(document.title).toBe('SampleTitle')
    expect(document.content).toBe('SampleContent')
    expect(document.description).toBe('TESTdesc')
    done();
});

// /**
//  * UNIT TEST - checks to see if POST for the /accounts/add endpoint will fail due to missing arguments
//  */
it("POST /newsStories/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/newsStories/add').send({
        title: "SAMPLETEST"
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("Mandatory field is not set")
    done();
  });


// /**
//  * ACCEPTANCE TEST - checks to see if we are able to POST for the /accounts/add endpoint
//  * MATCHES TO: FR - 9
//  */
  it("POST /newsStories/add", async (done) => {
 
    const response = await request(app).post('/newsStories/add').send({
        "title": "SampleTitle2",
        "content": "SampleContent2",
        "description": "TESTdesc2",
    });
    
    const responseObj = JSON.parse(response.text);
    console.log('message', responseObj);
    // expect(response.status).toBe(200);
    expect(responseObj.newsStories.title).toBe("SampleTitle2")
    expect(responseObj.newsStories.content).toBe("SampleContent2")
    expect(responseObj.newsStories.description).toBe("TESTdesc2")
    done();
});

// /**
//  * ACCEPTANCE TEST - checks if we are able to get a newsStory with a specific ID
// *  MATCHES TO: FR-8
//  */
it("GET /newsStories/:id", async (done) => {
    const response = await request(app).get('/newsStories/' + documentId);
    console.log(documentId)
    expect(response.status).toBe(200);
    // const responseArrayLength = response.body.length;
    // console.log(response.body)
    const document = response.body.newsStory;
    // console.log(response.body.newsStory.title)    
    // expect(responseArrayLength).toBe(1);
    expect(document.title).toBe('SampleTitle')
    expect(document.description).toBe('TESTdesc')
    expect(document.content).toBe('SampleContent')
    done();   
  });

/**
 * UNIT TEST - checks to see if POST for the /newsStories/edit/:id endpoint will fail due to missing info
 */
it("EDIT /newsStories/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/newsStories/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.message).toBe("No field to update with")
    done();
});

/**
 * ACCEPTANCE TEST - checks if we are able to edit an newsStory with a specific ID
 * MATCHES TO: FR-10
 */
it("EDIT /newsStories/:id", async (done) => {
    const response = await request(app).post('/newsStories/edit/' + documentId).send({
        "title": "Edited TITLE"
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.message).toBe('newsStory successfully updated')
    done();
});


// /**
//  * ACCEPTANCE TEST - checks if we are able to delete an newsStory with a specific ID
//  * MATCHES TO: FR - 15
//  */
it("DELETE /newsStories/:id", async (done) => {
    const response = await request(app).delete('/newsStories/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.message).toBe("newsStory deleted successfully!")
    done();
});
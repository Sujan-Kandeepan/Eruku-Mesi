/**
 * The following script tests the messages page
 * Please ensure that the MongoDB message database has not been created before this script runs.
 */

const request = require('supertest');
const app = require('../setup.js');
const mongoose = require("mongoose");

let Message = require("../model/message.js");
let documentId;
/**
 * This runs before each test case
 */
beforeEach(async ()=> {
    const sample = {
        "sender": mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        "message": "sample message"
    }
    const message = new Message(sample);
    await message.save();
    documentId = message._id;
})

/**
 * This runs after each test case
 */
afterEach(async() => {
    Message.collection.drop();
})

/**
 * ACCEPTANCE TEST - checks to see if we are able to GET for the /messages endpoint
 */
it("GET /messages", async (done) => {
    const response = await request(app).get('/messages');
    expect(response.status).toBe(200);
    const responseArrayLength = response.body.length;
    const document = response.body[0];
    expect(responseArrayLength).toBe(1);
    expect(document.sender).toEqual("507f1f77bcf86cd799439011");
    expect(document.message).toBe('sample message')
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /messages/add endpoint will fail due to missing arguments
 */
it("POST /messages/add EXPECT ERROR", async (done) => {
 
    const response = await request(app).post('/messages/add').send({
        sender: mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.msg).toBe("Mandatory field is not set")
    done();
    
  });


/**
 * ACCEPTANCE TEST - checks to see if we are able to POST for the /messages/add endpoint
 */
  it("POST /messages/add", async (done) => {
 
    const response = await request(app).post('/messages/add').send({
        sender: mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        message: "sample message"
    });
    
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(responseObj.msg).toBe("message successfully added")
    expect(responseObj.message.sender).toEqual("507f1f77bcf86cd799439011");
    expect(responseObj.message.message).toBe("sample message")

    done();
});

/**
 * ACCEPTANCE TEST - GET with a specific ID
 */
it("GET /messages/:id", async (done) => {
    const response = await request(app).get('/messages/' + documentId);
    expect(response.status).toBe(200);
    const document = response.body.message;
    expect(document.sender).toEqual("507f1f77bcf86cd799439011");
    expect(document.message).toBe('sample message')

    done();
    
  });


/**
 * ACCEPTANCE TEST - checks if we are able to edit an event with a specific ID
 */
it("EDIT /messages/:id", async (done) => {
    const response = await request(app).post('/messages/edit/' + documentId).send({
        "sender": mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    });
    const responseObj = JSON.parse(response.text);
    expect(responseObj.msg).toBe('message successfully updated')
    
    done();
});

/**
 * UNIT TEST - checks to see if POST for the /messages/edit/:id endpoint will fail due to missing info
 */
it("EDIT /messages/:id EXPECT ERROR", async (done) => {
    const response = await request(app).post('/messages/edit/' + documentId).send({
    });
    const responseObj = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseObj.status).toBe("error")
    expect(responseObj.msg).toBe("No field to update with")
    done();
});


/**
 * ACCEPTANCE TEST - checks if we are able to delete an message with a specific ID
 */
it("DELETE /messages/:id", async (done) => {
    const response = await request(app).delete('/messages/' + documentId);
    const responseObj = response.body;
    expect(response.status).toBe(200);
    expect(responseObj.msg).toBe("message deleted successfully!")
    done();
});
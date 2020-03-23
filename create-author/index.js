// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

let response;

exports.handler = async (event, context) => {
  // const ret = await axios(url);
  const { firstname, lastname } = JSON.parse(event.body);
  const id = Buffer.from(firstname).toString("base64");

  const params = {
    TableName: "Authors",
    Item: {
      id,
      firstname,
      lastname
    }
  };
  try {
    await db.put(params).promise();

    response = {
      statusCode: 201,
      body: JSON.stringify({
        message: "Author created"
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

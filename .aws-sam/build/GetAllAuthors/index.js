// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

let response;

exports.handler = async (event, context) => {
  try {
    const authors = (await db.scan({ TableName: "Authors" }).promise()).Items;

    response = {
      statusCode: 200,
      body: JSON.stringify(authors)
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      })
    };
  }

  return response;
};

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
import { DynamoDB } from "aws-sdk";
const db = new DynamoDB.DocumentClient();

let response;

export async function handler(event, context) {
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
}

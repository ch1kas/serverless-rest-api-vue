const AWS = require("aws-sdk")

const getAllVisitors = async (event) => {

  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  let visitors;

  try {
    const results = await dynamoDB.scan({ TableName: "VisitorTable"}).promise()
    visitors = results.Items
  } catch (error) {
    console.log(error);
  }


  return {
    statusCode: 200,
    body: JSON.stringify(visitors),
  };
};

module.exports = {
  handler: getAllVisitors
}
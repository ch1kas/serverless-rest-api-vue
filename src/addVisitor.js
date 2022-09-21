const { v4 } = require("uuid")
const AWS = require("aws-sdk")

const addVisitor = async (event) => {


  const dynamoDB = new AWS.DynamoDB.DocumentClient()

  const {firstName, lastName} = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  console.log("This is an id", id)

  const newVisitor = {
    id,
    firstName,
    lastName,
    createdAt
  }

  await dynamoDB.put({
    TableName: "VisitorTable",
    Item: newVisitor
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newVisitor),
  };
};

module.exports = {
  handler: addVisitor
}
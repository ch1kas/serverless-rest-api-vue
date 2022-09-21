const AWS = require("aws-sdk")

const getVisitor = async (event) => {

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let visitor;

  try {
    const result = await dynamoDB.get({ TableName: "VisitorTable", Key: { id }}).promise()
    visitor = result.Item
  } catch (error) {
    console.log(error);
  }


  return {
    statusCode: 200,
    body: JSON.stringify(visitor),
  };
};

module.exports = {
  handler: getVisitor
}
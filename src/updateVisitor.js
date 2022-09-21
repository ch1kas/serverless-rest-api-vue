const { v4 } = require("uuid")
const AWS = require("aws-sdk")

const updateVisitor = async (event) => {


  const dynamoDB = new AWS.DynamoDB.DocumentClient()

  const {firstName, lastName} = JSON.parse(event.body);
  const { id } = event.pathParameters;


  await dynamoDB.update({
        TableName: "VisitorTable",
        Key: { id },
        UpdateExpression: 'set firstName = :firstName, lastName = :lastName',
        ExpressionAttributeValues: {
            ':firstName': firstName,
            ':lastName': lastName
        },
        ReturnValues: "ALL_NEW"
      }).promise()
      


  return {
    statusCode: 200,
    body: JSON.stringify({
        msg: "Visitor Updated"
    }
        
    ),
  };
};

module.exports = {
  handler: updateVisitor
}
const AWS = require("aws-sdk")

const removeVisitor = async (event) => {


  const dynamoDB = new AWS.DynamoDB.DocumentClient()

  const { id } = event.pathParameters;


  await dynamoDB.delete({
        TableName: "VisitorTable",
        Key: { id }
      }).promise()
      


  return {
    statusCode: 200,
    body: JSON.stringify({
        msg: "Visitor Deleted"
    }
        
    ),
  };
};

module.exports = {
  handler: removeVisitor
}
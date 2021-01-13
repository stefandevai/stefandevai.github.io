exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "It works!", params: event.body })
  };
}

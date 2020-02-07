import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";

import { getWeatherByZip as getWeather } from "./src/services/weather";

export const getWeatherByZip: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters) {
    const callbackResponse = {
      statusCode: 400,
      body: JSON.stringify({
        message: "Zip code query param must be provided! (e.g. ?zipCode=10001)"
      })
    };

    callback(null, callbackResponse);
  }

  const { zipCode } = event.queryStringParameters;

  const results = await getWeather(zipCode, callback);

  const response = {
    statusCode: 200,
    body: results
  };

  return response;
};

import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import statusCode from "http-status";

import { getWeatherByZip as getWeather } from "./src/services/weather";

export const getWeatherByZip: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters) {
    const callbackResponse = {
      statusCode: statusCode.BAD_REQUEST,
      body: JSON.stringify({
        message: "Zip code query param must be provided! (e.g. ?zipCode=10001)"
      })
    };

    callback(null, callbackResponse);
  }

  const { zipCode, units } = event.queryStringParameters;

  const results = await getWeather(zipCode, units, callback);

  const response = {
    statusCode: statusCode.OK,
    body: results
  };

  return response;
};

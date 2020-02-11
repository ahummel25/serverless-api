import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import { graphql } from "graphql";
import statusCode from "http-status";

import schema from "./graphql/schema";
//import { getWeatherByZip as getWeather } from "./src/services/weather";

export const getWeatherByZip: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const parsedRequestBody = event && event.body ? JSON.parse(event.body) : {};

  console.log(parsedRequestBody);

  try {
    const graphQLResult = await graphql(
      schema,
      parsedRequestBody.query,
      null,
      null,
      parsedRequestBody.variables,
      parsedRequestBody.operationName
    );

    return { statusCode: statusCode.OK, body: JSON.stringify(graphQLResult) };
  } catch (error) {
    throw error;
  }
};

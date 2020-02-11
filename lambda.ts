import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import { graphql } from "graphql";
import statusCode from "http-status";

import schema from "./graphql/schema";

export const getWeatherByZip: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const parsedRequestBody = event && event.body ? JSON.parse(event.body) : {};

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

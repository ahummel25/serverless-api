import { APIGatewayProxyCallback } from "aws-lambda";
import rp from "request-promise-native";

export const getWeatherByZip = async (
  zipCode: string,
  callback: APIGatewayProxyCallback
): Promise<any> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${process.env.WEATHER_API_KEY}`;

  try {
    const response = await rp(url);
    return response;
  } catch (err) {
    const { error } = err;

    let body = error;

    if (typeof error === "object") {
      body = JSON.stringify(error);
    }

    const callbackResponse = {
      statusCode: err.statusCode,
      body
    };

    callback(null, callbackResponse);
  }
};

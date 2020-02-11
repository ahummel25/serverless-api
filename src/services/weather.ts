import rp, { RequestPromise } from "request-promise-native";

export const getWeatherByZip = async (
  zipCode: string,
  units: string = "imperial"
): Promise<RequestPromise | any> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${process.env.WEATHER_API_KEY}&units=${units}`;

  try {
    const response = await rp(url);
    return response;
  } catch (err) {
    const { error } = err;

    let body = error;

    if (typeof error === "object") {
      body = JSON.stringify(error);
    }

    return {
      statusCode: err.statusCode,
      body
    };
  }
};

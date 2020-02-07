import rp from "request-promise-native";

export const getWeatherByZip = async (zipCode: string): Promise<any> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${process.env.WEATHER_API_KEY}`;

  try {
    const response = await rp(url);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

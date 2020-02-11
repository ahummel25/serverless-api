import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

import { getWeatherByZip } from "../src/services/weather";
import { weatherByZipResponseType } from "./types";
import { GetWeatherByZipArgs } from "../types/interfaces";

const getWeatherByZipType = {
  getWeatherByZip: {
    args: {
      zipCode: { type: new GraphQLNonNull(GraphQLString) },
      units: { type: GraphQLString }
    },
    type: weatherByZipResponseType,
    resolve: (_parent: any, args: GetWeatherByZipArgs) => {
      return getWeatherByZip(args.zipCode, args.units);
    }
  }
};

const query = new GraphQLObjectType({
  name: "GetWeather",
  fields: {
    ...getWeatherByZipType
  }
});

export default query;

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

const weatherType = new GraphQLObjectType({
  name: "WeatherType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    main: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    icon: { type: GraphQLString }
  }
});

const weatherByZipResponseType = new GraphQLObjectType({
  name: "WeatherResponseType",
  fields: {
    coord: {
      type: new GraphQLObjectType({
        name: "CoordinatesByZip",
        fields: {
          lon: { type: new GraphQLNonNull(GraphQLInt) },
          lat: { type: new GraphQLNonNull(GraphQLInt) }
        }
      })
    },
    weather: {
      type: new GraphQLList(weatherType)
    },
    base: { type: GraphQLString },
    main: {
      type: new GraphQLObjectType({
        name: "MainWeatherTypeByZip",
        fields: {
          temp: { type: GraphQLString },
          feels_like: { type: GraphQLString },
          temp_min: { type: GraphQLString },
          temp_max: { type: GraphQLString },
          pressure: { type: GraphQLString },
          humidity: { type: GraphQLString }
        }
      })
    }
  }
});

export { weatherByZipResponseType };

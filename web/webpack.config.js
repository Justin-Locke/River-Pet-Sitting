const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

// Get the name of the appropriate environment variable (`.env`) file for this build/run of the app
const dotenvFile = process.env.API_LOCATION ? `.env.${process.env.API_LOCATION}` : '.env';

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "static_assets", to: "../",
          globOptions: {
            ignore: ["**/.DS_Store"],
          },
        },
      ],
    }),
    new Dotenv({ path: dotenvFile }),
  ],
  optimization: {
    usedExports: true
  },
  entry: {

    updateReservation: path.resolve(__dirname, 'src', 'pages', 'updateReservation.js'),
    viewAllReservations: path.resolve(__dirname, 'src', 'pages', 'viewAllReservations.js'),
    viewReservation: path.resolve(__dirname, 'src', 'pages', 'viewReservation.js'),
    createReservation: path.resolve(__dirname, 'src', 'pages', 'createReservation.js'),
    viewPet: path.resolve(__dirname, 'src', 'pages', 'viewPet.js'),
    createPet: path.resolve(__dirname, 'src', 'pages', 'createPet.js'),
    test: path.resolve(__dirname, 'src', 'pages', 'index.js'),
    viewAllPets: path.resolve(__dirname, 'src', 'pages', 'viewAllPets.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build', 'assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'static_assets'),
    },
    port: 8000,
    client: {
      // overlay shows a full-screen overlay in the browser when there are js compiler errors or warnings
      overlay: true,
    },
  }
}

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  console.log("development");
  require("dotenv").config({ path: ".env.development" });
}

module.exports = env => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
      publicPath: "/assets"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: isProduction
            ? [
                {
                  loader: "file-loader",
                  options: {
                    name: "/img/[name].[ext]"
                  }
                }
              ]
            : [
                {
                  loader: "url-loader"
                }
              ]
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        ),
        "process.env.SEND_EMAIL": JSON.stringify(process.env.SEND_EMAIL),
        "process.env.SEND_EMAIL_PASS": JSON.stringify(
          process.env.SEND_EMAIL_PASS
        ),
        "process.env.REC_EMAIL": JSON.stringify(process.env.REC_EMAIL),
        "process.env.GOOGLE_CLIENT_ID": JSON.stringify(
          process.env.GOOGLE_CLIENT_ID
        ),
        "process.env.GOOGLE_SECRET": JSON.stringify(process.env.GOOGLE_SECRET),
        "process.env.GOOGLE_REFRESH": JSON.stringify(
          process.env.GOOGLE_REFRESH
        ),
        "process.env.GOOGLE_ACCESS": JSON.stringify(process.env.GOOGLE_ACCESS),
        "process.env.DATABASE_USER": JSON.stringify(process.env.DATABASE_USER),
        "process.env.DATABASE_PASSWORD": JSON.stringify(
          process.env.DATABASE_PASSWORD
        ),
        "process.env.DATABASE_HOST": JSON.stringify(process.env.DATABASE_HOST)
      })
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  };
};

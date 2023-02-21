const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    main: path.resolve("./src/Main/index.tsx"),
    background: path.resolve("./src/background/index.ts"),
    contentScript: path.resolve("./src/contentScript/index.tsx"),
    firebaseConfig: path.resolve("./src/firebase/firebaseConfig.ts"),
    categories: path.resolve("./src/firebase/db/categories.ts"),
    firebaseAbstractFile: path.resolve(
      "./src/firebase/db/firebaseAbstractFile.ts"
    ),
    prompt: path.resolve("./src/firebase/db/prompt.ts"),
  },
  module: {
    rules: [
      { use: "ts-loader", test: [/\.tsx$/, /\.ts$/], exclude: /node_modules/ },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader", // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /.css$/i,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...getHtmlPlugins(["main"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
  },
  
  // optimization: {
  //   splitChunks: {
  //     // include all types of chunks
  //     chunks: "all",
  //   },
  // },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

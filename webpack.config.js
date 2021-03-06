module.exports = {
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader',],
        },
        {
           test: /\.scss$/,
           exclude: /node_modules/,
           loaders : ['style-loader', 'css-loader', 'sass-loader',]
        },
    ]
  }
}
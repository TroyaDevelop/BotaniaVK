const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Добавляем импорт плагина

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true // Очистка директории dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    // Добавляем плагин для копирования ассетов
    new CopyPlugin({
      patterns: [
        { 
          from: 'assets', // Путь к папке с ассетами относительно корня проекта
          to: 'assets' // Путь назначения относительно output.path (dist)
        }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true,
    port: 3001, // Webpack dev server на порту 3001
    proxy: {
      '/api': {
        target: 'http://localhost:5173', // Express на порту 5173
        secure: false,
        changeOrigin: true
      }
    },
    // Разрешаем доступ с любого хоста (решает проблему Invalid Host header)
    allowedHosts: 'all',
    // Дополнительные настройки для решения проблем с хостами
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
};
const path = require('path');

module.exports = {
  entry: './src/index.js', // エントリポイント
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // 出力ファイル
  },
  mode: 'production', // 本番モード
};

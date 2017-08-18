module.exports = {
  test: /\.(js|jsx)?(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
	presets:[ 'es2015', 'react', 'stage-2' ]
  }
}

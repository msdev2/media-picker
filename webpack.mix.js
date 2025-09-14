const mix = require('laravel-mix');

mix.setPublicPath('dist');

mix.babelConfig({
  presets: [
    ['@babel/preset-env', { modules: false }]
  ],
  sourceType: 'unambiguous'
});
mix.disableNotifications();
mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.js$/,                // apply to normal .js
        exclude: /(node_modules)/,
        type: "javascript/auto",      // <-- critical: allow both import/export & require
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
            sourceType: "unambiguous"
          }
        }
      }
    ]
  }
});

mix.js('src/resources/assets/js/app.js', 'js/media-picker.js')
   .sass('src/resources/assets/scss/media-picker.scss', 'css/media-picker.css')
   .options({ processCssUrls: false });

if (mix.inProduction()) {
  mix.version();
}

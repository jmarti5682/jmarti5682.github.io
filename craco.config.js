module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add asset/source for .md files (webpack 5 way)
      webpackConfig.module.rules.push({
        test: /\.md$/,
        type: 'asset/source',
      });
      return webpackConfig;
    },
  },
};

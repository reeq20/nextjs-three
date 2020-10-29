const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      enforce: "pre",
      test: /\.(fs|vs|frag|vert|glsl)$/,
      loader: "raw-loader",
      exclude: /(node_modules)/,
    });

    return config;
  },
};

module.exports = nextConfig;

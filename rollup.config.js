import babel from "rollup-plugin-babel";
export default {
  input: "./index.js",
  output: {
    file: "bundle.min.js",
    format: "umd",
    name: "bundle",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
  ],
};

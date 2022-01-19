
module.exports = {
  babel: {
    pluguins: ["babel-plugin-macros"],
  },
  style: {
    postcss: {
      pluguins: [require("tailwindcss"), require("autoprefixer")],
  },
},
};

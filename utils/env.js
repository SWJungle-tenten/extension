module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: 5500,
  HOMEPAGE_ADDR: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://googlinghelper.shop",
  SERVER_ADDR: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://sangunlee.shop/api",
};

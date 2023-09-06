import "dotenv/config";
const config = {
  PORT: process.env.PORT || 4000,
  DB_IP: process.env.DB || "mongodb://127.0.0.1:27017/Persons&Groups",
};

// export VAR_NAME = proccess.env.VAR_NAME || default

export default config;

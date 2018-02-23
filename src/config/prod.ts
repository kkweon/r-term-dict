const config: IConfig = {
  api: process.env.API_URI || "",
  db: process.env.DB_URI || process.env.MONGODB_URI || "",
  env: "PRODUCTION",
  port: parseInt(process.env.PORT || "4000", 10),
};

export default config;

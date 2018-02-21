const config: IConfig = {
  db: process.env.DB_URI || "",
  env: "DEVELOPMENT",
  port: parseInt(process.env.PORT || "4000", 10),
};

export default config;

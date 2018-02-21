const config: IConfig = {
  db: process.env.DB_URI || "",
  env: "test",
  port: parseInt(process.env.PORT || "9000", 10),
};

export default config;

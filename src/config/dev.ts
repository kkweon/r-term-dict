const port = parseInt(process.env.PORT || "4000", 10);

const config: IConfig = {
  api: `http://localhost:${port}/api/words`,
  db: process.env.DB_URI || "",
  env: "DEVELOPMENT",
  port,
};

export default config;

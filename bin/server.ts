import config from "../src/config";
import app from "../src/server";

app.listen(config.port, () => {
  console.log(`[SUCCESS] Server start at http://0.0.0.0:${config.port}`);
});

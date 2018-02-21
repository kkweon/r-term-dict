import mongoose from "mongoose";
import config from "../../config";

mongoose.connect(config.db).catch((err: any) => {
  console.error("[FAIL] Mongoose connecion");
  console.error(err);
});

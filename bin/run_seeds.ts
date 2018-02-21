import * as fs from "fs";
import mongoose from "mongoose";
import * as path from "path";

import config from "../src/config";
import { Word } from "../src/server/words";
import { IWord } from "../src/server/words/model";

interface ISeedData {
  data: IWord[];
}

let READY_TO_CLOSE: boolean = false;
mongoose
  .connect(config.db)
  .then((server: typeof mongoose) => {
    fs.readFile(
      path.resolve(__dirname, "../data/words.json"),
      "utf-8",
      (err, data) => {
        if (err) throw new Error(err.message);

        const words: ISeedData = JSON.parse(data);
        Word.create(words.data)
          .then(res => {
            console.log("[SUCCESS] ", res);
            server.connection.close();
            READY_TO_CLOSE = true;
          })
          .catch((err: any) => {
            console.error("[FAIL] ", err);
            server.connection.close();
            READY_TO_CLOSE = true;
          });
      },
    );
  })
  .catch((err: any) => {
    console.error("[FAIL] Mongoose connection. ", err);
  });

(function wait() {
  if (!READY_TO_CLOSE) setTimeout(wait, 1000);
})();

import * as express from "express";
import WordController from "./controller";

const router: express.Router = express.Router();

router
  .route("/")
  .get(async (_, res) => {
    const words = await WordController.getAll();
    res.json({ data: words });
  })
  .post(async (req, res) => {
    const word = await WordController.create(req.body);
    if (word) {
      res.send({ data: word });
    } else {
      res.send({ data: false, message: "Fail to create" });
    }
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const id = req.params.id;
    const result = await WordController.updateWordById(id, req.body);
    if (result) {
      res.json({ data: result });
    } else {
      res.json({ data: null, message: "Fail to update" });
    }
  })
  .delete(async (req, res) => {
    const result = await WordController.removeById(req.params.id);
    if (result) {
      res.json({ data: req.params.id });
    } else {
      res.json({ data: false });
    }
  });

export default router;

export { Word } from "./model";

import mongoose from "mongoose";
import config from "../../src/config";
import request = require("supertest");
import { expect } from "chai";
import Server from "../../src/server";
import { IWordModel } from "../../src/server/words/model";

describe("/", function() {
  it("returns 200", function(done) {
    request(Server)
      .get("/")
      .expect(200, done);
  });
});

describe("/api/words", function() {
  const helperFn = cb => {
    mongoose.connect(config.db).then(() => {
      cb();
    });
  };
  after(() => {
    mongoose.connection.close();
  });
  it("returns 200", function(done) {
    helperFn(() => {
      request(Server)
        .get("/api/words")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res: request.Response) => {
          const data = res.body.data;
          expect(data).to.be.an("Array").to.be.not.empty;
          done();
        })
        .catch((err: any) => {
          done(err);
        });
    });
  });

  it("can POST", function(done) {
    helperFn(() => {
      request(Server)
        .post("/api/words")
        .send({
          en: "San Mateo",
          ko: "산마테오",
        })
        .expect(200)
        .then(res => {
          const word = res.body.data;
          expect(word).to.include.all.keys("en", "ko");
          expect(word["en"]).to.equal("San Mateo");
          done();
        })
        .catch(err => done(err));
    });
  });

  it("can DELETE", function(done) {
    helperFn(() => {
      request(Server)
        .get("/api/words")
        .then(res => {
          const words = res.body.data;
          const id = words[0]._id;
          request(Server)
            .delete(`/api/words/${id}`)
            .expect(200)
            .then(res => {
              expect(res.body.data).to.be.true;
              done();
            })
            .catch(err => {
              done(err);
            });
        })
        .catch(err => {
          done(err);
        });
    });
  });

  it("can UPDATE", function(done) {
    helperFn(() => {
      request(Server)
        .get("/api/words")
        .then(res => {
          const word = res.body.data[0];

          const newData = {
            en: "HEEEEEEELO",
            ko: "WFFFFFFFFF",
          };

          request(Server)
            .put(`/api/words/${word._id}`)
            .send(newData)
            .expect(200)
            .then(res => {
              const newWord = res.body.data;
              expect(newWord["en"]).to.be.equal(newData.en);
              expect(newWord["ko"]).to.be.equal(newData.ko);
              done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });
  });
});

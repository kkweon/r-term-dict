import mongoose from "mongoose";

export interface IWord {
  en: string;
  ko: string;
}

export interface IWordModel extends IWord, mongoose.Document {
  en: string;
  ko: string;
}

const wordSchema = new mongoose.Schema({
  en: {
    required: true,
    type: String,
  },
  ko: {
    required: true,
    type: String,
  },
});

export const Word: mongoose.Model<IWordModel> = mongoose.model<IWordModel>("Word", wordSchema);

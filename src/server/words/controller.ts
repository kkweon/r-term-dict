import { IWord, IWordModel, Word } from "./model";

export default class WordController {
  public static async getAll(): Promise<IWordModel[]> {
    try {
      return await Word.find().exec();
    } catch (e) {
      return [];
    }
  }

  public static async updateWordById(
    id: string,
    newInfo: IWordModel,
  ): Promise<IWordModel | null> {
    return await Word.findByIdAndUpdate(id, newInfo, { new: true }).exec();
  }

  public static async removeById(id: string) {
    return await Word.findByIdAndRemove(id).exec();
  }

  public static async create(word: IWord) {
    try {
      return await new Word(word).save();
    } catch (err) {
      return null;
    }
  }
}

import axios from "axios";
import { IWordModel } from "../../server/words/model";
import {
  ActionTypes,
  IDeleteWord,
  IFetchWords,
  IUpdateWord,
  ICreateWord,
} from "./types";

const URL = process.env.API_URI || "http://localhost:4000/api/words";

export function fetchWords(): IFetchWords {
  const payload = axios.get<IWordModel[]>(URL);

  return {
    payload,
    type: ActionTypes.FETCH_WORD,
  };
}

export function updateWord(id: string, en: string, ko: string): IUpdateWord {
  const payload = axios.put<IWordModel>(`${URL}/${id}`, { en, ko });

  return {
    payload,
    type: ActionTypes.UPDATE_WORD,
  };
}

export function deleteWord(id: string): IDeleteWord {
  const payload = axios.delete(`${URL}/${id}`);

  return {
    payload,
    type: ActionTypes.DELETE_WORD,
  };
}

export function createWord(word: IWord): ICreateWord {
  const payload = axios.post(`${URL}`, word);

  return {
    payload,
    type: ActionTypes.CREATE_WORD,
  };
}

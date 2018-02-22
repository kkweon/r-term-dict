import * as axios from "axios";
import { IWordModel } from "../../server/words/model";

export enum ActionTypes {
  FETCH_WORD = "FETCH_WORD",
  FETCH_WORD_FULFILLED = "FETCH_WORD_FULFILLED",

  UPDATE_WORD = "UPDATE_WORD",
  UPDATE_WORD_FULFILLED = "UPDATE_WORD_FULFILLED",

  DELETE_WORD = "DELETE_WORD",
  DELETE_WORD_FULFILLED = "DELETE_WORD_FULFILLED",
}

export interface IFetchWords {
  readonly type: ActionTypes.FETCH_WORD;
  readonly payload: axios.AxiosPromise<IWordModel[]>;
}

interface IServerMultiResponse {
  data: IWordModel[];
}

interface IServerResponse {
  data: IWordModel;
}

interface IServereDeleteResponse {
  data: string | false;
}

export interface IFetchWordsDone {
  readonly type: ActionTypes.FETCH_WORD_FULFILLED;
  readonly payload: axios.AxiosResponse<IServerMultiResponse>;
}

export interface IUpdateWord {
  readonly type: ActionTypes.UPDATE_WORD;
  readonly payload: axios.AxiosPromise<IWordModel>;
}

export interface IUpdateWordDone {
  readonly type: ActionTypes.UPDATE_WORD_FULFILLED;
  readonly payload: axios.AxiosResponse<IServerResponse>;
}

export interface IDeleteWord {
  readonly type: ActionTypes.DELETE_WORD;
  readonly payload: axios.AxiosPromise<any>;
}

export interface IDeleteWordDone {
  readonly type: ActionTypes.DELETE_WORD_FULFILLED;
  readonly payload: axios.AxiosResponse<IServereDeleteResponse>;
}

export type Action =
  | IFetchWords
  | IFetchWordsDone
  | IUpdateWord
  | IUpdateWordDone
  | IDeleteWord
  | IDeleteWordDone;

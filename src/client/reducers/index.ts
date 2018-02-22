import { combineReducers } from "redux";
import { IWordModel } from "../../server/words/model";
import wordReducer from "./word_reducer";

export interface IReduxState {
  words: IWordModel[];
}

const reducers = combineReducers<IReduxState>({
  words: wordReducer,
} as any);

export default reducers;

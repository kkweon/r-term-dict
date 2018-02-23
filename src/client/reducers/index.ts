import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { IWordModel } from "../../server/words/model";
import wordReducer from "./word_reducer";

export interface IReduxState {
  words: IWordModel[];
}

const reducers = combineReducers<IReduxState>({
  form,
  words: wordReducer,
} as any);

export default reducers;

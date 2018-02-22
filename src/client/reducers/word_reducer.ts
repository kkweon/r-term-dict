import { IWordModel } from "../../server/words/model";
import { Action, ActionTypes } from "../actions/types";

export default (state: IWordModel[] = [], action: Action): IWordModel[] => {
  switch (action.type) {
    case ActionTypes.FETCH_WORD_FULFILLED:
      return action.payload.data.data;

    case ActionTypes.UPDATE_WORD_FULFILLED:
      const newWord = action.payload.data.data;
      return state.map((word: IWordModel) => {
        if (word._id === newWord._id) {
          return newWord;
        }
        return word;
      });
    case ActionTypes.DELETE_WORD_FULFILLED:
      if (typeof action.payload.data.data === "string")
        return state.filter((word: IWordModel) => word._id !== action.payload.data.data);
      else return state;
    default:
      return state;
  }
};

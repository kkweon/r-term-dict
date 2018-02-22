import * as React from "react";
import { IWordModel } from "../../server/words/model";
import { IReduxState } from "../reducers";
import { connect } from "react-redux";
import Word from "./Word";

interface IStateToProps {
  words: IWordModel[];
}

class WordList extends React.Component<IStateToProps> {
  render() {
    if (this.props.words)
      return (
        <table>
          <tbody>
            {this.props.words.map(word => <Word word={word} key={word._id} />)}
          </tbody>
        </table>
      );
    return <div>WordList</div>;
  }
}

function mapStateProps(state: IReduxState): IStateToProps {
  return {
    words: state.words,
  };
}

export default connect<IStateToProps, {}, {}, IReduxState>(mapStateProps)(
  WordList,
);

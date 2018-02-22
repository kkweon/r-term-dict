import * as React from "react";
import { IWordModel } from "../../server/words/model";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { updateWord, deleteWord } from "../actions";

interface IOwnProps {
  word: IWordModel;
}

interface IState {
  editMode: boolean;
  ko: string;
  en: string;
}

interface IDispatchProps {
  updateWord: (id: string, en: string, ko: string) => void;
  deleteWord: (id: string) => void;
}

type IProps = IOwnProps & IDispatchProps;

class Word extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      editMode: false,
      ko: props.word.ko,
      en: props.word.en,
    };
  }

  componentWillReceiveProps({ word: { en, ko } }: IProps) {
    this.setState({
      en,
      ko,
    });
  }

  private handleEdit() {
    this.setState({ editMode: !this.state.editMode });
  }

  private handleDelete() {
    this.props.deleteWord(this.props.word._id)
    this.handleEdit();
  }

  private handleChangeEnglish(e: SyntheticEvent<HTMLInputElement>) {
    this.setState({ en: e.currentTarget.value });
  }

  private handleChangeKorean(e: SyntheticEvent<HTMLInputElement>) {
    this.setState({ ko: e.currentTarget.value });
  }

  private handleApply() {
    console.log(`change to ${this.state.en}, ${this.state.ko}`);
    this.props.updateWord(this.props.word._id, this.state.en, this.state.ko);
    this.handleEdit();
  }

  public render() {
    if (this.state.editMode)
      return (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.en}
              onChange={this.handleChangeEnglish.bind(this)}
            />
          </td>
          <td>
            <input
              type="text"
              value={this.state.ko}
              onChange={this.handleChangeKorean.bind(this)}
            />
          </td>
          <td>
            <button onClick={this.handleApply.bind(this)}>Apply</button>
            <button onClick={this.handleEdit.bind(this)}>Cancel</button>
            <button onClick={this.handleDelete.bind(this)}>Delete</button>
          </td>
        </tr>
      );
    else
      return (
        <tr>
          <td>{this.props.word.en}</td>
          <td>{this.props.word.ko}</td>
          <td>
            <button onClick={this.handleEdit.bind(this)}>edit</button>
          </td>
        </tr>
      );
  }
}

export default connect<{}, IDispatchProps>(null, { updateWord, deleteWord })(Word);

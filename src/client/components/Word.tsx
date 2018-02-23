import * as React from "react";
import { IWordModel } from "../../server/words/model";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { updateWord, deleteWord } from "../actions";

import styled, { css } from "react-emotion";

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

const Button = styled("button")`
  border: 0;
  cursor: pointer;
  color: white;
  padding: .2rem .5rem;
  background-color: ${props => props.theme.secondaryColor};
  :hover {
    background-color: #3498db;
  }
`;

const Row = styled("tr")`
  border-bottom: 1px solid black;
  height: 5rem;
`;

const marginRight = css`
  margin-right: 1rem;
`

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
    if (confirm("정말 삭제해도 되나요?")) {
      this.props.deleteWord(this.props.word._id);
      this.handleEdit();
    }
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
        <Row>
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
          <td style={{ whiteSpace: "nowrap" }}>
            <Button className={marginRight} onClick={this.handleApply.bind(this)}>변경</Button>
            <Button className={marginRight} onClick={this.handleEdit.bind(this)}>취소</Button>
            <Button style={{backgroundColor: "red"}} onClick={this.handleDelete.bind(this)}>삭제</Button>
          </td>
        </Row>
      );
    else
      return (
        <Row>
          <td>{this.props.word.en}</td>
          <td>{this.props.word.ko}</td>
          <td style={{ whiteSpace: "nowrap" }}>
            <Button onClick={this.handleEdit.bind(this)}>수정</Button>
          </td>
        </Row>
      );
  }
}

export default connect<{}, IDispatchProps>(null, { updateWord, deleteWord })(
  Word,
);

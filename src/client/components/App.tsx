import * as React from "react";
import WordList from "./WordList";
import CreateWordModal from "./CreateWordModal";
import { SyntheticEvent } from "react";
import { IWordModel } from "../../server/words/model";
import { IReduxState } from "../reducers";
import { connect } from "react-redux";
import { Container } from "../layout/Container";
import styled from "react-emotion";

interface IOwnState {
  term: string;
  showModal: boolean;
}

interface IStateProps {
  words: IWordModel[];
}

const toLowerTrim = (word: string): string => {
  return word.toLowerCase().trim();
};

const SearchInput = styled("input")`
  width: 100%;
`;

const AddButton = styled("button")`
position: fixed;
right: 10%;
bottom: 10%;
border: 0;
border-radius: 50%;
color: white;
background-color: ${props => props.theme.primaryColor};
box-shadow: 2px 2px 2px solid black;

cursor: pointer;
font-size: 2rem;
height: 3rem;
width: 3rem;
`

class App extends React.Component<IStateProps, IOwnState> {
  private input: HTMLInputElement | null;

  constructor(props: any) {
    super(props);
    this.state = {
      term: "",
      showModal: false,
    };
    this.input = null;
  }

  private handleChange(e: SyntheticEvent<HTMLInputElement>) {
    this.setState({ term: e.currentTarget.value });
  }

  private handleKeyPress(e: KeyboardEvent) {
    const keyCode = e.key;
    console.log(keyCode);
  }

  private filter(): IWordModel[] {
    const term = toLowerTrim(this.state.term);

    if (term) {
      return this.props.words.filter(
        word =>
          toLowerTrim(word.ko).includes(this.state.term) ||
          toLowerTrim(word.en).includes(this.state.term),
      );
    }

    return this.props.words;
  }

  private handleModalClick() {
    this.setState({ showModal: !this.state.showModal });
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  public render() {
    const words = this.filter();

    const modal = this.state.showModal ? (
      <CreateWordModal onClick={this.handleModalClick.bind(this)} />
    ) : null;
    return (
      <Container>
        <h1>R English - Korean Dictionary</h1>
        <AddButton onClick={this.handleModalClick.bind(this)}>+</AddButton>
        <SearchInput
          innerRef={(input: any) => {
            this.input = input;
          }}
          type="text"
          value={this.state.term}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <hr />
        <WordList words={words} />
        {modal}
      </Container>
    );
  }
}

function mapStateToProps(state: IReduxState): IStateProps {
  return {
    words: state.words,
  };
}

export default connect<IStateProps, {}, {}, IReduxState>(mapStateToProps)(App);

import * as React from "react";
import { IWordModel } from "../../server/words/model";
import Word from "./Word";

import styled from "react-emotion";

const Table = styled("table")`
width: 100%;

tr td:last-child {
  text-align: right;
}
`

export default function({ words }: { words: IWordModel[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>English</th>
          <th>Korean</th>
          <th />
        </tr>
      </thead>
      <tbody>{words.map(word => <Word word={word} key={word._id} />)}</tbody>
    </Table>
  );
}

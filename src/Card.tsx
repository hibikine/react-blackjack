import * as React from 'react';
import { ICard, markToString, numToString } from './App';
export const Card = ({
  mark,
  num,
  faceDown,
}: ICard & {
  faceDown?: boolean;
}) => (
  <div>{faceDown ? '*' : `${markToString.get(mark)}${numToString(num)}`}</div>
);

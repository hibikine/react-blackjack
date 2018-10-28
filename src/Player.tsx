import * as React from 'react';
import { ICard } from './App';
import { Card } from './Card';
const cardToKey = ({ mark, num }: ICard) => `${mark}${num}`;
export const Player = ({
  name,
  cards,
  faceUp,
}: {
  name: string;
  cards: ICard[];
  faceUp?: number;
}) => (
  <div>
    <h2>{name}</h2>
    <div>
      {cards.map((c, i) => (
        <Card
          key={cardToKey(c)}
          {...c}
          faceDown={faceUp != null && i >= faceUp}
        />
      ))}
    </div>
  </div>
);

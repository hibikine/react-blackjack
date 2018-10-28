import * as React from 'react';
import { ICard } from './App';
import { calcResult, calcValue, IResult } from './calc';

const WinnerText = ({
  playerValue,
  dealerValue,
}: {
  playerValue: number;
  dealerValue: number;
}) => {
  if (playerValue > dealerValue) {
    return <>あなたの勝ちです</>;
  } else if (dealerValue > playerValue) {
    return <>ディーラーの勝ちです</>;
  }
  return <>引き分けです</>;
};
export const Score = ({
  player,
  dealer,
}: {
  player: ICard[];
  dealer: ICard[];
}) => {
  const playerResult: IResult = calcResult(player);
  const dealerResult: IResult = calcResult(dealer);
  const playerValue = calcValue(playerResult);
  const dealerValue = calcValue(dealerResult);
  return (
    <div>
      <p>
        あなたの合計は
        {playerResult.sum}, ディーラーの合計は
        {dealerResult.sum}
      </p>
      {playerResult.sum > 21 && <p>バースト!</p>}
      {playerResult.sum === 21 && <p>ブラックジャック!</p>}
      <p>
        <WinnerText playerValue={playerValue} dealerValue={dealerValue} />
      </p>
    </div>
  );
};

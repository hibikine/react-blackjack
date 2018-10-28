import * as React from 'react';
import styled from 'styled-components';
import './App.css';
import { calcSum, initDeck } from './calc';
import { Player } from './Player';
import { Score } from './Score';

enum Mark {
  Heart,
  Spade,
  Clover,
  Diamond,
}
export interface ICard {
  num: number;
  mark: Mark;
}
interface IState {
  cards: ICard[];
  player: ICard[];
  dealer: ICard[];
  onGame: boolean;
}

export const markToString = new Map<Mark, string>([
  [Mark.Clover, '♣'],
  [Mark.Heart, '♥'],
  [Mark.Diamond, '♦'],
  [Mark.Spade, '♠'],
]);
export const numToString = (num: number): string => {
  if (num === 11) {
    return 'J';
  } else if (num === 12) {
    return 'Q';
  } else if (num === 13) {
    return 'K';
  }
  return `${num}`;
};

const Header = styled.header`
  background-color: #222;
  height: 80px;
  padding: 20px;
  color: white;
`;
class App extends React.Component<{}, IState> {
  public state = { cards: [], player: [], dealer: [], onGame: false };
  public render() {
    const { onGame, dealer, player } = this.state;
    return (
      <div className="App">
        <Header>
          <h1 className="App-title">ブラックジャック</h1>
        </Header>
        {onGame || (
          <button type="button" onClick={this.init}>
            スタート
          </button>
        )}
        {onGame && (
          <>
            <button type="button" onClick={this.draw}>
              ヒット(カードを引く)
            </button>
            <button type="button" onClick={this.stand}>
              スタンド(ストップ)
            </button>
          </>
        )}
        <Player
          name="ディーラー"
          cards={dealer}
          faceUp={onGame ? 1 : dealer.length}
        />
        <Player name="プレイヤー" cards={player} />
        {onGame && (
          <p>
            現在の合計は
            {calcSum(player)}
            です
          </p>
        )}
        {!onGame &&
          player.length > 0 &&
          dealer.length > 0 && <Score player={player} dealer={dealer} />}
      </div>
    );
  }
  private init = () => {
    const cards = initDeck();
    const dealer = [cards.pop(), cards.pop()] as ICard[];
    const player = [cards.pop(), cards.pop()] as ICard[];
    this.setState({ cards, dealer, player, onGame: true });
  };
  private draw = () => {
    const cards: ICard[] = [...this.state.cards];
    const player: ICard[] = [...this.state.player];
    const card = cards.pop();
    if (card == null) {
      return;
    }
    player.push(card);
    this.setState({ cards, player, onGame: calcSum(player) < 22 });
  };
  private stand = () => {
    const cards = [...this.state.cards];
    const dealer = [...this.state.dealer];
    while (calcSum(dealer) < 17) {
      const card = cards.pop();
      if (card == null) {
        break;
      }
      dealer.push(card);
    }
    this.setState({ onGame: false, cards, dealer });
  };
}

export default App;

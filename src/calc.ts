import { ICard } from './App';
export const initDeck = (): ICard[] =>
  shuffle(
    new Array(4)
      .fill(0)
      .map((_, i) => i)
      .reduce(
        (arr: ICard[], mark: number) => [
          ...arr,
          ...new Array(13)
            .fill(0)
            .map((_, i): ICard => ({ num: i + 1, mark: mark as any })),
        ],
        []
      )
  );
export const shuffle = (cards: ICard[]): ICard[] => {
  const shuffled: ICard[] = [...cards];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i];
    shuffled[i] = shuffled[r];
    shuffled[r] = tmp;
  }
  return shuffled;
};
const isNatural = (cards: ICard[]): boolean => {
  if (cards.length !== 2) {
    return false;
  }
  if (cards.every(c => c.num !== 1)) {
    return false;
  }
  return cards.some(c => c.num >= 10);
};
export interface IResult {
  isNatural: boolean;
  sum: number;
}

export const calcSum = (cards: ICard[]): number => {
  const { sum, hasOne } = cards.reduce(
    (score, c) => ({
      hasOne: score.hasOne || c.num === 1,
      sum: score.sum + (c.num > 10 ? 10 : c.num),
    }),
    { hasOne: false, sum: 0 }
  );
  if (hasOne && sum <= 11) {
    return sum + 10;
  }
  return sum;
};
export const calcResult = (cards: ICard[]): IResult => ({
  isNatural: isNatural(cards),
  sum: calcSum(cards),
});
export const calcValue = (result: IResult): number => {
  if (result.isNatural) {
    return 100;
  }
  if (result.sum > 21) {
    return 0;
  }
  return result.sum;
};

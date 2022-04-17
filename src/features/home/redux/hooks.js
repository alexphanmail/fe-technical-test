import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { startGame, getCard } from "./actions";

const useHome = () => {
  const dispatch = useDispatch();

  const { deck_id, cards, cardsHistory } = useSelector(
    (state) => ({
      deck_id: state.home.deck_id,
      cards: state.home.cards,
      cardsHistory: state.home.cardsHistory,
    }),
    shallowEqual
  );

  const boundStartGameAction = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  const boundGetCard = useCallback((deck_id, cardsHistory) => {
    dispatch(getCard(deck_id, cardsHistory));
  }, [dispatch]);

  return {
    deck_id,
    cards,
    cardsHistory,
    startGame: boundStartGameAction,
    getCard: boundGetCard,
  };
};

export default useHome;

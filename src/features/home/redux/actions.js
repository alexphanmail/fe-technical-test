import axios from "axios";
import moment from "moment";
import {
  FETCH_LIST_CARDS_BEGIN,
  FETCH_LIST_CARDS_FAILURE,
  FETCH_LIST_CARDS_SUCCESS,
  GET_CARD_BEGIN,
  GET_CARD_FAILURE,
  GET_CARD_SUCCESS,
} from "./constants";

export function startGame() {
  return (dispatch) => {
    dispatch({ type: FETCH_LIST_CARDS_BEGIN });
    const request = axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    request.then((res) => {
      dispatch({ type: FETCH_LIST_CARDS_SUCCESS, payload: res.data });
    });
    request.catch((err) => {
      dispatch({ type: FETCH_LIST_CARDS_FAILURE, payload: err });
    });
  };
}

export function getCard(deck_id, cardsHistory) {
  return (dispatch) => {
    dispatch({ type: GET_CARD_BEGIN });
    const request = axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    request.then((res) => {
      if (res.data && res.data.cards.length > 0) {
        const timestamp = new Date();

        cardsHistory.push({
          ...res.data.cards[0],
          timestamp: moment(timestamp).format("MM/DD/YYYY HH:mm"),
        });
      }

      dispatch({
        type: GET_CARD_SUCCESS,
        payload: { ...res.data, cardsHistory },
      });
    });
    request.catch((err) => {
      dispatch({ type: GET_CARD_FAILURE, payload: err });
    });
  };
}

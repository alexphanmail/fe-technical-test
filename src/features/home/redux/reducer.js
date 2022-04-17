import {
  FETCH_LIST_CARDS_BEGIN,
  FETCH_LIST_CARDS_FAILURE,
  FETCH_LIST_CARDS_SUCCESS,
  GET_CARD_BEGIN,
  GET_CARD_FAILURE,
  GET_CARD_SUCCESS,
} from "./constants";
import initialState from "./initialState";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_CARDS_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LIST_CARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
        cards: [],
        cardsHistory: [],
      };
    case FETCH_LIST_CARDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case GET_CARD_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case GET_CARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };
    case GET_CARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

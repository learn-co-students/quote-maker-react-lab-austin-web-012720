export default (state = [], action) => {
  let idx;
  let curQuote;

  switch (action.type) {

    case 'ADD_QUOTE':
      return [...state, action.quote];

    case 'REMOVE_QUOTE':
      return [...state.filter(quote => quote.id !== action.quoteId)];

    case 'UPVOTE_QUOTE':
      idx = state.findIndex(quote => quote.id === action.quoteId);
      curQuote = state[idx];
      return [
        ...state.slice(0, idx),
        Object.assign({}, curQuote, { votes: curQuote.votes += 1 }),
        ...state.slice(idx + 1)
      ]

    case 'DOWNVOTE_QUOTE':
      idx = state.findIndex(quote => quote.id === action.quoteId);
      curQuote = state[idx];
      if (curQuote.votes > 0) {
        return [
          ...state.slice(0, idx),
          Object.assign({}, curQuote, { votes: curQuote.votes -= 1 }),
          ...state.slice(idx + 1)
        ]
      }
      return state;

    default:
      return state;
  }

}

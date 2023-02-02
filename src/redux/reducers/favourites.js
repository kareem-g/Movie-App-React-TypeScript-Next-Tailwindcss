const favourites = (state = [], action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [...state, { ...action.payload, dateAdded: Date.now() }];
    case "DELETE_FAVOURITE":
      return state.filter((favourite) => favourite.id !== action.payload);
    default:
      return state;
  }
};

const favouritesIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [...state, action.payload.id];
    case "DELETE_FAVOURITE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};

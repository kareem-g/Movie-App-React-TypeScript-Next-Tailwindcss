const myList = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_MY_LIST":
      return [...state, { ...action.payload, dateAdded: Date.now() }];
    case "REMOVE_FROM_MY_LIST":
      return state.filter((movie) => movie.id !== action.payload);
    case "CLEAR_MY_LIST":
      return [];
    default:
      return state;
  }
};

const myListIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_MY_LIST":
      return [...state, action.payload.id];
    case "REMOVE_FROM_MY_LIST":
      return state.filter((id) => id !== action.payload);
    case "CLEAR_MY_LIST":
      return [];
    default:
      return state;
  }
};

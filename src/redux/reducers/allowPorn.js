const allowPorn = (state = false, action) => {
  switch (action.type) {
    case "SET_ALLOW_PORN":
      return action.payload;
    default:
      return state;
  }
};

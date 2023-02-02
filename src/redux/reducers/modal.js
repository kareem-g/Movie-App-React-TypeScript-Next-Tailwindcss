export const modalOpen = (state = false, action) => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return action.payload;
    default:
      return state;
  }
};

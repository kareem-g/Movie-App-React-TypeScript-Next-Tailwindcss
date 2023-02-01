import { createStore, action, persist } from "easy-peasy";

const store = createStore(
  persist(
    {
      modalOpen: false,
      allowPorn: false,
      searchResults: [],
      favourites: [],
      favouritesIds: [],
      myList: [],
      clearMyList: action((state) => {
        state.myList = [];
        state.myListIds = [];
      }),
      myListIds: [],
      currentMovie: {},
      addFavourites: action((state, payload) => {
        if (state.favouritesIds.includes(payload.id)) return;
        state.favourites.push({ ...payload, dateAdded: Date.now() });
        state.favouritesIds.push(payload.id);
      }),
      deleteFavorite: action((state, payload) => {
        state.favourites = state.favourites.filter(
          (movie) => movie.id !== payload
        );
        state.favouritesIds = state.favouritesIds.filter(
          (id) => id !== payload
        );
      }),
      addToMyList: action((state, payload) => {
        if (state.myListIds.includes(payload.id)) return;
        state.myList.push({ ...payload, dateAdded: Date.now() });
        state.myListIds.push(payload.id);
      }),
      removeFromMyList: action((state, payload) => {
        state.myList = state.myList.filter((movie) => movie.id !== payload);
        state.myListIds = state.myListIds.filter((id) => id !== payload);
      }),
      clearSearch: action((state) => {
        state.searchedTerm = "";
      }),
      clearResults: action((state) => {
        state.searchResults = [];
      }),
      setSearchResults: action((state, payload) => {
        state.searchResults = payload;
      }),
      setCurrentPage: action((state, payload) => {
        if (state.currentPage === payload) return;
        state.currentPage = payload;
      }),
      setCurrentMovie: action((state, payload) => {
        state.currentMovie = payload;
      }),
      setModalOpen: action((state, payload) => {
        state.modalOpen = payload;
      }),
      setAllowPorn: action((state, payload) => {
        state.allowPorn = payload;
      }),
    },
    {
      allow: [
        "searchResults",
        "favourites",
        "currentPage",
        "favouritesIds",
        "myList",
        "myListIds",
        "allowPorn",
        "currentMovie",
      ],
    }
  )
);

export default store;

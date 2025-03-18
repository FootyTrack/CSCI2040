import create from "zustand";


const useFavoritesStore = create((set) => ({
  favorites: [],
  addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),
  removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((item) => item.id !== id) })),
}));

export default useFavoritesStore;

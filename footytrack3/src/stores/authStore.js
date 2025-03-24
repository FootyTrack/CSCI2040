import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  //showFavorites: false, // State to control the visibility of the "favorites" button
  users: [{ email: "test@example.com", password: "password123", favorites: [] }],

  login: async (email, password) => {
    // Simulate an API call
    console.log("Attempting login with:", email, password);
    
    const user = useAuthStore.getState().users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      if (!user.favorites) {
        user.favorites = [];
      }
      set({ isAuthenticated: true, user});
      return true;
    } else {
      set({ isAuthenticated: false, user: null});
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false, user: null, showFavorites: false }),
  // Create user function
  createUser: async (email, password) => {
    console.log("Creating user with:", email, password);
    // Simulate user creation
    // Simulate adding a new user to the database
    const users = useAuthStore.getState().users;
    const userExists = users.some((u) => u.email === email);
    
    if (!userExists) {
        set((state) => ({
          users: [...state.users, { email, password }],
        }));
      return true;
    } else {
      return false;
    }
  },
  addFavorite: (item) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = {
        ...state.user,
        favorites: [...state.user.favorites || [], item],
      };

      const updatedUsers = state.users.map((u) =>
        u.email === state.user.email ? updatedUser : u
      );

      return { user: updatedUser, users: updatedUsers };
    });
  },

  removeFavorite: (id) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = {
        ...state.user,
        favorites: state.user.favorites.filter((item) => item.id !== id),
      };

      const updatedUsers = state.users.map((u) =>
        u.email === state.user.email ? updatedUser : u
      );

      return { user: updatedUser, users: updatedUsers };
    });
  },
}));

export default useAuthStore;
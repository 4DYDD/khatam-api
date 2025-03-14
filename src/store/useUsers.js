import { create } from "zustand";

const useUsers = create((set) => {
  return {
    users: [],
    setUsers: (data) => {
      set(() => {
        return { users: data };
      });
    },
  };
});

export default useUsers;

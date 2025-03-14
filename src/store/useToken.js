import { create } from "zustand";

const useToken = create((set) => {
  return {
    token: "",
    setToken: (data) => {
      set(() => {
        return { token: data };
      });
    },
  };
});

export default useToken;

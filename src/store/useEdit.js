import { create } from "zustand";

const useEdit = create((set) => {
  return {
    edit: null,
    setEdit: (data) => {
      set(() => {
        return { edit: data };
      });
    },
  };
});

export default useEdit;

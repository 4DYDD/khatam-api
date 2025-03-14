import { create } from "zustand";

const useFormUpdateData = create((set) => {
  return {
    formUpdateData: {
      name: "",
      email: "",
      password: "",
    },
    setFormUpdateData: (data) => {
      set(() => {
        return { formUpdateData: data };
      });
    },
  };
});

export default useFormUpdateData;

import { create } from "zustand";

const useFormData = create((set) => {
  return {
    formData: {
      name: "",
      email: "",
      password: "",
    },
    setFormData: (data) => {
      set(() => {
        return { formData: data };
      });
    },
  };
});

export default useFormData;

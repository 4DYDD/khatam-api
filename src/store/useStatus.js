import { create } from "zustand";

const useStatus = create((set) => {
  return {
    errors: {},
    setErrors: (data) => {
      set(() => {
        return { errors: data };
      });
    },

    success: {},
    setSuccess: (data) => {
      set(() => {
        return { success: data };
      });
    },

    sending: false,
    setSending: (data) => {
      set(() => {
        return { sending: data };
      });
    },
  };
});

export default useStatus;

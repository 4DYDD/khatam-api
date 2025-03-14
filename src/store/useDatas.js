import { create } from "zustand";

const useDatas = create((set) => {
  return {
    datas: [],
    setDatas: (data) => {
      set(() => {
        return { datas: data };
      });
    },
  };
});

export default useDatas;

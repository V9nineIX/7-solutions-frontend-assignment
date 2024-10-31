"use client";

import { useState } from "react";
import { TODO_LIST } from "@/constants";

// interface ListState {
//   mainList: string[];
//   fruitList: string[];
//   vegetableList: string[];
// }

const useTodoList = () => {
  const [listState, setListState] = useState<any>({
    mainList: TODO_LIST,
    fruitList: [],
    vegetableList: [],
  });

  const updateList = (item: any) => {
    setListState(item);
  };

  return {
    listState,
    updateList,
  };
};

export default useTodoList;

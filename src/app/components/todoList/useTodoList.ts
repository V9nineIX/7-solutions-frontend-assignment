"use client";

import { useState } from "react";
import {
  TODO_LIST,
  FRUIT_TYPE,
  VEGETABLE_TYPE,
  type TodoItem,
} from "@/constants";

interface ListState {
  mainList: TodoItem[];
  fruitList: TodoItem[];
  vegetableList: TodoItem[];
}

const useTodoList = () => {
  const [listState, setListState] = useState<ListState>({
    mainList: TODO_LIST,
    fruitList: [],
    vegetableList: [],
  });

  const moveItemToType = (selectItem: TodoItem) => {
    setListState((prev: ListState) => {
      const newMainList = prev.mainList.filter(
        (i: TodoItem) => i.name != selectItem.name
      ); //  remove selected item from mainlist
      const newState = {
        ...prev,
        mainList: newMainList,
        fruitList:
          selectItem.type === FRUIT_TYPE
            ? [...prev.fruitList, selectItem]
            : prev.fruitList,
        vegetableList:
          selectItem.type === VEGETABLE_TYPE
            ? [...prev.vegetableList, selectItem]
            : prev.vegetableList,
      };

      return newState;
    });

    // Set timer 5 sec to move back
    setTimeout(() => {
      autoMoveItemBack(selectItem);
    }, 5000);
  };

  const autoMoveItemBack = (selectItem: TodoItem) => {
    setListState((prev: ListState) => {
      const itemToMoveBack =
        prev.fruitList.find((i) => i.name === selectItem.name) ||
        prev.vegetableList.find((i) => i.name === selectItem.name);
      if (itemToMoveBack) {
        const newFruitList = prev.fruitList.filter(
          (i) => i.name !== selectItem.name
        );
        const newVegetableList = prev.vegetableList.filter(
          (i) => i.name !== selectItem.name
        );
        const newMainList = [...prev.mainList, itemToMoveBack];
        return {
          ...prev,
          mainList: newMainList,
          fruitList: newFruitList,
          vegetableList: newVegetableList,
        };
      }
      return prev;
    });
  };

  const moveItemBack = (
    selectItem: TodoItem,
    type: typeof FRUIT_TYPE | typeof VEGETABLE_TYPE
  ) => {
    if (!type) return;

    setListState((prev: ListState) => {
      let itemToMoveBack: TodoItem | null = null;
      //clone to make default
      let newFruitList = [...prev.fruitList];
      let newVegetableList = [...prev.vegetableList];

      if (type === FRUIT_TYPE) {
        const result = filterItemToMove(newFruitList, selectItem);
        itemToMoveBack = result.itemToMoveBack;
        newFruitList = result.newList;
      }

      if (type == VEGETABLE_TYPE) {
        const result = filterItemToMove(newVegetableList, selectItem);
        itemToMoveBack = result.itemToMoveBack;
        newVegetableList = result.newList;
      }

      if (itemToMoveBack) {
        const newMainList = [...prev.mainList, itemToMoveBack];
        return {
          ...prev,
          mainList: newMainList,
          fruitList: newFruitList,
          vegetableList: newVegetableList,
        };
      }
      return prev;
    });
  };

  const filterItemToMove = (list: TodoItem[], selectItem: TodoItem) => {
    const index = list.findIndex((i) => i.name === selectItem.name);
    let itemToMoveBack: TodoItem | null = null;
    let newList: TodoItem[] = [];
    if (index !== -1) {
      itemToMoveBack = list[index];
      newList = list.slice(0, index).concat(list.slice(index + 1));
    }
    return {
      itemToMoveBack,
      newList,
    };
  };

  return {
    listState,
    moveItemToType,
    moveItemBack,
  };
};

export default useTodoList;

"use client";

import { useState } from "react";
import { TODO_LIST } from "@/constants";

const FRUIT_TYPE = "Fruit";
const VEGETABLE_TYPE = "Vegetable";

const useTodoList = () => {
  const [listState, setListState] = useState<any>({
    mainList: TODO_LIST,
    fruitList: [],
    vegetableList: [],
  });

  const updateList = (item: any) => {
    setListState(item);
  };

  const moveItemToType = (selectItem: any) => {
    setListState((prev: any) => {
      const newMainList = prev?.mainList.filter(
        (i: any) => i.name != selectItem.name
      ); //  remove selected item from mainlist
      const newState = {
        ...prev,
        mainList: newMainList,
        fruitList:
          selectItem.type === FRUIT_TYPE
            ? [...prev.fruitList, selectItem]
            : prev?.fruitList,
        vegetableList:
          selectItem.type === VEGETABLE_TYPE
            ? [...prev?.vegetableList, selectItem]
            : prev?.vegetableList,
      };

      return newState;
    });

    // Set timer 5 sec to move back
    setTimeout(() => {
      autoMoveItemBack(selectItem);
    }, 5000);
  };

  const autoMoveItemBack = (selectItem: any) => {
    setListState((prev: any) => {
      const itemToMoveBack =
        prev.fruitList.find((i: any) => i.name === selectItem.name) ||
        prev.vegetableList.find((i: any) => i.name === selectItem.name);
      if (itemToMoveBack) {
        const newFruitList = prev.fruitList.filter(
          (i: any) => i.name !== selectItem.name
        );
        const newVegetableList = prev.vegetableList.filter(
          (i: any) => i.name !== selectItem.name
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

  const moveItemBack = (selectItem: any, type: any) => {
    if (!type) return;

    setListState((prev: any) => {
      let itemToMoveBack = [];
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

  const filterItemToMove = (list: any, selectItem: any) => {
    const index = list.findIndex((i: any) => i.name === selectItem.name);
    let itemToMoveBack = null;
    let newList = [];
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
    updateList,
    moveItemToType,
    moveItemBack,
  };
};

export default useTodoList;

const FRUIT_TYPE = "Fruit" as const;
const VEGETABLE_TYPE = "Vegetable" as const;

type TodoType = typeof FRUIT_TYPE | typeof VEGETABLE_TYPE;

interface TodoItem {
  type: TodoType;
  name: string;
}

const TODO_LIST: TodoItem[] = [
  {
    type: FRUIT_TYPE,
    name: "Apple",
  },
  {
    type: VEGETABLE_TYPE,
    name: "Broccoli",
  },
  {
    type: VEGETABLE_TYPE,
    name: "Mushroom",
  },
  {
    type: FRUIT_TYPE,
    name: "Banana",
  },
  {
    type: VEGETABLE_TYPE,
    name: "Tomato",
  },
  {
    type: FRUIT_TYPE,
    name: "Orange",
  },
  {
    type: FRUIT_TYPE,
    name: "Mango",
  },
  {
    type: FRUIT_TYPE,
    name: "Pineapple",
  },
  {
    type: VEGETABLE_TYPE,
    name: "Cucumber",
  },
  {
    type: FRUIT_TYPE,
    name: "Watermelon",
  },
  {
    type: VEGETABLE_TYPE,
    name: "Carrot",
  },
];

export { TODO_LIST, FRUIT_TYPE, VEGETABLE_TYPE, type TodoItem, type TodoType };

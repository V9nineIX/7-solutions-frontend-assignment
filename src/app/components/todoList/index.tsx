'use client'

import useTodoList from "./useTodoList"


// Add interface for list items
interface TodoItem {
  name: string;
  // Add other properties if needed
}


export default function TodoList() {

  const { listState } = useTodoList()
  const { mainList, fruitList, vegetableList } = listState as {
    mainList: TodoItem[];
    fruitList: TodoItem[];
    vegetableList: TodoItem[];
  }

  return (

    <div className="flex w-full justify-evenly gap-2 md:gap-6 h-screen">

      <div className=" flex-1  p-2">
        <ul className="space-y-3">
          {mainList.map((item, index) => {
            return (
              <li key={`main-list-${index}`}>
                <button className="bg-white w-full p-2 ring-1  ring-gray-300">{item.name}</button>
              </li>
            )
          })}
        </ul>

      </div>

      {/* fruit col */}
      <div className="flex-1 border border-gray-200">
        <div className="bg-gray-200 border border-gray-2 text-center p-1 font-[500">Fruit</div>
        <ul className="space-y-3 p-3">
          {fruitList.map((item, index) => {
            return (
              <li key={`fruit-list-${index}`}>
                <button className="bg-white w-full p-2 ring-1  ring-gray-300 ">{item.name}</button>
              </li>
            )
          })}
        </ul>
      </div>


      {/* vegetable  col*/}
      <div className="flex-1 border border-gray-200">
        <div className="bg-gray-200 border border-gray-2 text-center p-1 font-[500]">Vegetable</div>
        <ul className="space-y-3 p-3">
          {vegetableList.map((item, index) => {
            return (
              <li key={`vagetable-list-${index}`}>
                <button className="bg-white w-full p-2 ring-1  ring-gray-300">{item.name}</button>
              </li>
            )
          })}
        </ul>
      </div>


    </div>
  )

}
'use client'

import useTodoList from "./useTodoList"
import { FRUIT_TYPE, VEGETABLE_TYPE } from "@/constants"



export default function TodoList() {

  const { listState, moveItemToType, moveItemBack, countdowns } = useTodoList()
  const { mainList, fruitList, vegetableList } = listState as any

  return (

    <div className="flex w-full justify-evenly gap-2 md:gap-6 h-screen">

      <div className=" flex-1  p-2">
        <ul className="space-y-3">
          {mainList.map((item: any, index: any) => {
            return (
              <li key={`main-list-${index}`}>
                <button onClick={() => { moveItemToType(item) }} className="bg-white w-full p-2 ring-1  ring-gray-300">{item.name}</button>
              </li>
            )
          })}
        </ul>

      </div>

      {/* fruit col */}
      <div className="flex-1 border border-gray-200">
        <div className="bg-gray-200 border border-gray-2 text-center p-1 font-[500">Fruit</div>
        <ul className="space-y-3 p-3">
          {fruitList.map((item: any, index: any) => {
            return (
              <li key={`fruit-list-${index}`}>
                <button onClick={() => { moveItemBack(item, FRUIT_TYPE) }} className="bg-white w-full p-2 ring-1  ring-gray-300 ">
                  <div className="flex flex-row justify-center gap-2">
                    <label>{item.name}</label>
                    <label className="text-red-500">(
                      {countdowns[item.name] ? countdowns[item.name] : 0}
                      )
                    </label>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>


      {/* vegetable  col*/}
      <div className="flex-1 border border-gray-200">
        <div className="bg-gray-200 border border-gray-2 text-center p-1 font-[500]">Vegetable</div>
        <ul className="space-y-3 p-3">
          {vegetableList.map((item: any, index: any) => {
            return (
              <li key={`vegetable-list-${index}`}>
                <button onClick={() => { moveItemBack(item, VEGETABLE_TYPE) }} className="bg-white w-full p-2 ring-1  ring-gray-300">
                  <div className="flex flex-row justify-center gap-2">
                    <label>{item.name}</label>
                    <label className="text-red-500">(
                      {countdowns[item.name] ? countdowns[item.name] : 0}
                      )
                    </label>
                  </div>
                </button>

              </li>
            )
          })}
        </ul>
      </div>


    </div>
  )

}
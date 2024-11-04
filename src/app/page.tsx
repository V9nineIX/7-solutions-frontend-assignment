
'use client'

import TodoList from "./components/todoList";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="flex justify-center py-8 px-5 md:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div>
          <p>* https://github.com/7-solutions/frontend-assignment</p>
          <ul>

            <li>-Each button will be moved into its own column separated by type.</li>
            <li>-Once moved, each button will have 5 seconds on the screen and then will be moved back to the bottom of the main list.</li>
            <li>-If click on the right column (Fruit/Vegetable) the item must go back to the bottom of the left column (list) immediately.</li>
          </ul>

        </div>

        <TodoList />

      </main>
    </div>
  );
}

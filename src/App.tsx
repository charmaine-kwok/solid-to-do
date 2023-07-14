import type { Component } from "solid-js";
import { createSignal, createResource, Show, For } from "solid-js";

import fetchData from "./functions/fetchData";
import { Moon, Sun, Trash } from "./assets/icons/Icons";

const App: Component = () => {
  const [darkTheme, setDarkTheme] = createSignal(false);

  const [data] = createResource(fetchData);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }

  return (
    <div
      class=" flex flex-col h-[100vh]"
      classList={{ "bg-gray-800": darkTheme() }}
    >
      <header class="flex items-center justify-center my-4">
        <h1
          class="text-4xl font-bold"
          classList={{ "text-white": darkTheme() }}
        >
          Todo List
        </h1>
        <div class="btn" onClick={toggleTheme}>
          <Show when={!darkTheme()} fallback={<Sun />}>
            <Moon />
          </Show>
        </div>
      </header>

      <Show when={data()}>
        <For each={data()!.todoData.todos}>
          {(todo) => (
            <label class="todoItem">
              {todo.subject} <Trash />
            </label>
          )}
        </For>
        <For each={data()!.doneData.dones}>
          {(done) => (
            <label class="doneItem">
              {done.subject} <Trash />
              <span class="border-red-600 absolute bottom-[50%] left-0 w-full border-b" />
            </label>
          )}
        </For>
      </Show>
    </div>
  );
};

export default App;

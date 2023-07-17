import type { Component } from "solid-js";
import {
  createSignal,
  createResource,
  createEffect,
  Show,
  For,
} from "solid-js";

import fetchData from "./functions/fetchData";
import addTodo from "./functions/addTodo";
import { Moon, Sun, Trash } from "./assets/icons/Icons";

const App: Component = () => {
  const [darkTheme, setDarkTheme] = createSignal(false);
  const [entering, setEntering] = createSignal("");
  const [todos, setTodos] = createSignal<any[]>([]);
  const [dones, setDones] = createSignal<any[]>([]);

  const [data] = createResource(fetchData);

  createEffect(() => {
    if (data()) {
      setTodos(data()?.todoData?.todos);
      setDones(data()?.doneData?.dones);
    }
  }, [data()]);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }

  return (
    <div
      class=" flex h-[100vh] flex-col mb-16"
      classList={{ "bg-gray-800": darkTheme() }}
    >
      <header class="my-4 flex items-center justify-center">
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

      <div class="inputDiv" classList={{ "bg-slate-700": darkTheme() }}>
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addTodo(entering());
              setEntering("");
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          }}
          value={entering()}
          onInput={(e) => setEntering(e.currentTarget.value)}
          type="text"
          placeholder="what needs to be done?"
          class="w-[80%] py-2 pl-2 text-xl"
        />
      </div>

      <Show when={todos()}>
        <For each={todos()}>
          {(todo) => (
            <label class="todoItem">
              {todo.subject} <Trash />
            </label>
          )}
        </For>
      </Show>

      <Show when={dones()}>
        <For each={dones()}>
          {(done) => (
            <label class="doneItem">
              {done.subject} <Trash />
              <span class="absolute bottom-[50%] left-0 w-full border-b border-red-600" />
            </label>
          )}
        </For>
      </Show>
    </div>
  );
};

export default App;

import type { Component } from "solid-js";
import {
  createSignal,
  createResource,
  createEffect,
  Show,
  For,
} from "solid-js";

import fetchData from "./functions/fetchData";
import { addTodo } from "./functions/api/todo/todoApi";
import { Moon, Sun, Trash } from "./assets/icons/Icons";
import { removeDone, addDone } from "./functions/api/done/doneApi";

const App: Component = () => {
  const [darkTheme, setDarkTheme] = createSignal(false);
  const [entering, setEntering] = createSignal("");
  const [todos, setTodos] = createSignal<any[]>([]);
  const [dones, setDones] = createSignal<any[]>([]);

  const [data, { mutate, refetch }] = createResource(fetchData);

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
      class=" flex h-[100vh] flex-col py-8"
      classList={{ "bg-gray-800": darkTheme() }}
    >
      <header class="mb-4 flex items-center justify-center">
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
              if (entering()) {
                addTodo(entering());
                setEntering("");
                setTimeout(() => refetch(), 100);
              }
            }
          }}
          value={entering()}
          onInput={(e) => setEntering(e.currentTarget.value)}
          type="text"
          placeholder="what needs to be done?"
          class="w-[80%] py-2 pl-2 text-xl"
        />
      </div>
      <div>
        <For each={todos()}>
          {(todo) => (
            <label class="todoItem">
              {todo.subject ?? todo}
              <button
                onClick={() => {
                  addDone(todo.ID, todo.subject);
                  setTimeout(() => refetch(), 500);
                }}
              >
                <Trash />
              </button>
            </label>
          )}
        </For>

        <For each={dones()}>
          {(done) => (
            <label class="doneItem">
              {done.subject ?? done}
              <button
                onClick={() => {
                  removeDone(done.ID);
                  setTimeout(() => refetch(), 100);
                }}
              >
                <Trash />
              </button>
              <span class="absolute bottom-[50%] left-0 w-full border-b border-red-600" />
            </label>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;

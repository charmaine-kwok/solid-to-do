import type { Component } from "solid-js";
import { createSignal, createResource, Show, For } from "solid-js";
async function fetchData() {
  try {
    const [todoResponse, doneResponse] = await Promise.all([
      fetch("http://localhost:8080/todo/todos"),
      fetch("http://localhost:8080/done/dones"),
    ]);

    const todoData = await todoResponse.json();
    const doneData = await doneResponse.json();

    return { todoData, doneData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { todoData: null, doneData: null };
  }
}

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
          <svg
            fill="#918d8d"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            height="20px"
            width="20px"
          >
            <path d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
          </svg>
        </div>
      </header>

      <Show when={data()}>
        <For each={data()!.todoData.todos}>
          {(todo) => (
            <label class="relative mx-auto mb-4 flex h-[3rem] w-[56%] justify-between border-2 border-green-500 bg-green-300 px-4 py-2 text-xl hover:bg-green-400">
              {todo.subject}
            </label>
          )}
        </For>
        <For each={data()!.doneData.dones}>
          {(done) => (
            <label class="relative mx-auto mb-4 flex w-[56%] px-4 justify-between border-2 border-red-500 bg-red-300  py-2 text-xl hover:bg-red-400">
              {done.subject}
              <span class="border-red-600 absolute bottom-[50%] left-0 w-full border-b" />
            </label>
          )}
        </For>
      </Show>
    </div>
  );
};

export default App;

export default async function addTodo(todo: string) {
  try {
    const response = await fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: todo }),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return { todoData: null, doneData: null };
  }
}

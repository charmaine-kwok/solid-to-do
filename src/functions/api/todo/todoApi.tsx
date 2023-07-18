export async function addTodo(todo: string) {
  try {
    await fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: todo }),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function removeTodo(id: number) {
  try {
    await fetch(`http://localhost:8080/todo/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error removing todo:", error);
  }
}

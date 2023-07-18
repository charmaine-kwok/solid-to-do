import { removeTodo } from "../todo/todoApi";

export async function addDone(id: number, todo: string) {
  await removeTodo(id);
  try {
    await fetch("http://localhost:8080/done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: todo }),
    });
  } catch (error) {
    console.error("Error adding done:", error);
  }
}

export async function removeDone(id: number) {
  try {
    await fetch(`http://localhost:8080/done/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error removing done:", error);
  }
}

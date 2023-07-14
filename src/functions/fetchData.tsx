export default async function fetchData() {
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

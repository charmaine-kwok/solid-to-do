export async function removeDone(id: number) {
  try {
    await fetch(`http://localhost:8080/done/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error removind done:", error);
  }
}

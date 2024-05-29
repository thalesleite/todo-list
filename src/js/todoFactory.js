export default function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
    setTitle(newTitle) {
      this.title = newTitle
    },
    setDescription(newDescription) {
      this.description = newDescription
    },
    setDueDate(newDueDate) {
      this.dueDate = newDueDate
    },
    setPriority(newPriority) {
      this.priority = newPriority
    },
  }
}

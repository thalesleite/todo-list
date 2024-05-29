import "../css/styles.css"

function createProject(name) {
  return {
    name: name,
    items: [],
    setName(newName) {
      this.name = newName
    },
    addItem(item) {
      this.items.push(item)
    },
  }
}

function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  }
}

const formProject = document.getElementById("formProject")
const projects = []

formProject.addEventListener("submit", (e) => {
  e.preventDefault()
  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const dueDate = document.getElementById("dueDate").value
  const priority = document.getElementById("priority").value

  const project = createProject("Project Default")
  const todo = createTodo(title, description, dueDate, priority)
  project.addItem(todo)

  projects.push(project)

  console.log("project: ", project)
})

import "../css/styles.css"

import createProject from "../js/projectFactory"
import createTodo from "../js//todoFactory"

import { format } from "date-fns"

const formProject = document.getElementById("formProject")
const projectsSection = document.querySelector("#projects")

const dueDate = document.getElementById("dueDate")
dueDate.value = format(new Date(), "yyyy-MM-dd")

const projects = getProjectsFromLocal()
console.log("projects: ", projects)

updateProjects()

formProject.addEventListener("submit", (e) => {
  e.preventDefault()

  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const priority = document.getElementById("priority").value

  if (title && description && dueDate && priority) {
    const todo = createTodo(title, description, dueDate, priority)

    if (projects.length > 0) {
      projects[0].addItem(todo)
    } else {
      const project = createProject("Project Default")
      project.addItem(todo)
      projects.push(project)
    }

    localStorage.setItem("projects", JSON.stringify(projects))
    clear()
    updateProjects()
  }
})

function clear() {
  document.getElementById("title").value = ""
  document.getElementById("description").value = ""
  document.getElementById("dueDate").value = null
  document.getElementById("priority").value = "0"
}

function getProjectsFromLocal() {
  let localProjects = localStorage.getItem("projects")

  if (localProjects) {
    localProjects = JSON.parse(localProjects)

    const projects = []
    localProjects.forEach((project) => {
      const newProject = createProject(project.name)

      project.items.forEach(({ title, description, dueDate, priority }) => {
        const todo = createTodo(title, description, dueDate, priority)
        newProject.addItem(todo)
      })

      projects.push(newProject)
    })

    return projects
  }

  return []
}

function updateProjects() {
  projectsSection.innerHTML = ""

  if (projects.length > 0) {
    projects.forEach((project, index) => {
      const div = document.createElement("div")
      div.classList.add("project")

      const hName = document.createElement("h2")
      hName.textContent = project.name
      div.appendChild(hName)

      const divItems = document.createElement("div")
      divItems.classList.add("items")

      project.items.forEach((item) => {
        const divItem = document.createElement("div")
        divItem.classList.add("item")

        const pTitle = document.createElement("p")
        pTitle.textContent = `Title: ${item.title}`
        divItem.appendChild(pTitle)

        const pDescription = document.createElement("p")
        pDescription.textContent = `Description: ${item.description}`
        divItem.appendChild(pDescription)

        const pDueDate = document.createElement("p")
        pDueDate.textContent = `Due Date: ${item.dueDate}`
        divItem.appendChild(pDueDate)

        const pPriority = document.createElement("p")
        pPriority.textContent = `Priority: ${item.priority}`
        divItem.appendChild(pPriority)

        divItems.appendChild(divItem)
      })

      div.appendChild(divItems)
      projectsSection.appendChild(div)
    })
  } else {
    projectsSection.innerHTML = "No projects in to-do list"
  }
}

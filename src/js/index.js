import "../css/styles.css"

import createProject from "../js/projectFactory"
import createTodo from "../js//todoFactory"

import { format } from "date-fns"

const formProject = document.getElementById("formProject")
const projectsSection = document.querySelector("#projects")

const today = format(new Date(), "yyyy-MM-dd")

let dueDate = document.getElementById("dueDate")
dueDate.value = today

const priorities = ["Urgent", "Important", "Low priority", "Done"]

const projects = getProjectsFromLocal()
console.log("projects: ", projects)

updateProjects()

formProject.addEventListener("submit", (e) => {
  e.preventDefault()

  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const priority = document.getElementById("priority").value
  dueDate = document.getElementById("dueDate").value

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
  document.getElementById("dueDate").value = today
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
    projects.forEach((project) => {
      const div = document.createElement("div")
      div.classList.add("project")

      const hName = document.createElement("h2")
      hName.textContent = project.name
      div.appendChild(hName)

      const divItems = document.createElement("div")
      divItems.classList.add("items")

      project.items.forEach((item, idItem) => {
        const divItem = document.createElement("div")
        divItem.classList.add("item")

        const inputTitle = document.createElement("input")
        inputTitle.value = item.title
        inputTitle.disabled = true
        const pTitle = document.createElement("p")
        pTitle.textContent = `Title: `
        pTitle.appendChild(inputTitle)
        divItem.appendChild(pTitle)

        const inputDescription = document.createElement("textarea")
        inputDescription.setAttribute("rows", "4")
        inputDescription.value = item.description
        inputDescription.disabled = true
        const pDescription = document.createElement("p")
        pDescription.textContent = `Description: `
        pDescription.appendChild(inputDescription)
        divItem.appendChild(pDescription)

        const inputDueDate = document.createElement("input")
        inputDueDate.setAttribute("type", "date")
        inputDueDate.value = item.dueDate
        inputDueDate.disabled = true
        const pDueDate = document.createElement("p")
        pDueDate.textContent = `Due Date: `
        pDueDate.appendChild(inputDueDate)
        divItem.appendChild(pDueDate)

        const inputPriority = document.createElement("select")
        for (let i = 0; i < priorities.length; i++) {
          const option = document.createElement("option")
          option.value = i
          option.text = priorities[i]
          inputPriority.appendChild(option)
        }
        inputPriority.value = item.priority
        inputPriority.disabled = true
        const pPriority = document.createElement("p")
        pPriority.textContent = `Priority: `
        pPriority.appendChild(inputPriority)
        divItem.appendChild(pPriority)

        const btnSave = document.createElement("button")
        btnSave.classList.add("btn-save")
        btnSave.setAttribute("data-id", idItem)
        btnSave.hidden = true
        btnSave.textContent = "SAVE"
        divItem.appendChild(btnSave)

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("btn-delete")
        btnDelete.setAttribute("data-id", idItem)
        btnDelete.textContent = "DELETE"
        divItem.appendChild(btnDelete)

        const btnEdit = document.createElement("button")
        btnEdit.classList.add("btn-edit")
        btnEdit.textContent = "EDIT"
        divItem.appendChild(btnEdit)

        divItems.appendChild(divItem)

        btnSave.addEventListener("click", () => {
          const index = btnSave.dataset.id
          const item = projects[0].items[index]

          item.setTitle(inputTitle.value)
          item.setDescription(inputDescription.value)
          item.setDueDate(inputDueDate.value)
          item.setPriority(inputPriority.value)

          inputTitle.disabled = true
          inputDescription.disabled = true
          inputDueDate.disabled = true
          inputPriority.disabled = true

          btnDelete.hidden = false
          btnSave.hidden = true
          updateProjects()
        })

        btnDelete.addEventListener("click", () => {
          const index = btnDelete.dataset.id
          projects[0].removeItem(index)
          updateProjects()
        })

        btnEdit.addEventListener("click", () => {
          inputTitle.disabled = false
          inputDescription.disabled = false
          inputDueDate.disabled = false
          inputPriority.disabled = false

          btnSave.hidden = false
          btnDelete.hidden = true
        })
      })

      div.appendChild(divItems)
      projectsSection.appendChild(div)
    })

    localStorage.setItem("projects", JSON.stringify(projects))
  } else {
    projectsSection.innerHTML = ""
  }
}

export default function createProject(name) {
  return {
    name: name,
    items: [],
    setName(newName) {
      this.name = newName
    },
    addItem(item) {
      this.items.push(item)
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
  }
}

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
    removeItem(item) {
      console.log("item: ", item)
    },
  }
}

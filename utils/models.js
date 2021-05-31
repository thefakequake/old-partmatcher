const models = {
  user: {
    partLists: [],
    contributions: 0,
    roles: []
  },
  partList: {
    author: "",
    parts: [],
    estimatedWattage: 0
  },
  part: {
    name: "",
    manufacturer: "",
    specs: {},
    comments: []
  }
}

export default models

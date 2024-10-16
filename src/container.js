const Component = require('./component')

class Container extends Component {
  #components = []

  getComponents () {
    return this.#components
  }

  addComponents (...newComponent) {
    newComponent.forEach(element => {
      if (element instanceof Component) {
        if (!(this.getComponents().indexOf(element) >= 0)) {
          this.getComponents().push(element)
        }
      }
    })
  }

  print () {
    return this.#components.join('')
  }

  countWords () {
    return this.#components.length
  }
}

module.exports = Container

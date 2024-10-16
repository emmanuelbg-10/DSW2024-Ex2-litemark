const Component = require('./component')

class SeparatorLine extends Component {
  constructor (separator = '-', length = 40) {
    super()
    this.separator = separator
    this.length = length
  }

  print () {
    let aux = ''
    for (let i = 0; i < this.length; i++) {
      aux += this.separator
    }
    return aux + '\n'
  }
}

module.exports = SeparatorLine

const Component = require('./component')

class Text extends Component {
  constructor (text = '') {
    super()
    this.text = text
  }

  print () {
    this.linebreak = '\n'
    return this.text + '' + this.linebreak
  }

  countWords () {
    const array = this.text.split(' ')
    return array.length
  }
}

module.exports = Text

const Component = require('./component')
const Document = require('./document')

class Text extends Component {
  constructor (text = '') {
    super()
    this.text = text
  }

  print () {
    this.linebreak = '\n'
    return this.text + '' + Document.linebreak
  }

  countWords () {
    const array = this.text.split(' ')
    return array.length
  }
}

module.exports = Text

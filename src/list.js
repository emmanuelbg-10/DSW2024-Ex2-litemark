const Container = require('./container')

class List extends Container {
  constructor (bullet = '') {
    super()
    this.bullet = bullet
  }

  print () {
  }
}

module.exports = List

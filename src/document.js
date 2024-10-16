class Document {
  #author
  #date
  #linebreak
  constructor (title, author = 'Anónimo') {
    this.title = title
    if (author.replaceAll(' ', '').length < 3) {
      this.#author = 'Anónimo'
    } else {
      this.#author = author
    }
    this.#date = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'full'
    }).format(new Date())
  }

  get author () {
    return this.#author
  }

  set author (newAutor) {
    const aux = newAutor.replaceAll(' ', '')
    if (!(aux.length < 3)) {
      this.#author = newAutor
    }
  }

  get date () {
    return this.#date
  }

  get linebreak () {
    return this.#linebreak
  }

  set linebreak (newlinebreak) {
    this.#linebreak = newlinebreak
  }

  print () {
    return 'Título: ' + this.title + Document.linebreak +
    'Autor: ' + this.#author + Document.linebreak +
    'Fecha: ' + this.#date + Document.linebreak
  }
}

module.exports = Document

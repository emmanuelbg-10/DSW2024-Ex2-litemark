/* eslint-env jest */

const Component = require('../src/component')
const Container = require('../src/container')
const SeparatorLine = require('../src/separator-line')
const Text = require('../src/text')
const Document = require('../src/document')

beforeEach(() => {
  Document.linebreak = 'kkfu'
})

describe('5.1 Clase Container', () => {
  test('Crea class Container', () => {
    expect(() => new Container()).not.toThrow()
  })

  test('hereda de Component', () => {
    const box = new Container()
    expect(box instanceof Component).toBeTruthy()
  })
})

describe('5.2 Container tiene componentes (oculto)', () => {
  test('components es oculto', () => {
    const box = new Container()
    expect(box).toEqual({})
  })
  test('Container tiene un método getComponent()', () => {
    const box = new Container()
    expect(box.getComponents).toBeDefined()
  })
  test('Cuando se crea un container, no tiene componentes', () => {
    const box = new Container()
    expect(box.getComponents().length).toBe(0)
  })
})

describe('5.3 addComponents', () => {
  test('Esiste el método addComponents()', () => {
    const box = new Container()
    expect(box.addComponents).toBeDefined()
  })
  test('Se puede añadir un componente', () => {
    const box = new Container()
    const textHi = new Text('Hola mundo')
    box.addComponents(textHi)
    expect(box.getComponents()).toContain(textHi)
  })
  test('Se pueden añadir varios componentes', () => {
    const box = new Container()
    const textHi = new Text('Hola mundo')
    const separation = new SeparatorLine('+', 8)
    const textLorem = new Text('Lorem ipsum')
    box.addComponents(textHi, separation, textLorem, separation)
    expect(box.getComponents()).toContain(textHi)
    expect(box.getComponents()).toContain(textLorem)
    expect(box.getComponents()).toContain(separation)
    expect(box.getComponents().length).toBe(4)
  })
})

describe('5.4 addComponents', () => {
  test('No permite añadir otros elementos que no sean del Tipo Component', () => {
    const box = new Container()
    box.addComponents('algo', 3)
    box.addComponents(['array'], { type: 'object' })
    box.addComponents(new Date())
    box.addComponents(new Document('Pepe Pepón'))
    expect(box.getComponents().length).toBe(0)
  })

  test('Permite añadir otro contenedor', () => {
    const box = new Container()
    const subbox = new Container()
    box.addComponents(subbox)
    expect(box.getComponents().length).toBe(1)
    expect(box.getComponents()).toContain(subbox)
  })
})

describe('5.5 Contar palabras del contenedor', () => {
  test('Existe el método countWords', () => {
    const box = new Container()
    expect(box.countWords).toBeDefined()
  })
  test('Un contenedor vacío cuenta 0 palabras', () => {
    const box = new Container()
    expect(box.countWords()).toBe(0)
  })
  test('Un contenedor con mucho texto cuenta todas las palabras', () => {
    const box = new Container()
    const textHi = new Text('Hola mundo')
    const separation = new SeparatorLine('+', 8)
    const textLorem = new Text('Lorem ipsum')
    box.addComponents(textHi, separation, textLorem, separation)
    expect(box.countWords()).toBe(4)
  })

  test('No cuenta los espacios en blanco', () => {
    const box = new Container()
    const textHi = new Text('Hola mundo')
    const separation = new SeparatorLine('+', 8)
    const textLorem = new Text('Lorem    ipsum    ') // Se repite en el contenedor
    box.addComponents(textHi, separation, textLorem, separation, textLorem)
    expect(box.countWords()).toBe(6)
  })

  test('Cuenta incluso dentro de subcontenedores', () => {
    const box = new Container()
    const subbox1 = new Container()
    const subbox2 = new Container()
    const textHi = new Text('Hola mundo')
    const separation = new SeparatorLine('+', 8)
    const textLorem = new Text('Lorem    ipsum    ') // Se repite en el contenedor
    subbox2.addComponents(textHi, separation)
    subbox1.addComponents(textHi, separation, subbox2)
    box.addComponents(textHi, separation, textLorem, separation, textLorem, subbox1)
    expect(box.countWords()).toBe(10)
  })
})

describe('5.6 Método print', () => {
  test('Un contenedor vacío imprime cadena vacía', () => {
    const box = new Container()
    expect(box.print()).toBe('')
  })

  test('Un contenedor con un texto, devuelve ese texto con un salto de linea', () => {
    Document.linebreak = '<br>'
    const box = new Container()
    const textHi = new Text('Hola mundo')
    box.addComponents(textHi)
    expect(Document.linebreak).toBe('<br>')
    expect(box.print()).toBe('Hola mundo<br>')
  })

  test('Un contenedor con un texto, devuelve ese texto con un salto de linea', () => {
    Document.linebreak = '<br>'
    const box = new Container()
    const textHi = new Text('Hola mundo')
    const textLorem = new Text('Lorem ipsum')
    box.addComponents(textHi, textLorem)
    expect(Document.linebreak).toBe('<br>')
    expect(box.print()).toBe('Hola mundo<br>Lorem ipsum<br>')
  })
})

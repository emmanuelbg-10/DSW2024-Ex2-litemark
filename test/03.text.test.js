/* eslint-env jest */

const Component = require('../src/component')
const Text = require('../src/text')
const Document = require('../src/document')

beforeEach(() => {
  Document.linebreak = '\n'
})

describe('3.1 Clase Text', () => {
  test('Se crea la clase Text', () => {
    expect(() => new Text()).not.toThrow()
  })

  test('La clase Text hereda de Component', () => {
    const text = new Text()
    expect(text instanceof Component).toBeTruthy()
  })
})

describe('3.2 Constructor', () => {
  test('Se construye con un texto como parámetro', () => {
    const textHi = new Text('Hola mundo')
    expect(textHi.text).toBe('Hola mundo')
  })

  test('Sin parámetro almacena un texto vacío', () => {
    const textEmpty = new Text()
    expect(textEmpty.text).toBe('')
  })
})

describe('3.3 Método print', () => {
  test('Devuelve el texto que contiene con el salto de línea del documento', () => {
    const textHi = new Text('Hola mundo')
    expect(textHi.print()).toBe('Hola mundo\n')
  })

  test('Funciona incluso cambiando el linebreak del documento', () => {
    const textHi = new Text('Hola mundo')
    expect(textHi.print()).toBe('Hola mundo\n')
    Document.linebreak = '<br>'
    expect(textHi.print()).toBe('Hola mundo<br>')
  })
})

describe('3.4 Método countWords', () => {
  test('Cuenta las palabras (separadas por espacios)', () => {
    const textHi = new Text('Hola mundo')
    expect(textHi.countWords()).toBe(2)
  })

  test('No cuenta como palabras varios espacios seguidos', () => {
    const textHi = new Text('  Hola mundo  con muchos       espacios      ')
    expect(textHi.countWords()).toBe(5)
  })
})

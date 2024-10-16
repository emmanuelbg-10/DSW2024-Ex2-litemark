/* eslint-env jest */

const Component = require('../src/component')
const Document = require('../src/document')
const SeparatorLine = require('../src/separator-line')

beforeEach(() => {
  Document.linebreak = '\n'
})

describe('4.1 Clase SeparatorLine', () => {
  test('Se construye la clase', () => {
    expect(() => new SeparatorLine()).not.toThrow()
  })

  test('Hereda de Component', () => {
    const separation = new SeparatorLine()
    expect(separation instanceof Component).toBeTruthy()
  })
})

describe('4.2 propiedades separator y length', () => {
  test('Recibe dos parámetros separator y length', () => {
    const separation = new SeparatorLine('*', 20)
    expect(separation.separator).toBe('*')
    expect(separation.length).toBe(20)
  })

  test('Si al construir no se le pasa parámetros, tendrá como separador "-" y length 40', () => {
    const separation = new SeparatorLine()
    expect(separation.separator).toBe('-')
    expect(separation.length).toBe(40)
  })
})

describe('4.3 Imprimir SeparateLine', () => {
  test('imprime el separador el número de veces que indica length y un salto de línea de documento', () => {
    const separation = new SeparatorLine('*', 5)
    expect(separation.print()).toBe('*****\n')
  })

  test('print funciona incluso cambiando el linebreak del documento', () => {
    const separation = new SeparatorLine('*', 5)
    Document.linebreak = '|'
    expect(separation.print()).toBe('*****|')
    Document.linebreak = '\n'
    expect(separation.print()).toBe('*****\n')
  })
})

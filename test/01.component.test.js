/* eslint-env jest */

const Component = require('../src/component')

describe('1.1 Clase Component', () => {
  test('Existe la clase Component', () => {
    expect(() => new Component()).not.toThrow()
  })
})

describe('1.2 Método print', () => {
  test('Tiene un método print', () => {
    const component = new Component()
    expect(component.print).toBeDefined()
  })

  test('el método print que devuelve una cadena vacía', () => {
    const component = new Component()
    expect(component.print()).toBe('')
  })
})

describe('1.3 Método countWords', () => {
  test('Tiene un método para contar palabras', () => {
    const component = new Component()
    expect(component.countWords).toBeDefined()
  })

  test('El método countWords devuelve 0 en los componentes sin texto', () => {
    const component = new Component()
    expect(component.countWords()).toBe(0)
  })
})

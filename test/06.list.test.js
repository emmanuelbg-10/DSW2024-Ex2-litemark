/* eslint-env jest */

const Container = require('../src/container')
const Text = require('../src/text')
const List = require('../src/list.js')
const Document = require('../src/document.js')

beforeEach(() => {
  Document.linebreak = '\n'
})

describe('6.1 Clase List', () => {
  test('Crea class List', () => {
    expect(() => new List()).not.toThrow()
  })

  test('hereda de Content', () => {
    const list = new List()
    expect(list instanceof Container).toBeTruthy()
  })
})

describe('6.2 Solo puede contener Tipo Text', () => {
  test('Admite un componente de tipo texto', () => {
    const list = new List()
    const text1 = new Text('texto 1')
    list.addComponents(text1)
    expect(list.getComponents()).toContain(text1)
  })

  test('Admite varios componentes de tipo texto', () => {
    const list = new List()
    const text1 = new Text('texto 1')
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, text2, text3)
    expect(list.getComponents()).toContain(text1)
    expect(list.getComponents()).toContain(text2)
    expect(list.getComponents()).toContain(text3)
  })

  test('No admite un componente que no es de tipo texto', () => {
    const list = new List()
    const box = new Container()
    list.addComponents(box)
    expect(list.getComponents()).not.toContain(box)
  })

  test('Admite varios componentes y descarta los que no son de tipo texto', () => {
    const list = new List()
    const text1 = new Text('texto 1')
    const box = new Container()
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, box, text2, text3)
    expect(list.getComponents()).toContain(text1)
    expect(list.getComponents()).not.toContain(box)
    expect(list.getComponents()).toContain(text2)
    expect(list.getComponents()).toContain(text3)
  })
})

describe('6.3 Propiedad bullet', () => {
  test('Se crea la propiedad', () => {
    const list = new List('*')
    expect(list.bullet).toBe('*')

    const list2 = new List('-->')
    expect(list2.bullet).toBe('-->')
  })

  test('Si al crear, no se pasa el parámetro, bullet estará vacío', () => {
    const list = new List()
    expect(list.bullet).toBe('')
  })
})

describe('6.4 Método print con bullet', () => {
  test('Si bullet tiene un signo se imprime cada texto en una linea con el signo delante (y un espacio)', () => {
    const list = new List('*')
    const text1 = new Text('texto 1')
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, text2, text3)
    expect(list.print()).toBe('* texto 1\n* texto 2\n* texto 3\n')
  })

  test('Igual que el anterior pero con "-->"', () => {
    const list = new List('-->')
    const text1 = new Text('texto 1')
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, text2, text3)
    expect(list.print()).toBe('--> texto 1\n--> texto 2\n--> texto 3\n')
  })
})

describe('6.5 Método print con bullet y cambio de linebreak', () => {
  test('Cambiando el linebreak también funciona', () => {
    Document.linebreak = '<br>'
    const list = new List('$')
    const text1 = new Text('texto 1')
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, text2, text3)
    expect(list.print()).toBe('$ texto 1<br>$ texto 2<br>$ texto 3<br>')
  })
})

describe('6.5 Método print sin bullet', () => {
  test('Si bullet está vacío, se imprime en línea separados por coma', () => {
    const list = new List()
    const text1 = new Text('texto 1')
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, text2, text3)
    expect(list.print()).toBe('texto 1, texto 2, texto 3\n')
  })

  test('Funciona si se cambia el linebreak', () => {
    Document.linebreak = '<br>'
    const list = new List()
    const text1 = new Text('texto 1')
    const text2 = new Text('texto 2')
    const text3 = new Text('texto 3')
    list.addComponents(text1, text2, text3)
    expect(list.print()).toBe('texto 1, texto 2, texto 3<br>')
  })
})

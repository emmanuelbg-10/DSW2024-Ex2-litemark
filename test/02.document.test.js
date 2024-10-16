/* eslint-env jest */

const Document = require('../src/document')

beforeEach(() => {
  Document.linebreak = '\n'
})

describe('2.1 Clase Document', () => {
  test('Se ha creado la clase Document', () => {
    expect(() => new Document()).not.toThrow()
  })
})

describe('2.2 Propiedades:', () => {
  test('Propiedad título (title) sin más parámetros', () => {
    const document = new Document('Título de Documento')
    expect(document.title).toBe('Título de Documento')
  })

  test('Se crea con un titulo y autor (author es oculto)', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.title).toBe('Título de Documento')
    expect(document).toEqual({ title: 'Título de Documento' })
  })
})

describe('2.3 Propiedades calculada author:', () => {
  test('Existe la propiedad calculada author', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.author).toBe('Pepe Pepón')
  })

  test('Si al crear el documento no se pasa el autor, se pone "Anónimo"', () => {
    const document = new Document('Título de Documento')
    expect(document.author).toBe('Anónimo')
  })
})

describe('2.4 Modificar author:', () => {
  test('Se puede modificar la propiedad "author" como una propiedad más.', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.author).toBe('Pepe Pepón')
    document.author = 'Lope de Vega'
    expect(document.author).toBe('Lope de Vega')
  })

  test('Si se intenta modificar el autor, éste debe tener más de 3 caracteres o no se modifica', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.author).toBe('Pepe Pepón')
    document.author = 'Yo'
    expect(document.author).toBe('Pepe Pepón')
  })

  test('Si se intenta modificar el autor, debe tener más de 3 caracteres (sin espacios por delante o detrás)', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.author).toBe('Pepe Pepón')
    document.author = '    Yo    '
    expect(document.author).toBe('Pepe Pepón')
  })

  test('Si al crear el documento, el nombre del autor no tiene 3 caracteres, se pone "Anónimo"', () => {
    const document = new Document('Título de Documento', '     Yo      ')
    expect(document.author).toBe('Anónimo')
  })
})

describe('2.5 Propiedad date:', () => {
  test('date es oculto', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document).toEqual({ title: 'Título de Documento' })
  })

  test('El documento se crea con la fecha de hoy y se devuelve en formato completo', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    const now = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'full'
    }).format(new Date())
    expect(document.date).toEqual(now)
  })
})

describe('2.6 Propiedad estática linebreak:', () => {
  test('La propiedad linebreak no es una propiedad de instancia', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.linebreak).toBeUndefined()
  })

  test('la propiedad linebreak es una propiedad de clase', () => {
    expect(Document.linebreak).toBe('\n')
  })

  test('Se puede cambiar linebreak a "<br>"', () => {
    expect(Document.linebreak).toBe('\n')
    Document.linebreak = '<br>'
    expect(Document.linebreak).toBe('<br>')
  })
})

describe('2.7 Método print:', () => {
  test('Existe el método print', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    expect(document.print).toBeDefined()
  })

  test('Al imprimir el documento se verán las líneas: Título, Autor, Fecha y Contenido con sus saltos de línea', () => {
    const document = new Document('Título de Documento', 'Pepe Pepón')
    const now = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'full'
    }).format(new Date())
    const txtExpected = `Título: Título de Documento
Autor: Pepe Pepón
Fecha: ${now}
`
    expect(document.print()).toEqual(txtExpected)
  })
})

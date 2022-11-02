describe('Blog app', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'abraham',
      username: 'arahakna',
      password: 'mipassword'
    }
    cy.request('POST', 'http://localhost:3001/api/testing/user', user)
  })
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('login', () => {
    cy.get("input[name='username']").type('arahakna')
    cy.get("input[name='password']").type('mipassword')
    cy.get('form > button').click()
  })
  it('login with wrong password', () => {
    cy.get("input[name='username']").type('arahakna')
    cy.get("input[name='password']").type('mipassword123')
    cy.get('form > button').click()
    cy.get('.alert')
      .should('contain', 'acceso incorrecto')
  })
  describe('funciones de <Blog />', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3001/api/testing/blog', {
        title:'pruebas e2e con cypress',
        url: 'http://localhost:3001',
        author: "Abraham Borja",
        likes: 0
      })
      cy.login({
        username: 'arahakna',
        password: 'mipassword'
      })
      
    })
    it('create a blog', () => { 
      cy.get('[style="display: block;"]').click()
      cy.get("input[name='title']").type('blog de prueba con cypress')
      cy.get("input[name='url']").type('http://miblog')
      cy.get("form > button").click()
      cy.get("body")
      .should("contain", "blog de prueba con cypress")
    })
    it('like a blog', () => {
      cy.contains('show more').click()
      cy.contains('Like').click()
      cy.get('body').should('contain',1)
    })
    it('delete a blog', () => {
      cy.contains('Borrar').click()
      cy.contains('pruebas e2e con cypress').should('not.exist')
    })
  })
})
